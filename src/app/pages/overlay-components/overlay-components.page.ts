import { Component, TemplateRef, viewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { ZardDialogModule, ZardDialogService } from '@/shared/components/dialog';
import { ZardDropdownMenuComponent, ZardDropdownMenuItemComponent } from '@/shared/components/dropdown';
import { ZardPopoverDirective, ZardPopoverComponent } from '@/shared/components/popover';
import { ZardSheetService, ZardSheetRef } from '@/shared/components/sheet';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardInputDirective } from '@/shared/components/input';

@Component({
  selector: 'app-overlay-components',
  standalone: true,
  imports: [
    FormsModule,
    ZardButtonComponent,
    ZardDividerComponent,
    ZardDialogModule,
    ZardDropdownMenuComponent,
    ZardDropdownMenuItemComponent,
    ZardPopoverDirective,
    ZardPopoverComponent,
    ZardIconComponent,
    ZardInputDirective,
  ],
  template: `
    <div class="container mx-auto p-8 space-y-12">
      <h1 class="text-4xl font-bold mb-8">Overlay Components</h1>

      <!-- DIALOG SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Dialog</h2>
        <z-divider class="mb-6" />

        <div class="flex flex-wrap gap-4">
          <button z-button (click)="openBasicDialog()">
            Open Basic Dialog
          </button>
          <button z-button zType="outline" (click)="openConfirmDialog()">
            Open Confirm Dialog
          </button>
          <button z-button zType="destructive" (click)="openDestructiveDialog()">
            Delete Item
          </button>
          <button z-button zType="secondary" (click)="openCustomDialog()">
            Open Custom Dialog
          </button>
        </div>

        <ng-template #customDialogContent>
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Name</label>
              <input z-input placeholder="Enter name..." />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Email</label>
              <input z-input type="email" placeholder="Enter email..." />
            </div>
          </div>
        </ng-template>
      </section>

      <!-- DROPDOWN SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Dropdown Menu</h2>
        <z-divider class="mb-6" />

        <div class="flex flex-wrap gap-4">
          <z-dropdown-menu>
            <button z-button zType="outline" dropdown-trigger>
              <z-icon zType="settings" class="mr-2" />
              Options
              <z-icon zType="chevron-down" class="ml-2" />
            </button>

            <z-dropdown-menu-item (click)="onMenuClick('Profile')">
              <z-icon zType="user" class="mr-2" /> Profile
            </z-dropdown-menu-item>
            <z-dropdown-menu-item (click)="onMenuClick('Settings')">
              <z-icon zType="settings" class="mr-2" /> Settings
            </z-dropdown-menu-item>
            <z-dropdown-menu-item (click)="onMenuClick('Notifications')">
              <z-icon zType="bell" class="mr-2" /> Notifications
            </z-dropdown-menu-item>
            <z-dropdown-menu-item [disabled]="true">
              <z-icon zType="ban" class="mr-2" /> Disabled
            </z-dropdown-menu-item>
            <z-dropdown-menu-item variant="destructive" (click)="onMenuClick('Logout')">
              <z-icon zType="log-out" class="mr-2" /> Logout
            </z-dropdown-menu-item>
          </z-dropdown-menu>

          <z-dropdown-menu>
            <button z-button dropdown-trigger>
              Actions
              <z-icon zType="chevron-down" class="ml-2" />
            </button>

            <z-dropdown-menu-item (click)="onMenuClick('New File')">
              <z-icon zType="file" class="mr-2" /> New File
            </z-dropdown-menu-item>
            <z-dropdown-menu-item (click)="onMenuClick('New Folder')">
              <z-icon zType="folder" class="mr-2" /> New Folder
            </z-dropdown-menu-item>
            <z-dropdown-menu-item (click)="onMenuClick('Upload')">
              <z-icon zType="arrow-up" class="mr-2" /> Upload
            </z-dropdown-menu-item>
          </z-dropdown-menu>
        </div>

        <p class="mt-4 text-sm text-muted-foreground">Last clicked: {{ lastMenuClick }}</p>
      </section>

      <!-- POPOVER SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Popover</h2>
        <z-divider class="mb-6" />

        <div class="flex flex-wrap gap-4">
          <button z-button zType="outline" zPopover [zContent]="popoverContent1" zTrigger="click" zPlacement="bottom">
            Click Popover
          </button>

          <button z-button zType="outline" zPopover [zContent]="popoverContent2" zTrigger="hover" zPlacement="top">
            Hover Popover
          </button>

          <button z-button zType="outline" zPopover [zContent]="popoverContent3" zTrigger="click" zPlacement="right">
            Right Popover
          </button>

          <button z-button zType="outline" zPopover [zContent]="popoverContent4" zTrigger="click" zPlacement="left">
            Left Popover
          </button>
        </div>

        <ng-template #popoverContent1>
          <z-popover>
            <div class="space-y-2">
              <h4 class="font-medium">Click Popover</h4>
              <p class="text-sm text-muted-foreground">This popover opens on click and closes when clicking outside.</p>
            </div>
          </z-popover>
        </ng-template>

        <ng-template #popoverContent2>
          <z-popover>
            <div class="space-y-2">
              <h4 class="font-medium">Hover Popover</h4>
              <p class="text-sm text-muted-foreground">This popover opens on hover and closes when mouse leaves.</p>
            </div>
          </z-popover>
        </ng-template>

        <ng-template #popoverContent3>
          <z-popover>
            <div class="space-y-2">
              <h4 class="font-medium">Right Placement</h4>
              <p class="text-sm text-muted-foreground">Opens on the right side of the trigger element.</p>
            </div>
          </z-popover>
        </ng-template>

        <ng-template #popoverContent4>
          <z-popover>
            <div class="space-y-2">
              <h4 class="font-medium">Left Placement</h4>
              <p class="text-sm text-muted-foreground">Opens on the left side of the trigger element.</p>
            </div>
          </z-popover>
        </ng-template>
      </section>

      <!-- SHEET SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Sheet</h2>
        <z-divider class="mb-6" />

        <div class="flex flex-wrap gap-4">
          <button z-button zType="outline" (click)="openSheet('right')">
            Open Right Sheet
          </button>
          <button z-button zType="outline" (click)="openSheet('left')">
            Open Left Sheet
          </button>
          <button z-button zType="outline" (click)="openSheet('top')">
            Open Top Sheet
          </button>
          <button z-button zType="outline" (click)="openSheet('bottom')">
            Open Bottom Sheet
          </button>
        </div>

        <ng-template #sheetContent>
          <div class="p-6 space-y-4">
            <h3 class="text-lg font-semibold">Sheet Content</h3>
            <p class="text-muted-foreground">This is the content of the sheet. You can put any content here.</p>
            <div class="space-y-2">
              <label class="text-sm font-medium">Name</label>
              <input z-input placeholder="Enter your name..." />
            </div>
            <div class="flex gap-2">
              <button z-button (click)="closeCurrentSheet()">Save</button>
              <button z-button zType="outline" (click)="closeCurrentSheet()">Cancel</button>
            </div>
          </div>
        </ng-template>
      </section>

    </div>
  `,
})
export class OverlayComponentsPage {
  private dialogService = inject(ZardDialogService);
  private sheetService = inject(ZardSheetService);

