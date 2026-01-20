import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { AppLogoComponent } from '@/components/app-logo';
import {
  DeleteConfirmationComponent,
  type DeleteConfirmationData,
} from '@/components/delete-confirmation';
import { EmptyTasksComponent } from '@/components/empty-tasks';
import { type FilterState } from '@/components/filter-dropdown';
import { FloatingActionButtonComponent } from '@/components/floating-action-button';
import { SearchFilterBarComponent } from '@/components/search-filter-bar';
import { SidebarNavItemComponent } from '@/components/sidebar-nav-item';
import { TaskCardComponent } from '@/components/task-card';
import { TaskFormComponent, type TaskFormValue } from '@/components/task-form';
import { TaskListHeaderComponent } from '@/components/task-list-header';
import type { SortBy, Task, TasksFilter, ViewType } from '@/core/models';
import { TaskService } from '@/core/services';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDialogService } from '@/shared/components/dialog';
import { ZardDividerComponent } from '@/shared/components/divider';
import { ZardIconComponent, type ZardIcon } from '@/shared/components/icon';
import { ResponsiveModalService } from '@/shared/components/responsive-modal';
import { Z_SHEET_DATA, ZardSheetRef, ZardSheetService } from '@/shared/components/sheet';
import { ZardTooltipImports } from '@/shared/components/tooltip';
import { AutoAnimateDirective } from '@/shared/core/directives/auto-animate.directive';

type ScreenSize = 'mobile' | 'tablet' | 'desktop';
type Theme = 'system' | 'light' | 'dark';

interface NavItem {
  id: ViewType;
  label: string;
  icon: ZardIcon;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleCasePipe,
    AppLogoComponent,
    SidebarNavItemComponent,
    TaskListHeaderComponent,
    SearchFilterBarComponent,
    TaskCardComponent,
    EmptyTasksComponent,
    FloatingActionButtonComponent,
    ZardButtonComponent,
    ZardDividerComponent,
    ZardIconComponent,
    ZardTooltipImports,
    AutoAnimateDirective,
  ],
  template: `
    <div class="flex h-screen bg-background">
      <!-- Desktop/Tablet Sidebar -->
      @if (screenSize() !== 'mobile') {
        <aside
          class="border-r flex flex-col p-4 transition-all duration-300"
          [class.w-64]="screenSize() === 'desktop'"
          [class.w-16]="screenSize() === 'tablet'"
        >
          <!-- Logo -->
          @if (screenSize() === 'desktop') {
            <app-logo class="mb-6" />
          } @else {
            <div class="flex justify-center mb-6">
              <app-logo [compact]="true" />
            </div>
          }

          <!-- Add Task Button -->
          @if (screenSize() === 'desktop') {
            <button z-button class="w-full mb-6" (click)="openCreateModal()">
              <z-icon zType="plus" class="mr-2 h-4 w-4" zSize="lg" />
              Add Task
            </button>
          } @else {
            <button
              z-button
              zSize="lg"
              class="w-full mb-6 p-2"
              [zTooltip]="'Add Task'"
              zTooltipPosition="right"
              (click)="openCreateModal()"
            >
              <z-icon zType="plus" class="h-4 w-4" />
            </button>
          }

          <!-- Navigation -->
          <nav class="space-y-1">
            @for (item of navItems; track item.id) {
              <app-sidebar-nav-item
                [icon]="item.icon"
                [label]="item.label"
                [active]="activeView() === item.id"
                [collapsed]="screenSize() === 'tablet'"
                (clicked)="activeView.set(item.id)"
              />
            }
          </nav>

          <!-- Theme & Dev -->
          <div class="mt-auto">
            <z-divider class="my-4" />
            @if (screenSize() === 'desktop') {
              <button
                z-button
                zType="ghost"
                class="w-full justify-start gap-3 mb-1"
                (click)="cycleTheme()"
              >
                <z-icon [zType]="themeIcon()" class="h-4 w-4" />
                {{ theme() | titlecase }}
              </button>
              <button
                z-button
                zType="ghost"
                class="w-full justify-start gap-3"
                (click)="openDevPage()"
              >
                <z-icon zType="code" class="h-4 w-4" />
                Dev
              </button>
            } @else {
              <button
                z-button
                zType="ghost"
                class="w-full p-2 mb-1"
                [zTooltip]="theme() | titlecase"
                zTooltipPosition="right"
                (click)="cycleTheme()"
              >
                <z-icon [zType]="themeIcon()" class="h-4 w-4" />
              </button>
              <button
                z-button
                zType="ghost"
                class="w-full p-2"
                [zTooltip]="'Dev'"
                zTooltipPosition="right"
                (click)="openDevPage()"
              >
                <z-icon zType="code" class="h-4 w-4" />
              </button>
            }
          </div>
        </aside>
      }

      <!-- Main Content -->
      <main class="flex-1 flex flex-col overflow-auto">
        <!-- Mobile Header -->
        @if (screenSize() === 'mobile') {
          <header class="flex items-center gap-3 p-4 border-b bg-background sticky top-0 z-10">
            <button z-button zType="ghost" zSize="sm" class="p-2" (click)="openMobileNav()">
              <z-icon zType="panel-left" class="h-5 w-5" />
            </button>
            <app-logo [compact]="true" />
            <button z-button zType="ghost" zSize="sm" class="p-2 ml-auto" (click)="cycleTheme()">
              <z-icon [zType]="themeIcon()" class="h-5 w-5" />
            </button>
          </header>
        }

        <div class="flex-1 p-4 md:p-6">
          <app-task-list-header class="block pb-4" [title]="viewTitle()" [count]="tasks().length" />

          <app-search-filter-bar
            class="my-4 pb-2 block"
            [(searchValue)]="searchQuery"
            [(filterState)]="filterState"
          />

          <div class="space-y-1" autoAnimate>
            @for (task of tasks(); track task.id) {
              <app-task-card
                [title]="task.title"
                [deadline]="task.deadline"
                [priority]="task.priority"
                [completed]="task.completed"
                [isMobile]="screenSize() === 'mobile'"
                [showActions]="activeTaskId() === task.id"
                (showActionsChange)="onTaskActionsChange(task.id, $event)"
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
        </div>
      </main>

      <!-- Mobile FAB -->
      @if (screenSize() === 'mobile') {
        <app-fab icon="plus" (clicked)="openCreateModal()" />
      }
    </div>
  `,
})
export class HomePage {
  private readonly taskService = inject(TaskService);
  private readonly modalService = inject(ResponsiveModalService);
  private readonly dialogService = inject(ZardDialogService);
  private readonly sheetService = inject(ZardSheetService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);

