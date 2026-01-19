import { Component, computed, effect, inject, input, output, signal } from '@angular/core';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDatePickerComponent } from '@/shared/components/date-picker';
import { ZardDialogHeaderComponent } from '@/shared/components/dialog-header';
import { ZardDialogRef } from '@/shared/components/dialog/dialog-ref';
import { ZardInputDirective } from '@/shared/components/input';
import { ZardSheetRef } from '@/shared/components/sheet/sheet-ref';

import { type TaskPriority } from '@/components/task-card';
import { PrioritySelectorComponent, type PriorityValue } from '@/components/priority-selector';

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
  imports: [ZardButtonComponent, ZardDialogHeaderComponent, ZardInputDirective, ZardDatePickerComponent, PrioritySelectorComponent],
  template: `
    <z-dialog-header [zTitle]="formTitle()" (close)="onClose()" />

    <!-- Form Content -->
    <div class="py-6 space-y-6">
      <!-- Name -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Name<span class="text-destructive">*</span></label>
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
        <app-priority-selector
          [value]="formValue().priority"
          (valueChange)="setPriority($event)"
        />
      </div>

      <!-- Deadline -->
      <div class="space-y-2 flex flex-col">
        <label class="text-sm font-medium">Deadline</label>
        <z-date-picker
          [value]="formValue().deadline"
          placeholder="dd.mm.yyyy"
          zFormat="dd.MM.yyyy"
          [zClearable]="true"
          class="w-full"
          (dateChange)="setDeadline($event)"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-end gap-3 pt-4 border-t">
      <button z-button zType="ghost" (click)="onCancel()">Cancel</button>
      <button z-button [disabled]="!isValid()" (click)="onConfirm()">
        {{ confirmLabel() }}
      </button>
    </div>
  `,
})
export class TaskFormComponent {
  private readonly sheetRef = inject(ZardSheetRef, { optional: true });
  private readonly dialogRef = inject(ZardDialogRef, { optional: true });

  readonly initialValue = input<Partial<TaskFormValue>>();
  readonly mode = input<'create' | 'edit'>('create');

  readonly close = output<void>();
  readonly cancel = output<void>();
  readonly confirm = output<TaskFormValue>();

  protected readonly formValue = signal<TaskFormValue>({ ...EMPTY_FORM });

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

  protected setPriority(priority: PriorityValue) {
    this.formValue.update(f => ({ ...f, priority: priority as TaskPriority }));
  }

  protected setDeadline(date: Date | null) {
    this.formValue.update(f => ({ ...f, deadline: date }));
  }

  protected onClose() {
    this.sheetRef?.close();
    this.dialogRef?.close();
    this.close.emit();
  }

  protected onCancel() {
    this.sheetRef?.close();
    this.dialogRef?.close();
    this.cancel.emit();
  }

  protected onConfirm() {
    if (this.isValid()) {
      this.sheetRef?.close(this.formValue());
      this.dialogRef?.close(this.formValue());
      this.confirm.emit(this.formValue());
    }
  }
}
