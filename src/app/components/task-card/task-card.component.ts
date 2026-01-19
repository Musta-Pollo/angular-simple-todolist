import { Component, computed, input, output, signal } from '@angular/core';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardTooltipImports } from '@/shared/components/tooltip';

export type TaskPriority = 'high' | 'medium' | 'low' | 'none';

export interface Task {
  id: string;
  title: string;
  deadline?: Date | string;
  priority: TaskPriority;
  completed: boolean;
}

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [ZardButtonComponent, ZardIconComponent, ZardTooltipImports],
  template: `
    <div [class]="containerClasses()" (mouseenter)="showActions.set(true)" (mouseleave)="showActions.set(false)">
      <!-- Custom checkbox with priority color -->
      <button
        type="button"
        role="checkbox"
        [attr.aria-checked]="completed()"
        [class]="checkboxClasses()"
        (click)="onToggle(); $event.stopPropagation()"
      >
        @if (completed()) {
          <z-icon zType="check" class="h-3 w-3 text-white" />
        }
      </button>

      <!-- Content -->
      <div class="flex-1 min-w-0" (click)="onToggle()">
        <p [class]="titleClasses()">{{ title() }}</p>
        @if (deadline()) {
          <p class="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
            <z-icon zType="calendar" class="h-3 w-3" />
            {{ formattedDeadline() }}
          </p>
        }
      </div>

      <!-- Actions (edit/delete) -->
      <div
        class="flex items-center gap-1 transition-opacity"
        [class.opacity-0]="!showActions()"
        [class.opacity-100]="showActions()"
      >
        <button
          type="button"
          z-button
          zType="ghost"
          zSize="sm"
          class="h-7 w-7 p-0"
          [zTooltip]="'Edit'"
          (click)="edit.emit(); $event.stopPropagation()"
        >
          <z-icon zType="pencil" class="h-4 w-4 text-muted-foreground" />
        </button>
        <button
          type="button"
          z-button
          zType="ghost"
          zSize="sm"
          class="h-7 w-7 p-0"
          [zTooltip]="'Delete'"
          (click)="delete.emit(); $event.stopPropagation()"
        >
          <z-icon zType="trash" class="h-4 w-4 text-muted-foreground hover:text-destructive" />
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

  readonly toggle = output<void>();
  readonly edit = output<void>();
  readonly delete = output<void>();

  readonly showActions = signal(false);

  protected readonly containerClasses = computed(() => {
    return 'group flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer';
  });

  protected readonly checkboxClasses = computed(() => {
    const base = 'flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors shrink-0 mt-0.5';
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
    const base = 'text-sm font-medium truncate';
    if (this.completed()) {
      return `${base} line-through text-muted-foreground`;
    }
    return `${base} text-foreground`;
  });

  protected readonly formattedDeadline = computed(() => {
    const deadline = this.deadline();
    if (!deadline) return '';

    const date = typeof deadline === 'string' ? new Date(deadline) : deadline;
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    if (isToday) {
      return `Today - ${timeStr}`;
    }
    if (isTomorrow) {
      return `Tomorrow - ${timeStr}`;
    }

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 0 && diffDays <= 7) {
      return `This ${dayName} - ${timeStr}`;
    }

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ` - ${timeStr}`;
  });

  onToggle() {
    this.toggle.emit();
  }
}
