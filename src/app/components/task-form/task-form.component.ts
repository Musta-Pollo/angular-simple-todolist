import { Component, computed, effect, inject, input, output, signal } from '@angular/core';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDatePickerComponent } from '@/shared/components/date-picker';
import { ZardDialogHeaderComponent } from '@/shared/components/dialog-header';
import { Z_MODAL_DATA, ZardDialogRef } from '@/shared/components/dialog';
import { ZardInputDirective } from '@/shared/components/input';
import { Z_SHEET_DATA, ZardSheetRef } from '@/shared/components/sheet';

import type { FilterPriority, TaskPriority } from '@/core/models';
import { PrioritySelectorComponent } from '@/components/priority-selector';

export interface TaskFormValue {
  name: string;
  priority: TaskPriority;
  deadline: Date | null;
  isCompleted: boolean;
}

export interface TaskFormData {
  mode?: 'create' | 'edit';
  initialValue?: Partial<TaskFormValue>;
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
  private readonly sheetData = inject<TaskFormData>(Z_SHEET_DATA, { optional: true });
  private readonly dialogData = inject<TaskFormData>(Z_MODAL_DATA, { optional: true });

  readonly initialValue = input<Partial<TaskFormValue>>();
  readonly mode = input<'create' | 'edit'>('create');

  readonly close = output<void>();
  readonly cancel = output<void>();
  readonly confirm = output<TaskFormValue>();

  protected readonly formValue = signal<TaskFormValue>({ ...EMPTY_FORM });
  protected readonly formMode = signal<'create' | 'edit'>('create');

  protected readonly formTitle = computed(() => {
    return this.formMode() === 'create' ? 'New Task' : 'Edit Task';
  });

  protected readonly confirmLabel = computed(() => {
    return this.formMode() === 'create' ? 'Create Task' : 'Save Changes';
  });

  protected readonly isValid = computed(() => {
    return this.formValue().name.trim().length > 0;
  });

  private readonly hasInjectedData: boolean;

  constructor() {
    // Initialize from injected modal data (takes precedence)
    const injectedData = this.sheetData ?? this.dialogData;
    this.hasInjectedData = !!injectedData;

    if (injectedData) {
      if (injectedData.mode) {
        this.formMode.set(injectedData.mode);
      }
      if (injectedData.initialValue) {
        this.formValue.set({ ...EMPTY_FORM, ...injectedData.initialValue });
      }
    }

    // Watch input changes for non-modal usage only
    effect(() => {
      const initial = this.initialValue();
      if (initial && !this.hasInjectedData) {
        this.formValue.set({ ...EMPTY_FORM, ...initial });
      }
    });

    effect(() => {
      const inputMode = this.mode();
      if (inputMode && !this.hasInjectedData) {
        this.formMode.set(inputMode);
      }
    });
  }

  protected updateName(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.formValue.update(f => ({ ...f, name: value }));
  }

  protected setPriority(priority: FilterPriority) {
    if (priority !== 'all') {
      this.formValue.update(f => ({ ...f, priority }));
    }
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
