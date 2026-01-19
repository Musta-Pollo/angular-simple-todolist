import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { ZardBreadcrumbComponent, ZardBreadcrumbItemComponent, ZardBreadcrumbEllipsisComponent } from '@/shared/components/breadcrumb';
import { ZardPaginationComponent } from '@/shared/components/pagination';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardMenuDirective, ZardMenuContentDirective, ZardMenuItemDirective, ZardMenuLabelComponent, ZardMenuShortcutComponent } from '@/shared/components/menu';

@Component({
  selector: 'app-navigation-components',
  standalone: true,
  imports: [
    RouterLink,
    ZardButtonComponent,
    ZardDividerComponent,
    ZardBreadcrumbComponent,
    ZardBreadcrumbItemComponent,
    ZardBreadcrumbEllipsisComponent,
    ZardPaginationComponent,
    ZardTabComponent,
    ZardTabGroupComponent,
    ZardIconComponent,
    ZardMenuDirective,
    ZardMenuContentDirective,
    ZardMenuItemDirective,
    ZardMenuLabelComponent,
    ZardMenuShortcutComponent,
  ],
  template: `
    <div class="container mx-auto p-8 space-y-12">
      <h1 class="text-4xl font-bold mb-8">Navigation Components</h1>

      <!-- BREADCRUMB SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Breadcrumb</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Basic Breadcrumb</h3>
            <z-breadcrumb>
              <z-breadcrumb-item [routerLink]="['/']">Home</z-breadcrumb-item>
              <z-breadcrumb-item [routerLink]="['/components']">Components</z-breadcrumb-item>
              <z-breadcrumb-item [routerLink]="['/navigation-components']">Navigation</z-breadcrumb-item>
            </z-breadcrumb>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Breadcrumb Sizes</h3>
            <div class="flex flex-col space-y-3">
              <z-breadcrumb zSize="sm">
                <z-breadcrumb-item [routerLink]="['/']">Home</z-breadcrumb-item>
                <z-breadcrumb-item [routerLink]="['/components']">Components</z-breadcrumb-item>
                <z-breadcrumb-item>Small</z-breadcrumb-item>
              </z-breadcrumb>

              <z-breadcrumb zSize="md">
                <z-breadcrumb-item [routerLink]="['/']">Home</z-breadcrumb-item>
                <z-breadcrumb-item [routerLink]="['/components']">Components</z-breadcrumb-item>
                <z-breadcrumb-item>Medium</z-breadcrumb-item>
              </z-breadcrumb>

              <z-breadcrumb zSize="lg">
                <z-breadcrumb-item [routerLink]="['/']">Home</z-breadcrumb-item>
                <z-breadcrumb-item [routerLink]="['/components']">Components</z-breadcrumb-item>
                <z-breadcrumb-item>Large</z-breadcrumb-item>
              </z-breadcrumb>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">With Ellipsis</h3>
            <z-breadcrumb>
              <z-breadcrumb-item [routerLink]="['/']">Home</z-breadcrumb-item>
              <z-breadcrumb-item>
                <z-breadcrumb-ellipsis />
              </z-breadcrumb-item>
              <z-breadcrumb-item [routerLink]="['/components']">Components</z-breadcrumb-item>
              <z-breadcrumb-item>Current Page</z-breadcrumb-item>
            </z-breadcrumb>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Custom Separator</h3>
            <z-breadcrumb zSeparator="/">
              <z-breadcrumb-item [routerLink]="['/']">Home</z-breadcrumb-item>
              <z-breadcrumb-item [routerLink]="['/components']">Components</z-breadcrumb-item>
              <z-breadcrumb-item>Navigation</z-breadcrumb-item>
            </z-breadcrumb>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">With Icons</h3>
            <z-breadcrumb>
              <z-breadcrumb-item [routerLink]="['/']">
                <z-icon zType="house" zSize="sm" /> Home
              </z-breadcrumb-item>
              <z-breadcrumb-item [routerLink]="['/components']">
                <z-icon zType="layers" zSize="sm" /> Components
              </z-breadcrumb-item>
              <z-breadcrumb-item>
                <z-icon zType="settings" zSize="sm" /> Settings
              </z-breadcrumb-item>
            </z-breadcrumb>
          </div>
        </div>
      </section>

      <!-- MENU SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Context Menu</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Click Menu</h3>
            <div class="flex flex-wrap gap-4">
              <button z-button zType="outline" z-menu [zMenuTriggerFor]="menu1" zTrigger="click">
                <z-icon zType="settings" class="mr-2" />
                Open Menu
              </button>

              <ng-template #menu1>
                <div z-menu-content>
                  <z-menu-label>My Account</z-menu-label>
                  <button z-menu-item (click)="onMenuItemClick('Profile')">
                    <z-icon zType="user" class="mr-2" /> Profile
                    <z-menu-shortcut>⌘P</z-menu-shortcut>
                  </button>
                  <button z-menu-item (click)="onMenuItemClick('Billing')">
                    <z-icon zType="credit-card" class="mr-2" /> Billing
                    <z-menu-shortcut>⌘B</z-menu-shortcut>
                  </button>
                  <button z-menu-item (click)="onMenuItemClick('Settings')">
                    <z-icon zType="settings" class="mr-2" /> Settings
                    <z-menu-shortcut>⌘S</z-menu-shortcut>
                  </button>
                  <button z-menu-item [zDisabled]="true">
                    <z-icon zType="ban" class="mr-2" /> Disabled
                  </button>
                  <button z-menu-item zType="destructive" (click)="onMenuItemClick('Logout')">
                    <z-icon zType="log-out" class="mr-2" /> Log out
                  </button>
                </div>
              </ng-template>
            </div>
            <p class="mt-4 text-sm text-muted-foreground">Last clicked: {{ lastMenuItem() }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Hover Menu</h3>
            <div class="flex flex-wrap gap-4">
              <button z-button zType="secondary" z-menu [zMenuTriggerFor]="menu2" zTrigger="hover">
                <z-icon zType="chevron-down" class="mr-2" />
                Hover Me
              </button>

              <ng-template #menu2>
                <div z-menu-content>
                  <button z-menu-item (click)="onMenuItemClick('New File')">
                    <z-icon zType="file" class="mr-2" /> New File
                  </button>
                  <button z-menu-item (click)="onMenuItemClick('New Folder')">
                    <z-icon zType="folder" class="mr-2" /> New Folder
                  </button>
                  <button z-menu-item (click)="onMenuItemClick('Download')">
                    <z-icon zType="save" class="mr-2" /> Download
                  </button>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
      </section>

      <!-- PAGINATION SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Pagination</h2>
        <z-divider class="mb-6" />

        <div class="space-y-8">
          <div>
            <h3 class="text-lg font-medium mb-3">Basic Pagination</h3>
            <z-pagination [zTotal]="10" [(zPageIndex)]="currentPage" />
            <p class="mt-2 text-sm text-muted-foreground">Current page: {{ currentPage }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Pagination Sizes</h3>
            <div class="space-y-4">
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Small:</span>
                <z-pagination [zTotal]="5" [zPageIndex]="1" zSize="sm" />
              </div>
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Default:</span>
                <z-pagination [zTotal]="5" [zPageIndex]="1" zSize="default" />
              </div>
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Large:</span>
                <z-pagination [zTotal]="5" [zPageIndex]="1" zSize="lg" />
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Disabled Pagination</h3>
            <z-pagination [zTotal]="5" [zPageIndex]="2" [zDisabled]="true" />
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Many Pages</h3>
            <z-pagination [zTotal]="20" [(zPageIndex)]="manyPagesIndex" />
            <p class="mt-2 text-sm text-muted-foreground">Page {{ manyPagesIndex }} of 20</p>
          </div>
        </div>
      </section>

      <!-- TABS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Tabs</h2>
        <z-divider class="mb-6" />

        <div class="space-y-8">
          <div>
            <h3 class="text-lg font-medium mb-3">Basic Tabs</h3>
            <z-tab-group>
              <z-tab label="Account">
                <div class="p-4">
                  <h4 class="font-medium mb-2">Account Settings</h4>
                  <p class="text-muted-foreground">Manage your account settings and preferences.</p>
                </div>
              </z-tab>
              <z-tab label="Password">
                <div class="p-4">
                  <h4 class="font-medium mb-2">Change Password</h4>
                  <p class="text-muted-foreground">Update your password to keep your account secure.</p>
                </div>
              </z-tab>
              <z-tab label="Notifications">
                <div class="p-4">
                  <h4 class="font-medium mb-2">Notification Preferences</h4>
                  <p class="text-muted-foreground">Configure how and when you receive notifications.</p>
                </div>
              </z-tab>
            </z-tab-group>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Tabs with Bottom Position</h3>
            <z-tab-group zTabsPosition="bottom">
              <z-tab label="Overview">
                <div class="p-4">
                  <p class="text-muted-foreground">Overview of all your data and statistics.</p>
                </div>
              </z-tab>
              <z-tab label="Analytics">
                <div class="p-4">
                  <p class="text-muted-foreground">Detailed analytics and reports.</p>
                </div>
              </z-tab>
              <z-tab label="Reports">
                <div class="p-4">
                  <p class="text-muted-foreground">Generate and view reports.</p>
                </div>
              </z-tab>
            </z-tab-group>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class NavigationComponentsPage {
  currentPage = 1;
  manyPagesIndex = 1;
  lastMenuItem = signal('None');

  onMenuItemClick(item: string) {
    this.lastMenuItem.set(item);
  }
}
