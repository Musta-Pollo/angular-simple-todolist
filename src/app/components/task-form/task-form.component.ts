import { Component, computed, input, output, signal, effect } from '@angular/core';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDatePickerComponent } from '@/shared/components/date-picker';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardInputDirective } from '@/shared/components/input';

import { type TaskPriority } from '@/components/task-card';

export interface TaskFormValue {
  name: string;
  priority: TaskPriority;
  deadline: Date | null;
  isCompleted: boolean;
}

const EMPTY_FORM: TaskFormValue = {
  name: '',
  priority: 'none',
  deadline: null,
  isCompleted: false,
};

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ZardButtonComponent, ZardIconComponent, ZardInputDirective, ZardDatePickerComponent],
  template: `
    <!-- Header -->
    <div class="flex items-center justify-between pb-4 border-b">
      <h2 class="text-lg font-semibold">{{ formTitle() }}</h2>
      <button
        type="button"
        z-button
        zType="ghost"
        zSize="sm"
        class="h-8 w-8 p-0"
        (click)="close.emit()"
      >
        <z-icon zType="x" class="h-4 w-4" />
      </button>
    </div>

    <!-- Form Content -->
    <div class="py-6 space-y-6">
      <!-- Name -->
      <div class="space-y-2">
        <label class="text-sm font-medium">
          Name<span class="text-destructive">*</span>
        </label>
        <input
          z-input
          type="text"
          placeholder="What needs to be done?"
          [value]="formValue().name"
          (input)="updateName($event)"
          class="w-full"
        />
      </div>

      <!-- Priority -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Priority</label>
        <div class="flex items-center gap-2">
          @for (p of priorities; track p.value) {
            <button
              type="button"
              [class]="getPriorityClasses(p.value)"
              (click)="setPriority(p.value)"
            >
              <span [class]="getPriorityDotClasses(p.value)"></span>
              {{ p.label }}
            </button>
          }
        </div>
      </div>

      <!-- Deadline -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Deadline</label>
        <z-date-picker
          [value]="formValue().deadline"
          placeholder="dd.mm.yyyy"
          zFormat="dd.MM.yyyy"
          class="w-full"
          (dateChange)="setDeadline($event)"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-end gap-3 pt-4 border-t">
      <button z-button zType="ghost" (click)="cancel.emit()">Cancel</button>
      <button
        z-button
        [disabled]="!isValid()"
        (click)="onConfirm()"
      >
        {{ confirmLabel() }}
      </button>
    </div>
  `,
})
export class TaskFormComponent {
  readonly initialValue = input<Partial<TaskFormValue>>();
  readonly mode = input<'create' | 'edit'>('create');

  readonly close = output<void>();
  readonly cancel = output<void>();
  readonly confirm = output<TaskFormValue>();

  protected readonly formValue = signal<TaskFormValue>({ ...EMPTY_FORM });

  protected readonly priorities = [
    { value: 'high' as TaskPriority, label: 'High' },
    { value: 'medium' as TaskPriority, label: 'Medium' },
    { value: 'low' as TaskPriority, label: 'Low' },
    { value: 'none' as TaskPriority, label: 'None' },
  ];

  protected readonly formTitle = computed(() => {
    return this.mode() === 'create' ? 'New Task' : 'Edit Task';
  });

  protected readonly confirmLabel = computed(() => {
    return this.mode() === 'create' ? 'Create Task' : 'Save Changes';
  });

  protected readonly isValid = computed(() => {
    return this.formValue().name.trim().length > 0;
  });

  constructor() {
    effect(() => {
      const initial = this.initialValue();
      if (initial) {
        this.formValue.set({ ...EMPTY_FORM, ...initial });
      }
    });
  }

  protected updateName(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.formValue.update(f => ({ ...f, name: value }));
  }

  protected setPriority(priority: TaskPriority) {
    this.formValue.update(f => ({ ...f, priority }));
  }

  protected setDeadline(date: Date | null) {
    this.formValue.update(f => ({ ...f, deadline: date }));
  }

  protected getPriorityClasses(priority: TaskPriority): string {
    const isSelected = this.formValue().priority === priority;
    const base = 'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border';

    if (isSelected) {
      const selectedColors: Record<TaskPriority, string> = {
        high: 'bg-red-50 border-red-200 text-red-700',
        medium: 'bg-yellow-50 border-yellow-200 text-yellow-700',
        low: 'bg-blue-50 border-blue-200 text-blue-700',
        none: 'bg-primary text-primary-foreground border-primary',
      };
      return `${base} ${selectedColors[priority]}`;
    }

    return `${base} bg-background border-border text-foreground hover:bg-accent`;
  }

  protected getPriorityDotClasses(priority: TaskPriority): string {
    const colors: Record<TaskPriority, string> = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500',
      none: 'bg-muted-foreground',
    };
    const isSelected = this.formValue().priority === priority;
    const selectedNone = priority === 'none' && isSelected;

    return `w-2.5 h-2.5 rounded-full ${selectedNone ? 'bg-primary-foreground' : colors[priority]}`;
  }

  protected onConfirm() {
    if (this.isValid()) {
      this.confirm.emit(this.formValue());
    }
  }
}
