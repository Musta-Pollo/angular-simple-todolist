import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardButtonGroupComponent, ZardButtonGroupDividerComponent } from '@/shared/components/button-group';
import { ZardToggleGroupComponent, type ZardToggleGroupItem } from '@/shared/components/toggle-group';
import { ZardSegmentedComponent, type SegmentedOption } from '@/shared/components/segmented';
import { ZardResizableComponent, ZardResizablePanelComponent, ZardResizableHandleComponent } from '@/shared/components/resizable';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [
    FormsModule,
    ZardButtonComponent,
    ZardDividerComponent,
    ZardIconComponent,
    ZardButtonGroupComponent,
    ZardButtonGroupDividerComponent,
    ZardToggleGroupComponent,
    ZardSegmentedComponent,
    ZardResizableComponent,
    ZardResizablePanelComponent,
    ZardResizableHandleComponent,
  ],
  template: `
    <div class="container mx-auto p-8 space-y-12">
      <h1 class="text-4xl font-bold mb-8">Control Components</h1>

      <!-- BUTTON GROUP SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Button Group</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Horizontal Button Group</h3>
            <z-button-group>
              <button z-button zType="outline">Left</button>
              <button z-button zType="outline">Middle</button>
              <button z-button zType="outline">Right</button>
            </z-button-group>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">With Dividers</h3>
            <z-button-group>
              <button z-button zType="outline">
                <z-icon zType="bold" />
              </button>
              <z-button-group-divider />
              <button z-button zType="outline">
                <z-icon zType="italic" />
              </button>
              <z-button-group-divider />
              <button z-button zType="outline">
                <z-icon zType="underline" />
              </button>
            </z-button-group>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Vertical Button Group</h3>
            <z-button-group zOrientation="vertical">
              <button z-button zType="outline">Top</button>
              <button z-button zType="outline">Middle</button>
              <button z-button zType="outline">Bottom</button>
            </z-button-group>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Button Group Variants</h3>
            <div class="flex flex-wrap gap-4">
              <z-button-group>
                <button z-button>Primary</button>
                <button z-button>Group</button>
              </z-button-group>

              <z-button-group>
                <button z-button zType="secondary">Secondary</button>
                <button z-button zType="secondary">Group</button>
              </z-button-group>

              <z-button-group>
                <button z-button zType="destructive">Delete</button>
                <button z-button zType="destructive">
                  <z-icon zType="chevron-down" />
                </button>
              </z-button-group>
            </div>
          </div>
        </div>
      </section>

      <!-- TOGGLE GROUP SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Toggle Group</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Single Selection</h3>
            <z-toggle-group
              zMode="single"
              [items]="alignmentItems"
              [(ngModel)]="selectedAlignment"
            />
            <p class="mt-2 text-sm text-muted-foreground">Selected: {{ selectedAlignment || 'None' }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Multiple Selection</h3>
            <z-toggle-group
              zMode="multiple"
              [items]="formattingItems"
              [(ngModel)]="selectedFormatting"
            />
            <p class="mt-2 text-sm text-muted-foreground">Selected: {{ selectedFormatting.length ? selectedFormatting.join(', ') : 'None' }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Toggle Group Types</h3>
            <div class="space-y-4">
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Default:</span>
                <z-toggle-group zType="default" [items]="viewItems" zMode="single" />
              </div>
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Outline:</span>
                <z-toggle-group zType="outline" [items]="viewItems" zMode="single" />
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Toggle Group Sizes</h3>
            <div class="space-y-4">
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Small:</span>
                <z-toggle-group zSize="sm" [items]="simpleItems" zMode="single" />
              </div>
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Medium:</span>
                <z-toggle-group zSize="md" [items]="simpleItems" zMode="single" />
              </div>
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Large:</span>
                <z-toggle-group zSize="lg" [items]="simpleItems" zMode="single" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SEGMENTED SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Segmented Control</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Basic Segmented</h3>
            <z-segmented [zOptions]="tabOptions" [(ngModel)]="selectedTab" />
            <p class="mt-2 text-sm text-muted-foreground">Selected: {{ selectedTab }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">With Default Value</h3>
            <z-segmented [zOptions]="statusOptions" zDefaultValue="pending" />
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Segmented Sizes</h3>
            <div class="space-y-4">
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Small:</span>
                <z-segmented [zOptions]="sizeOptions" zSize="sm" zDefaultValue="md" />
              </div>
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Default:</span>
                <z-segmented [zOptions]="sizeOptions" zSize="default" zDefaultValue="md" />
              </div>
              <div>
                <span class="text-sm text-muted-foreground mb-2 block">Large:</span>
                <z-segmented [zOptions]="sizeOptions" zSize="lg" zDefaultValue="md" />
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">With Disabled Options</h3>
            <z-segmented [zOptions]="disabledOptions" zDefaultValue="free" />
          </div>
        </div>
      </section>

      <!-- RESIZABLE SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Resizable Panels</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Horizontal Resizable</h3>
            <z-resizable class="h-48 rounded-lg border">
              <z-resizable-panel [zDefaultSize]="30">
                <div class="flex h-full items-center justify-center p-6">
                  <span class="font-semibold">Panel 1</span>
                </div>
              </z-resizable-panel>
              <z-resizable-handle />
              <z-resizable-panel [zDefaultSize]="70">
                <div class="flex h-full items-center justify-center p-6">
                  <span class="font-semibold">Panel 2</span>
                </div>
              </z-resizable-panel>
            </z-resizable>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Vertical Resizable</h3>
            <z-resizable zDirection="vertical" class="h-64 rounded-lg border">
              <z-resizable-panel [zDefaultSize]="40">
                <div class="flex h-full items-center justify-center p-6">
                  <span class="font-semibold">Top Panel</span>
                </div>
              </z-resizable-panel>
              <z-resizable-handle />
              <z-resizable-panel [zDefaultSize]="60">
                <div class="flex h-full items-center justify-center p-6">
                  <span class="font-semibold">Bottom Panel</span>
                </div>
              </z-resizable-panel>
            </z-resizable>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Multiple Panels</h3>
            <z-resizable class="h-48 rounded-lg border">
              <z-resizable-panel [zDefaultSize]="25" [zMin]="15">
                <div class="flex h-full items-center justify-center p-4 bg-muted/50">
                  <span class="font-medium text-sm">Sidebar</span>
                </div>
              </z-resizable-panel>
              <z-resizable-handle />
              <z-resizable-panel [zDefaultSize]="50">
                <div class="flex h-full items-center justify-center p-4">
                  <span class="font-medium text-sm">Content</span>
                </div>
              </z-resizable-panel>
              <z-resizable-handle />
              <z-resizable-panel [zDefaultSize]="25" [zMin]="15">
                <div class="flex h-full items-center justify-center p-4 bg-muted/50">
                  <span class="font-medium text-sm">Info</span>
                </div>
              </z-resizable-panel>
            </z-resizable>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Nested Resizable</h3>
            <z-resizable class="h-72 rounded-lg border">
              <z-resizable-panel [zDefaultSize]="30">
                <div class="flex h-full items-center justify-center p-4 bg-muted/30">
                  <span class="font-medium text-sm">Left</span>
                </div>
              </z-resizable-panel>
              <z-resizable-handle />
              <z-resizable-panel [zDefaultSize]="70">
                <z-resizable zDirection="vertical" class="h-full">
                  <z-resizable-panel [zDefaultSize]="50">
                    <div class="flex h-full items-center justify-center p-4">
                      <span class="font-medium text-sm">Top Right</span>
                    </div>
                  </z-resizable-panel>
                  <z-resizable-handle />
                  <z-resizable-panel [zDefaultSize]="50">
                    <div class="flex h-full items-center justify-center p-4 bg-muted/30">
                      <span class="font-medium text-sm">Bottom Right</span>
                    </div>
                  </z-resizable-panel>
                </z-resizable>
              </z-resizable-panel>
            </z-resizable>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class ControlsPage {
  selectedAlignment = 'left';
  selectedFormatting: string[] = [];
  selectedTab = 'all';

  alignmentItems: ZardToggleGroupItem[] = [
    { value: 'left', icon: 'text-align-start', ariaLabel: 'Align left' },
    { value: 'center', icon: 'text-align-center', ariaLabel: 'Align center' },
    { value: 'right', icon: 'text-align-end', ariaLabel: 'Align right' },
  ];

  formattingItems: ZardToggleGroupItem[] = [
    { value: 'bold', icon: 'bold', ariaLabel: 'Bold' },
    { value: 'italic', icon: 'italic', ariaLabel: 'Italic' },
    { value: 'underline', icon: 'underline', ariaLabel: 'Underline' },
  ];

  viewItems: ZardToggleGroupItem[] = [
    { value: 'list', icon: 'layers', label: 'List' },
    { value: 'grid', icon: 'layout-dashboard', label: 'Grid' },
  ];

  simpleItems: ZardToggleGroupItem[] = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];

  tabOptions: SegmentedOption[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
  ];

  statusOptions: SegmentedOption[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  sizeOptions: SegmentedOption[] = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ];

  disabledOptions: SegmentedOption[] = [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ];
}
