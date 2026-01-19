import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { AppLogoComponent } from '@/components/app-logo';
import {
  DeleteConfirmationComponent,
  type DeleteConfirmationData,
} from '@/components/delete-confirmation';
import { EmptyTasksComponent } from '@/components/empty-tasks';
import { type FilterState } from '@/components/filter-dropdown';
import { SearchFilterBarComponent } from '@/components/search-filter-bar';
import { SidebarNavItemComponent } from '@/components/sidebar-nav-item';
import { TaskCardComponent } from '@/components/task-card';
import { TaskFormComponent, type TaskFormValue } from '@/components/task-form';
import { TaskListHeaderComponent } from '@/components/task-list-header';
import type { SortBy, Task, TasksFilter, ViewType } from '@/core/models';
import { TaskService } from '@/core/services';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDialogService } from '@/shared/components/dialog';
import { ZardIconComponent, type ZardIcon } from '@/shared/components/icon';
import { ResponsiveModalService } from '@/shared/components/responsive-modal';

interface NavItem {
  id: ViewType;
  label: string;
  icon: ZardIcon;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AppLogoComponent,
    SidebarNavItemComponent,
    TaskListHeaderComponent,
    SearchFilterBarComponent,
    TaskCardComponent,
    EmptyTasksComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  template: `
    <div class="flex h-screen bg-background">
      <!-- Sidebar -->
      <aside class="w-64 border-r flex flex-col p-4">
        <app-logo class="mb-6" />

        <button z-button class="w-full mb-6" (click)="openCreateModal()">
          <z-icon zType="plus" class="mr-2 h-4 w-4" />
          Add Task
        </button>

        <nav class="space-y-1">
          @for (item of navItems; track item.id) {
            <app-sidebar-nav-item
              [icon]="item.icon"
              [label]="item.label"
              [active]="activeView() === item.id"
              (clicked)="activeView.set(item.id)"
            />
          }
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col p-6 overflow-auto">
        <app-task-list-header [title]="viewTitle()" [count]="tasks().length" />

        <app-search-filter-bar
          class="my-4"
          [(searchValue)]="searchQuery"
          [(filterState)]="filterState"
        />

        <div class="space-y-1">
          @for (task of tasks(); track task.id) {
            <app-task-card
              [title]="task.title"
              [deadline]="task.deadline"
              [priority]="task.priority"
              [completed]="task.completed"
              (toggle)="toggleTask(task)"
              (edit)="openEditModal(task)"
              (delete)="confirmDelete(task)"
            />
          } @empty {
            <app-empty-tasks
              [type]="searchQuery() ? 'no-results' : 'no-tasks'"
              [customTitle]="emptyTitle()"
              [customDescription]="emptyDescription()"
              (action)="onEmptyAction()"
            />
          }
        </div>
      </main>
    </div>
  `,
})
export class HomePage {
  private readonly taskService = inject(TaskService);
  private readonly modalService = inject(ResponsiveModalService);
  private readonly dialogService = inject(ZardDialogService);

  readonly activeView = signal<ViewType>('all');
  readonly searchQuery = signal('');
  readonly filterState = signal<FilterState>({
    priority: 'all',
    sortBy: 'dateCreated',
    descending: false,
  });

  readonly navItems: NavItem[] = [
    { id: 'all', label: 'All Tasks', icon: 'list-filter-plus' },
    { id: 'today', label: 'Today', icon: 'calendar' },
    { id: 'upcoming', label: 'Upcoming', icon: 'clock' },
    { id: 'completed', label: 'Completed', icon: 'circle-check' },
  ];

  readonly viewTitle = computed(() => {
    const titles: Record<ViewType, string> = {
      today: 'Today',
      upcoming: 'Upcoming',
      completed: 'Completed',
      all: 'All Tasks',
    };
    return titles[this.activeView()];
  });

  readonly emptyTitle = computed(() => {
    if (this.searchQuery()) return 'No matching tasks';
    const titles: Record<ViewType, string> = {
      today: 'No tasks for today',
      upcoming: 'No upcoming tasks',
      completed: 'No completed tasks',
      all: 'No tasks yet',
    };
    return titles[this.activeView()];
  });

  readonly emptyDescription = computed(() => {
    if (this.searchQuery()) return 'Try adjusting your filters or search terms.';
    const descriptions: Record<ViewType, string> = {
      today: 'Tasks due today will appear here.',
      upcoming: 'Tasks with future deadlines will appear here.',
      completed: 'Completed tasks will appear here.',
      all: 'Create your first task to get started.',
    };
    return descriptions[this.activeView()];
  });

  private readonly currentFilter = computed<TasksFilter>(() => {
    const filter = this.filterState();
    return {
      view: this.activeView(),
      searchQuery: this.searchQuery(),
      priority: filter.priority === 'all' ? undefined : filter.priority,
      sortBy: filter.sortBy as SortBy,
      ascending: !filter.descending,
    };
  });

  readonly tasks = toSignal(
    toObservable(this.currentFilter).pipe(
      switchMap((filter) => this.taskService.watchTasks(filter)),
    ),
    { initialValue: [] as Task[] },
  );

  openCreateModal() {
    const ref = this.modalService.open({
      content: TaskFormComponent,
      data: { mode: 'create' },
    });

    // Subscribe to the component's confirm output
    setTimeout(() => {
      const instance = ref.componentInstance as TaskFormComponent;
      instance?.confirm.subscribe((result: TaskFormValue) => {
        this.taskService.createTask({
          title: result.name,
          priority: result.priority,
          deadline: result.deadline ?? undefined,
          completed: false,
        });
      });
    });
  }

  openEditModal(task: Task) {
    const ref = this.modalService.open({
      content: TaskFormComponent,
      data: {
        mode: 'edit',
        initialValue: {
          name: task.title,
          priority: task.priority,
          deadline: task.deadline ? new Date(task.deadline) : null,
          isCompleted: task.completed,
          
        },
      },
    });

    setTimeout(() => {
      const instance = ref.componentInstance as TaskFormComponent;
      instance?.confirm.subscribe((result: TaskFormValue) => {
        this.taskService.editTask({
          ...task,
          title: result.name,
          priority: result.priority,
          deadline: result.deadline ?? undefined,
          completed: result.isCompleted ?? task.completed,
        });
      });
    });
  }

  confirmDelete(task: Task) {
    this.dialogService.create<DeleteConfirmationComponent, DeleteConfirmationData>({
      zContent: DeleteConfirmationComponent,
      zData: { itemName: task.title },
      zHideFooter: true,
      zClosable: false,
      zMaskClosable: true,
      zOnOk: () => {
        this.taskService.deleteTask(task.id);
      },
    });
  }

  toggleTask(task: Task) {
    this.taskService.editTask({ ...task, completed: !task.completed });
  }

  private readonly defaultFilterState: FilterState = {
    priority: 'all',
    sortBy: 'dateCreated',
    descending: false,
  };

  onEmptyAction() {
    if (this.searchQuery() || this.hasActiveFilters()) {
      this.searchQuery.set('');
      this.filterState.set(this.defaultFilterState);
    } else {
      this.openCreateModal();
    }
  }

  private hasActiveFilters(): boolean {
    const current = this.filterState();
    return current.priority !== 'all';
  }
}
