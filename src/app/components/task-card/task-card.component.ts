import { Component, computed, input, output, signal } from '@angular/core';

import type { TaskPriority } from '@/core/models';
import { formatDeadline } from '@/core/utils';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardTooltipImports } from '@/shared/components/tooltip';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [ZardButtonComponent, ZardIconComponent, ZardTooltipImports],
  template: `
    <div
      [class]="containerClasses()"
      (mouseenter)="hoverActions.set(true)"
      (mouseleave)="hoverActions.set(false)"
    >
      <!-- Custom checkbox with priority color -->
      <button
        type="button"
        role="checkbox"
        [attr.aria-checked]="completed()"
        [class]="checkboxClasses()"
        (click)="onToggle(); $event.stopPropagation()"
      >
        @if (completed()) {
          <z-icon zType="check" class="h-4 w-4 text-white" />
        }
      </button>

      <!-- Content -->
      <div class="flex-1 min-w-0" (click)="onContentClick()">
        <p [class]="titleClasses()">{{ title() }}</p>
        @if (deadline()) {
          <p class="text-sm text-muted-foreground flex items-center gap-2 mt-1">
            <z-icon zType="calendar" class="h-4 w-4" />
            {{ formattedDeadline() }}
          </p>
        }
      </div>

      <!-- Actions (edit/delete) -->
      <div
        class="flex items-center gap-2 transition-opacity"
        [class.opacity-0]="!actionsVisible()"
        [class.opacity-100]="actionsVisible()"
      >
        <button
          type="button"
          z-button
          zType="ghost"
          zSize="sm"
          class="h-9 w-9 p-0"
          [zTooltip]="'Edit'"
          (click)="onEdit(); $event.stopPropagation()"
        >
          <z-icon zType="pencil" class="h-5 w-5 text-muted-foreground" />
        </button>
        <button
          type="button"
          z-button
          zType="ghost"
          zSize="sm"
          class="h-9 w-9 p-0"
          [zTooltip]="'Delete'"
          (click)="onDelete(); $event.stopPropagation()"
        >
          <z-icon zType="trash" class="h-5 w-5 text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    </div>
  `,
})
export class TaskCardComponent {
  readonly title = input.required<string>();
  readonly deadline = input<Date | string>();
  readonly priority = input<TaskPriority>('none');
  readonly completed = input(false);
  readonly isMobile = input(false);
  /** Parent-controlled: whether actions should be visible (for mobile tap-to-reveal) */
  readonly showActions = input(false);

  readonly toggle = output<void>();
  readonly edit = output<void>();
  readonly delete = output<void>();
  /** Emitted when user taps card on mobile to request showing/hiding actions */
  readonly showActionsChange = output<boolean>();

  /** Internal: tracks hover state for desktop */
  readonly hoverActions = signal(false);

  /** Combined visibility: hover on desktop, parent-controlled on mobile */
  readonly actionsVisible = computed(() =>
    this.isMobile() ? this.showActions() : this.hoverActions() || this.showActions()
  );

  protected readonly containerClasses = computed(() => {
    return 'group flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer';
  });

  protected readonly checkboxClasses = computed(() => {
    const base =
      'flex items-center justify-center w-6 h-6 rounded-full border-3 transition-colors shrink-0 mt-0.5';
    const priorityColors: Record<TaskPriority, string> = {
      high: 'border-red-500',
      medium: 'border-yellow-500',
      low: 'border-blue-500',
      none: 'border-muted-foreground',
    };

    const priorityBg: Record<TaskPriority, string> = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500',
      none: 'bg-muted-foreground',
    };

    if (this.completed()) {
      return `${base} ${priorityColors[this.priority()]} ${priorityBg[this.priority()]}`;
    }
    return `${base} ${priorityColors[this.priority()]} hover:bg-accent`;
  });

  protected readonly titleClasses = computed(() => {
    const base = 'text-base font-medium truncate';
    if (this.completed()) {
      return `${base} line-through text-muted-foreground`;
    }
    return `${base} text-foreground`;
  });

  protected readonly formattedDeadline = computed(() => formatDeadline(this.deadline()));

  onToggle() {
    this.toggle.emit();
  }

  onContentClick() {
    if (this.isMobile()) {
      // On mobile: request toggling action visibility (parent manages state)
      this.showActionsChange.emit(!this.showActions());
    } else {
      // On desktop: toggle task completion
      this.toggle.emit();
    }
  }

  onEdit() {
    this.showActionsChange.emit(false);
    this.edit.emit();
  }

  onDelete() {
    this.showActionsChange.emit(false);
    this.delete.emit();
  }
}