  private mobileNavRef: { close: () => void } | null = null;

  readonly screenSize = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(
        map((result): ScreenSize => {
          if (result.breakpoints[Breakpoints.XSmall]) {
            return 'mobile';
          }
          if (result.breakpoints[Breakpoints.Small] || result.breakpoints[Breakpoints.Medium]) {
            return 'tablet';
          }
          return 'desktop';
        }),
      ),
    { initialValue: 'desktop' as ScreenSize },
  );

  readonly activeView = signal<ViewType>('all');
  readonly searchQuery = signal('');
  /** Tracks which task has visible actions on mobile (tap-to-reveal) */
  readonly activeTaskId = signal<string | null>(null);
  readonly theme = signal<Theme>(this.getInitialTheme());

  readonly themeIcon = computed<ZardIcon>(() => {
    const t = this.theme();
    if (t === 'light') return 'sun';
    if (t === 'dark') return 'moon';
    return 'monitor';
  });
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

  openMobileNav() {
    this.mobileNavRef = this.sheetService.create({
      zContent: MobileNavComponent,
      zSide: 'left',
      zWidth: '280px',
      zHideFooter: true,
      zClosable: false,
      zData: {
        navItems: this.navItems,
        activeView: this.activeView,
        onNavigate: (view: ViewType) => {
          this.activeView.set(view);
          this.closeMobileNav();
        },
        onCreateTask: () => {
          this.openCreateModal();
          this.closeMobileNav();
        },
      },
    });
  }

  closeMobileNav() {
    this.mobileNavRef?.close();
    this.mobileNavRef = null;
  }

  openCreateModal() {
    const ref = this.modalService.open({
      content: TaskFormComponent,
      data: { mode: 'create' },
    });

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

  onTaskActionsChange(taskId: string, show: boolean) {
    // If showing actions for this task, set it as active; otherwise clear
    this.activeTaskId.set(show ? taskId : null);
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

  openDevPage() {
    this.router.navigate(['/dev']);
  }

  private getInitialTheme(): Theme {
    const stored = localStorage.getItem('theme') as Theme | null;
    return stored || 'system';
  }

  cycleTheme() {
    const order: Theme[] = ['system', 'light', 'dark'];
    const currentIndex = order.indexOf(this.theme());
    const nextTheme = order[(currentIndex + 1) % order.length];
    this.theme.set(nextTheme);
    this.applyTheme(nextTheme);
  }

  private applyTheme(theme: Theme) {
    localStorage.setItem('theme', theme);
    const isDark =
      theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  }
}

// Mobile Navigation Component for Sheet
@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [AppLogoComponent, SidebarNavItemComponent, ZardButtonComponent, ZardIconComponent],
  template: `
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between border-b px-0 py-3">
        <app-logo />
        <button z-button zType="ghost" zSize="sm" (click)="close()">
          <z-icon zType="x" class="h-5 w-5" />
        </button>
      </div>

      <div class="px-0 pt-2">
        <button z-button class="w-full mb-4" (click)="data.onCreateTask()">
          <z-icon zType="plus" class="mr-2 h-4 w-4" />
          Add Task
        </button>

        <nav class="space-y-1">
          @for (item of data.navItems; track item.id) {
            <app-sidebar-nav-item
              [icon]="item.icon"
              [label]="item.label"
              [active]="data.activeView() === item.id"
              (clicked)="data.onNavigate(item.id)"
            />
          }
        </nav>
      </div>
    </div>
  `,
})
class MobileNavComponent {
  readonly sheetRef = inject(ZardSheetRef);
  readonly data = inject<{
    navItems: NavItem[];
    activeView: () => ViewType;
    onNavigate: (view: ViewType) => void;
    onCreateTask: () => void;
  }>(Z_SHEET_DATA);

  close() {
    this.sheetRef.close();
  }
}
