import { Component, inject, input, output } from '@angular/core';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDialogRef } from '@/shared/components/dialog/dialog-ref';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardSheetRef } from '@/shared/components/sheet/sheet-ref';

@Component({
  selector: 'z-dialog-header',
  standalone: true,
  imports: [ZardButtonComponent, ZardIconComponent],
  template: `
    <div class="flex items-center justify-between pb-4 border-b">
      <h2 class="text-lg font-semibold">{{ zTitle() }}</h2>
      <button
        type="button"
        z-button
        zType="ghost"
        zSize="sm"
        class="h-8 w-8 p-0"
        (click)="onClose()"
      >
        <z-icon zType="x" class="h-4 w-4" />
      </button>
    </div>
  `,
})
export class ZardDialogHeaderComponent {
  private readonly sheetRef = inject(ZardSheetRef, { optional: true });
  private readonly dialogRef = inject(ZardDialogRef, { optional: true });

  readonly zTitle = input.required<string>();
  readonly close = output<void>();

  protected onClose() {
    this.sheetRef?.close();
    this.dialogRef?.close();
    this.close.emit();
  }
}
