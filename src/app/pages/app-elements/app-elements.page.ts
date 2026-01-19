import { Component, inject, signal } from '@angular/core';

import { AppLogoComponent } from '@/components/app-logo';
import {
  DeleteConfirmationComponent,
  type DeleteConfirmationData,
} from '@/components/delete-confirmation';
import { EmptyTasksComponent } from '@/components/empty-tasks';
import { FilterDropdownComponent, type FilterState } from '@/components/filter-dropdown';
import { SearchFilterBarComponent } from '@/components/search-filter-bar';
import { SidebarNavItemComponent } from '@/components/sidebar-nav-item';
import { TaskCardComponent, type Task } from '@/components/task-card';
import { TaskFormComponent, type TaskFormValue } from '@/components/task-form';
import { TaskListHeaderComponent } from '@/components/task-list-header';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardDialogService } from '@/shared/components/dialog';
import { ZardDividerComponent } from '@/shared/components/divider';
import { ZardIcon } from '@/shared/components/icon';
import { ResponsiveModalService } from '@/shared/components/responsive-modal';

interface NavItem {
  id: string;
  label: string;
  icon: ZardIcon;
}

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [
    ZardButtonComponent,
    ZardDividerComponent,
    ZardCardComponent,
    SidebarNavItemComponent,
    AppLogoComponent,
    FilterDropdownComponent,
    SearchFilterBarComponent,
    TaskCardComponent,
    EmptyTasksComponent,
    TaskListHeaderComponent,
    TaskFormComponent,
  ],
  template: `
    <div class="container mx-auto p-8 space-y-12">
      <div>
        <h1 class="text-4xl font-bold mb-2">App Elements</h1>
        <p class="text-muted-foreground">
          Custom components and elements specific to this application.
        </p>
      </div>

      <z-divider />

      <!-- App Logo -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">App Logo</h2>
        <z-divider class="mb-6" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Preview -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">Preview</h3>
              <div class="flex items-center justify-center p-8">
                <app-logo />
              </div>
            </div>
          </z-card>

          <!-- Sizes -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">Sizes</h3>
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <span class="text-sm text-muted-foreground w-12">Small</span>
                  <app-logo size="sm" />
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-sm text-muted-foreground w-12">Medium</span>
                  <app-logo size="md" />
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-sm text-muted-foreground w-12">Large</span>
                  <app-logo size="lg" />
                </div>
              </div>
            </div>
          </z-card>
        </div>
      </section>

      <z-divider />

      <!-- SideBar Nav Item -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Sidebar Nav Item</h2>
        <z-divider class="mb-6" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Preview -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">Preview</h3>
              <nav class="w-64 space-y-1">
                @for (item of navItems; track item.id) {
                  <app-sidebar-nav-item
                    [icon]="item.icon"
                    [label]="item.label"
                    [active]="activeNavItem() === item.id"
                    (clicked)="activeNavItem.set(item.id)"
                  />
                }
              </nav>
            </div>
          </z-card>

          <!-- Variants -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">States</h3>
              <div class="w-64 space-y-1">
                <app-sidebar-nav-item icon="inbox" label="Default" [active]="false" />
                <app-sidebar-nav-item icon="calendar" label="Active" [active]="true" />
              </div>
            </div>
          </z-card>
        </div>
      </section>

      <z-divider />

      <!-- Filter Dropdown -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Filter Dropdown</h2>
        <z-divider class="mb-6" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Preview -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">Preview</h3>
              <div class="flex items-center justify-center p-8">
                <app-filter-dropdown (filterChange)="onFilterChange($event)" />
              </div>
            </div>
          </z-card>

          <!-- Current State -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">Current State</h3>
              <div class="space-y-2 text-sm">
                <p>
                  <span class="text-muted-foreground">Priority:</span>
                  {{ currentFilter().priority }}
                </p>
                <p>
                  <span class="text-muted-foreground">Sort by:</span> {{ currentFilter().sortBy }}
                </p>
                <p>
                  <span class="text-muted-foreground">Descending:</span>
                  {{ currentFilter().descending }}
                </p>
              </div>
            </div>
          </z-card>
        </div>
      </section>

      <z-divider />

      <!-- Search Filter Bar -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Search Filter Bar</h2>
        <z-divider class="mb-6" />

        <z-card>
          <div class="p-4">
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Preview</h3>
            <app-search-filter-bar
              (searchChange)="onSearchChange($event)"
              (filterChange)="onFilterChange($event)"
            />
          </div>
        </z-card>
      </section>

      <z-divider />

      <!-- Task Card -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Task Card</h2>
        <z-divider class="mb-6" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Preview -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">Preview</h3>
              <div class="space-y-1">
                @for (task of sampleTasks; track task.id) {
                  <app-task-card
                    [title]="task.title"
                    [deadline]="task.deadline"
                    [priority]="task.priority"
                    [completed]="task.completed"
                    (toggle)="toggleTask(task.id)"
                    (edit)="editTask(task.id)"
                    (delete)="deleteTask(task.id)"
                  />
                }
              </div>
            </div>
          </z-card>

          <!-- Priority Variants -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">Priority Colors</h3>
              <div class="space-y-1">
                <app-task-card title="High Priority Task" priority="high" />
                <app-task-card title="Medium Priority Task" priority="medium" />
                <app-task-card title="Low Priority Task" priority="low" />
                <app-task-card title="No Priority Task" priority="none" />
                <app-task-card title="Completed Task" priority="high" [completed]="true" />
              </div>
            </div>
          </z-card>
        </div>
      </section>

      <z-divider />

      <!-- Task List Header -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Task List Header</h2>
        <z-divider class="mb-6" />

        <z-card>
          <div class="p-4">
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Various Filter Views</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <app-task-list-header title="Today" [count]="0" />
              <app-task-list-header title="Inbox" [count]="5" />
              <app-task-list-header title="Upcoming" [count]="12" />
              <app-task-list-header title="Completed" [count]="1" />
            </div>
          </div>
        </z-card>
      </section>

      <z-divider />

      <!-- Empty Tasks State -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Empty Tasks State</h2>
        <z-divider class="mb-6" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- No Tasks -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">No Tasks</h3>
              <app-empty-tasks type="no-tasks" (action)="onAddTask()" />
            </div>
          </z-card>

          <!-- No Results -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">No Search Results</h3>
              <app-empty-tasks type="no-results" (action)="onClearFilters()" />
            </div>
          </z-card>
        </div>
      </section>

      <z-divider />

      <!-- Task Form -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Task Form</h2>
        <z-divider class="mb-6" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Create Mode -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">Create Mode</h3>
              <app-task-form
                mode="create"
                (close)="onFormClose()"
                (cancel)="onFormCancel()"
                (confirm)="onFormConfirm($event)"
              />
            </div>
          </z-card>

          <!-- Edit Mode -->
          <z-card>
            <div class="p-4">
              <h3 class="text-sm font-medium text-muted-foreground mb-4">Edit Mode</h3>
              <app-task-form
                mode="edit"
                [initialValue]="editTaskValue"
                (close)="onFormClose()"
                (cancel)="onFormCancel()"
                (confirm)="onFormConfirm($event)"
              />
            </div>
          </z-card>
        </div>
      </section>

      <z-divider />

      <!-- Responsive Modal -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Responsive Modal</h2>
        <z-divider class="mb-6" />

        <z-card>
          <div class="p-4">
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Adaptive Layout</h3>
            <p class="text-sm text-muted-foreground mb-4">
              Opens as bottom sheet on mobile, dialog on tablet, and side sheet on desktop. Current
              mode: <span class="font-medium text-foreground">{{ modalService.getMode() }}</span>
            </p>
            <div class="flex gap-3">
              <button z-button (click)="openResponsiveModal('create')">Create Task</button>
              <button z-button zType="outline" (click)="openResponsiveModal('edit')">
                Edit Task
              </button>
            </div>
          </div>
        </z-card>
      </section>

      <z-divider />

      <!-- Delete Confirmation -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Delete Confirmation</h2>
        <z-divider class="mb-6" />

        <z-card>
          <div class="p-4">
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Confirmation Dialog</h3>
            <p class="text-sm text-muted-foreground mb-4">
              A dialog for confirming destructive actions like deleting a task.
            </p>
            <div class="flex gap-3">
              <button z-button zType="destructive" (click)="openDeleteConfirmation()">
                Delete Task
              </button>
            </div>
          </div>
        </z-card>
      </section>
    </div>
  `,
})
export class AppElementsPage {
  private readonly dialogService = inject(ZardDialogService);
  readonly modalService = inject(ResponsiveModalService);

