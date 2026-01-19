import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, TemplateRef, Type } from '@angular/core';

import { ZardDialogService } from '@/shared/components/dialog';
import { ZardSheetService } from '@/shared/components/sheet';
import type { ZardSheetRef } from '@/shared/components/sheet/sheet-ref';
import type { ZardDialogRef } from '@/shared/components/dialog/dialog-ref';

export type ResponsiveModalMode = 'bottom-sheet' | 'dialog' | 'side-sheet';

export interface ResponsiveModalOptions<T, U = unknown> {
  content: TemplateRef<T> | Type<T>;
  title?: string;
  description?: string;
  data?: U;
  hideFooter?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  okText?: string | null;
  cancelText?: string | null;
  okDestructive?: boolean;
  onOk?: (instance: T) => void | false;
  onCancel?: (instance: T) => void;
  width?: string;
}

export class ResponsiveModalRef<T = unknown> {
  private sheetRef?: ZardSheetRef<T>;
  private dialogRef?: ZardDialogRef<T>;

  readonly mode: ResponsiveModalMode;

  get componentInstance(): T | null {
    return this.sheetRef?.componentInstance ?? this.dialogRef?.componentInstance ?? null;
  }

  constructor(
    mode: ResponsiveModalMode,
    sheetRef?: ZardSheetRef<T>,
    dialogRef?: ZardDialogRef<T>,
  ) {
    this.mode = mode;
    this.sheetRef = sheetRef;
    this.dialogRef = dialogRef;
  }

  close(result?: unknown): void {
    this.sheetRef?.close(result);
    this.dialogRef?.close(result);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ResponsiveModalService {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly sheetService = inject(ZardSheetService);
  private readonly dialogService = inject(ZardDialogService);

  private currentMode: ResponsiveModalMode = 'dialog';

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.currentMode = 'bottom-sheet';
        } else if (result.breakpoints[Breakpoints.Small] || result.breakpoints[Breakpoints.Medium]) {
          this.currentMode = 'dialog';
        } else {
          this.currentMode = 'side-sheet';
        }
      });
  }

  getMode(): ResponsiveModalMode {
    return this.currentMode;
  }

  open<T, U = unknown>(options: ResponsiveModalOptions<T, U>): ResponsiveModalRef<T> {
    const mode = this.currentMode;

    if (mode === 'bottom-sheet') {
      return this.openSheet(options, 'bottom');
    } else if (mode === 'side-sheet') {
      return this.openSheet(options, 'right');
    } else {
      return this.openDialog(options);
    }
  }

  private openSheet<T, U>(
    options: ResponsiveModalOptions<T, U>,
    side: 'bottom' | 'right',
  ): ResponsiveModalRef<T> {
    const sheetRef = this.sheetService.create({
      zContent: options.content,
      zTitle: options.title,
      zDescription: options.description,
      zData: options.data,
      zSide: side,
      zHideFooter: options.hideFooter ?? true,
      zClosable: options.closable ?? false,
      zMaskClosable: options.maskClosable ?? true,
      zOkText: options.okText,
      zCancelText: options.cancelText,
      zOkDestructive: options.okDestructive,
      zOnOk: options.onOk,
      zOnCancel: options.onCancel,
      zWidth: side === 'right' ? (options.width ?? '400px') : undefined,
    });

    return new ResponsiveModalRef<T>(side === 'bottom' ? 'bottom-sheet' : 'side-sheet', sheetRef);
  }

  private openDialog<T, U>(options: ResponsiveModalOptions<T, U>): ResponsiveModalRef<T> {
    const dialogRef = this.dialogService.create({
      zContent: options.content,
      zTitle: options.title,
      zDescription: options.description,
      zData: options.data,
      zHideFooter: options.hideFooter ?? true,
      zClosable: options.closable ?? false,
      zMaskClosable: options.maskClosable ?? true,
      zOkText: options.okText,
      zCancelText: options.cancelText,
      zOkDestructive: options.okDestructive,
      zOnOk: options.onOk,
      zOnCancel: options.onCancel,
      zWidth: options.width ?? '450px',
    });

    return new ResponsiveModalRef<T>('dialog', undefined, dialogRef);
  }
}
