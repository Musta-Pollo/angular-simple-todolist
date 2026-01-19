import { Component, computed, input, output } from '@angular/core';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardEmptyComponent } from '@/shared/components/empty';
import { ZardIconComponent } from '@/shared/components/icon';

export type EmptyTasksType = 'no-tasks' | 'no-results';

@Component({
  selector: 'app-empty-tasks',
  standalone: true,
  imports: [ZardButtonComponent, ZardEmptyComponent, ZardIconComponent],
  template: `
    <z-empty
      [zImage]="iconTemplate"
      [zTitle]="title()"
      [zDescription]="description()"
      [zActions]="showAction() ? [actionButton] : []"
    >
      <ng-template #iconTemplate>
        <div class="relative flex items-center justify-center w-14 h-14 rounded-xl bg-muted">
          <z-icon [zType]="iconType()" class="h-6 w-6 text-primary" />
          @if (type() === 'no-tasks') {
            <span class="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-destructive border-2 border-background"></span>
          }
        </div>
      </ng-template>

      <ng-template #actionButton>
        <button z-button (click)="action.emit()">{{ actionLabel() }}</button>
      </ng-template>
    </z-empty>
  `,
})
export class EmptyTasksComponent {
  readonly type = input<EmptyTasksType>('no-tasks');
  readonly customTitle = input<string>();
  readonly customDescription = input<string>();
  readonly customActionLabel = input<string>();
  readonly showAction = input(true);

  readonly action = output<void>();

  protected readonly iconType = computed(() => {
    return this.type() === 'no-tasks' ? 'inbox' : 'search';
  });

  protected readonly title = computed(() => {
    if (this.customTitle()) return this.customTitle();
    return this.type() === 'no-tasks' ? 'No tasks in inbox' : 'No matching tasks';
  });

  protected readonly description = computed(() => {
    if (this.customDescription()) return this.customDescription();
    return this.type() === 'no-tasks'
      ? 'Create your first task to get started.'
      : 'Try adjusting your filters or search terms.';
  });

  protected readonly actionLabel = computed(() => {
    if (this.customActionLabel()) return this.customActionLabel();
    return this.type() === 'no-tasks' ? 'Add Task' : 'Clear Filters';
  });
}
