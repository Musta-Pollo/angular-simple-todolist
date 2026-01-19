import { Component, inject } from '@angular/core';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDialogRef } from '@/shared/components/dialog/dialog-ref';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardIconComponent } from '@/shared/components/icon';

export interface DeleteConfirmationData {
  title?: string;
  message?: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [ZardButtonComponent, ZardIconComponent],
  template: `
    <div class="flex flex-col items-center text-center gap-4">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <z-icon zType="trash" class="h-6 w-6 text-destructive" />
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <p class="text-sm text-muted-foreground">
          @if (itemName) {
            Are you sure you want to delete "<span class="font-semibold text-foreground">{{ itemName }}</span>"? This action cannot be undone.
          } @else {
            {{ message }}
          }
        </p>
      </div>

      <div class="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-center">
        <button z-button zType="outline" (click)="onCancel()">
          {{ cancelText }}
        </button>
        <button z-button zType="destructive" (click)="onConfirm()">
          <z-icon zType="trash" class="h-4 w-4" />
          {{ confirmText }}
        </button>
      </div>
    </div>
  `,
})
export class DeleteConfirmationComponent {
  private readonly dialogRef = inject(ZardDialogRef);
  private readonly data = inject<DeleteConfirmationData>(Z_MODAL_DATA, { optional: true });

  protected get title(): string {
    return this.data?.title ?? 'Delete Task';
  }

  protected get itemName(): string | undefined {
    return this.data?.itemName;
  }

  protected get message(): string {
    if (this.data?.message) {
      return this.data.message;
    }
    return 'Are you sure you want to delete this item? This action cannot be undone.';
  }

  protected get confirmText(): string {
    return this.data?.confirmText ?? 'Delete';
  }

  protected get cancelText(): string {
    return this.data?.cancelText ?? 'Cancel';
  }

  protected onCancel() {
    this.dialogRef.close(false);
  }

  protected onConfirm() {
    this.dialogRef.close(true);
  }
}