  activeNavItem = signal('inbox');
  currentFilter = signal<FilterState>({
    priority: 'all',
    sortBy: 'date-created',
    descending: true,
  });

  onFilterChange(filter: FilterState) {
    this.currentFilter.set(filter);
  }

  onSearchChange(search: string) {
    console.log('Search:', search);
  }

  sampleTasks: Task[] = [
    {
      id: '1',
      title: 'Review project proposal',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      priority: 'high',
      completed: false,
      dateCreated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Team meeting',
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      priority: 'medium',
      completed: false,
      dateCreated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      title: 'Update documentation',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      priority: 'low',
      completed: false,
      dateCreated: new Date(),
    },
    { id: '4', title: 'Code review completed', priority: 'high', completed: true, dateCreated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
  ];

  toggleTask(id: string) {
    this.sampleTasks = this.sampleTasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
  }

  editTask(id: string) {
    console.log('Edit task:', id);
  }

  deleteTask(id: string) {
    this.sampleTasks = this.sampleTasks.filter((t) => t.id !== id);
  }

  onAddTask() {
    console.log('Add task clicked');
  }

  onClearFilters() {
    console.log('Clear filters clicked');
  }

  editTaskValue: Partial<TaskFormValue> = {
    name: 'Review project proposal',
    priority: 'high',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    isCompleted: false,
  };

  onFormClose() {
    console.log('Form closed');
  }

  onFormCancel() {
    console.log('Form cancelled');
  }

  onFormConfirm(value: TaskFormValue) {
    console.log('Form confirmed:', value);
  }

  navItems: NavItem[] = [
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
    { id: 'today', label: 'Today', icon: 'calendar' },
    { id: 'upcoming', label: 'Upcoming', icon: 'clock' },
    { id: 'completed', label: 'Completed', icon: 'circle-check' },
    { id: 'all', label: 'All Tasks', icon: 'list-filter-plus' },
  ];

  openResponsiveModal(mode: 'create' | 'edit') {
    this.modalService.open({
      content: TaskFormComponent,
      data: mode === 'edit' ? this.editTaskValue : undefined,
    });
  }

  openDeleteConfirmation() {
    this.dialogService.create<DeleteConfirmationComponent, DeleteConfirmationData>({
      zContent: DeleteConfirmationComponent,
      zData: {
        itemName: 'Review project proposal',
      },
      zHideFooter: true,
      zClosable: false,
      zMaskClosable: true,
    });
  }
}