  readonly sheetContent = viewChild<TemplateRef<unknown>>('sheetContent');
  readonly customDialogContent = viewChild<TemplateRef<unknown>>('customDialogContent');

  lastMenuClick = 'None';
  private currentSheetRef: ZardSheetRef<unknown> | null = null;

  openBasicDialog() {
    this.dialogService.create({
      zTitle: 'Basic Dialog',
      zDescription: 'This is a simple dialog with a title and description.',
      zContent: 'You can put any content here. This dialog has OK and Cancel buttons by default.',
      zOkText: 'Got it',
      zCancelText: 'Close',
    });
  }

  openConfirmDialog() {
    this.dialogService.create({
      zTitle: 'Confirm Action',
      zDescription: 'Are you sure you want to proceed with this action?',
      zContent: 'This action cannot be undone. Please confirm your choice.',
      zOkText: 'Confirm',
      zCancelText: 'Cancel',
    });
  }

  openDestructiveDialog() {
    this.dialogService.create({
      zTitle: 'Delete Item',
      zDescription: 'This action is permanent and cannot be reversed.',
      zContent: 'Are you sure you want to delete this item? All associated data will be lost.',
      zOkText: 'Delete',
      zOkDestructive: true,
      zCancelText: 'Keep',
    });
  }

  openCustomDialog() {
    const content = this.customDialogContent();
    if (content) {
      this.dialogService.create({
        zTitle: 'Edit Profile',
        zDescription: 'Update your profile information',
        zContent: content,
        zOkText: 'Save',
        zCancelText: 'Cancel',
        zWidth: '400px',
      });
    }
  }

  onMenuClick(item: string) {
    this.lastMenuClick = item;
  }

  openSheet(side: 'top' | 'right' | 'bottom' | 'left') {
    const content = this.sheetContent();
    if (content) {
      this.currentSheetRef = this.sheetService.create({
        zContent: content,
        zSide: side,
        zTitle: `${side.charAt(0).toUpperCase() + side.slice(1)} Sheet`,
        zDescription: `This sheet slides in from the ${side}.`,
      });
    }
  }

  closeCurrentSheet() {
    this.currentSheetRef?.close();
    this.currentSheetRef = null;
  }
}
