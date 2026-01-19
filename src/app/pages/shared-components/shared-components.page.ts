import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Components imports
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardAlertComponent } from '@/shared/components/alert';
import { ZardAvatarComponent } from '@/shared/components/avatar';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardCheckboxComponent } from '@/shared/components/checkbox';
import { ZardInputDirective } from '@/shared/components/input';
import { ZardSwitchComponent } from '@/shared/components/switch';
import { ZardSliderComponent } from '@/shared/components/slider';
import { ZardProgressBarComponent } from '@/shared/components/progress-bar';
import { ZardLoaderComponent } from '@/shared/components/loader';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';
import { ZardDividerComponent } from '@/shared/components/divider';
import { ZardToggleComponent } from '@/shared/components/toggle';
import { ZardKbdComponent } from '@/shared/components/kbd';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardAccordionComponent, ZardAccordionItemComponent } from '@/shared/components/accordion';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';
import { ZardTooltipDirective } from '@/shared/components/tooltip';
import { ZardEmptyComponent } from '@/shared/components/empty';

@Component({
  selector: 'app-shared-components',
  standalone: true,
  imports: [
    FormsModule,
    ZardButtonComponent,
    ZardBadgeComponent,
    ZardAlertComponent,
    ZardAvatarComponent,
    ZardCardComponent,
    ZardCheckboxComponent,
    ZardInputDirective,
    ZardSwitchComponent,
    ZardSliderComponent,
    ZardProgressBarComponent,
    ZardLoaderComponent,
    ZardSkeletonComponent,
    ZardDividerComponent,
    ZardToggleComponent,
    ZardKbdComponent,
    ZardIconComponent,
    ZardAccordionComponent,
    ZardAccordionItemComponent,
    ZardTabComponent,
    ZardTabGroupComponent,
    ZardTooltipDirective,
    ZardEmptyComponent,
  ],
  template: `
    <div class="container mx-auto p-8 space-y-12">
      <h1 class="text-4xl font-bold mb-8">Zard UI Components Showcase</h1>

      <!-- BUTTONS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Buttons</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Button Types</h3>
            <div class="flex flex-wrap gap-3">
              <button z-button>Default</button>
              <button z-button zType="secondary">Secondary</button>
              <button z-button zType="destructive">Destructive</button>
              <button z-button zType="outline">Outline</button>
              <button z-button zType="ghost">Ghost</button>
              <button z-button zType="link">Link</button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Button Sizes</h3>
            <div class="flex flex-wrap items-center gap-3">
              <button z-button zSize="sm">Small</button>
              <button z-button zSize="default">Default</button>
              <button z-button zSize="lg">Large</button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Button Shapes</h3>
            <div class="flex flex-wrap items-center gap-3">
              <button z-button zShape="default">Default</button>
              <button z-button zShape="circle"><z-icon zType="plus" /></button>
              <button z-button zShape="square">Square</button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Button States</h3>
            <div class="flex flex-wrap items-center gap-3">
              <button z-button zLoading>Loading</button>
              <button z-button zDisabled>Disabled</button>
              <button z-button zFull class="max-w-xs">Full Width</button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Buttons with Icons</h3>
            <div class="flex flex-wrap items-center gap-3">
              <button z-button><z-icon zType="mail" /> Login with Email</button>
              <button z-button zType="outline"><z-icon zType="code" /> Code</button>
              <button z-button zType="secondary">Next <z-icon zType="arrow-right" /></button>
            </div>
          </div>
        </div>
      </section>

      <!-- BADGES SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Badges</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Badge Types</h3>
            <div class="flex flex-wrap gap-3">
              <z-badge>Default</z-badge>
              <z-badge zType="secondary">Secondary</z-badge>
              <z-badge zType="destructive">Destructive</z-badge>
              <z-badge zType="outline">Outline</z-badge>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Badge Shapes</h3>
            <div class="flex flex-wrap gap-3">
              <z-badge zShape="default">Default</z-badge>
              <z-badge zShape="pill">Pill</z-badge>
              <z-badge zShape="square">Square</z-badge>
            </div>
          </div>
        </div>
      </section>

      <!-- ALERTS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Alerts</h2>
        <z-divider class="mb-6" />

        <div class="space-y-4">
          <z-alert
            zTitle="Default Alert"
            zDescription="This is a default alert with important information."
            zIcon="info"
          />
          <z-alert
            zType="destructive"
            zTitle="Error Alert"
            zDescription="Something went wrong. Please try again later."
          />
        </div>
      </section>

      <!-- AVATARS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Avatars</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Avatar Sizes</h3>
            <div class="flex flex-wrap items-center gap-4">
              <z-avatar zSize="sm" zFallback="SM" />
              <z-avatar zSize="default" zFallback="DF" />
              <z-avatar zSize="lg" zFallback="LG" />
              <z-avatar [zSize]="80" zFallback="80" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Avatar Shapes</h3>
            <div class="flex flex-wrap items-center gap-4">
              <z-avatar zShape="circle" zFallback="CR" />
              <z-avatar zShape="square" zFallback="SQ" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Avatar Status</h3>
            <div class="flex flex-wrap items-center gap-4">
              <z-avatar zStatus="online" zFallback="ON" />
              <z-avatar zStatus="offline" zFallback="OF" />
              <z-avatar zStatus="away" zFallback="AW" />
              <z-avatar zStatus="doNotDisturb" zFallback="DN" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Avatar with Image</h3>
            <div class="flex flex-wrap items-center gap-4">
              <z-avatar
                zSrc="https://github.com/shadcn.png"
                zAlt="User avatar"
                zFallback="CN"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- CARDS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Cards</h2>
        <z-divider class="mb-6" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <z-card zTitle="Simple Card" zDescription="A basic card component">
            <p>Card content goes here. You can put any content inside a card.</p>
          </z-card>

          <z-card
            zTitle="Card with Action"
            zDescription="Card with a clickable action button"
            zAction="View All"
          >
            <p>This card has an action button in the header.</p>
          </z-card>

          <z-card
            zTitle="Card with Footer"
            zDescription="Card with footer content"
            [zFooterBorder]="true"
          >
            <p>This card has a footer section below.</p>
            <div card-footer class="flex gap-2">
              <button z-button zType="outline" zSize="sm">Cancel</button>
              <button z-button zSize="sm">Save</button>
            </div>
          </z-card>
        </div>
      </section>

      <!-- INPUTS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Inputs</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6 max-w-md">
          <div>
            <h3 class="text-lg font-medium mb-3">Input Sizes</h3>
            <div class="flex flex-col space-y-3">
              <input z-input zSize="sm" placeholder="Small input" />
              <input z-input zSize="default" placeholder="Default input" />
              <input z-input zSize="lg" placeholder="Large input" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Input States</h3>
            <div class="flex flex-col space-y-3">
              <input z-input placeholder="Normal input" />
              <input z-input zStatus="error" placeholder="Error state" />
              <input z-input zStatus="success" placeholder="Success state" />
              <input z-input disabled placeholder="Disabled input" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Textarea</h3>
            <textarea z-input placeholder="Enter your message..." rows="3"></textarea>
          </div>
        </div>
      </section>

      <!-- CHECKBOXES SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Checkboxes</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Checkbox Types</h3>
            <div class="flex flex-wrap gap-6">
              <z-checkbox>Default checkbox</z-checkbox>
              <z-checkbox zType="destructive">Destructive checkbox</z-checkbox>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Checkbox Sizes</h3>
            <div class="flex flex-wrap gap-6">
              <z-checkbox zSize="default">Default</z-checkbox>
              <z-checkbox zSize="lg">Large</z-checkbox>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Checkbox Shapes</h3>
            <div class="flex flex-wrap gap-6">
              <z-checkbox zShape="default">Default shape</z-checkbox>
              <z-checkbox zShape="circle">Circle shape</z-checkbox>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Checkbox States</h3>
            <div class="flex flex-wrap gap-6">
              <z-checkbox [disabled]="true">Disabled</z-checkbox>
            </div>
          </div>
        </div>
      </section>

      <!-- SWITCHES SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Switches</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Switch Sizes</h3>
            <div class="flex flex-wrap gap-6">
              <z-switch zSize="sm">Small</z-switch>
              <z-switch zSize="default">Default</z-switch>
              <z-switch zSize="lg">Large</z-switch>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Switch Types</h3>
            <div class="flex flex-wrap gap-6">
              <z-switch zType="default">Default</z-switch>
              <z-switch zType="destructive">Destructive</z-switch>
            </div>
          </div>
        </div>
      </section>

      <!-- SLIDERS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Sliders</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6 max-w-md">
          <div>
            <h3 class="text-lg font-medium mb-3">Default Slider</h3>
            <z-slider [zDefault]="50" />
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Slider with Steps</h3>
            <z-slider [zDefault]="25" [zStep]="25" [zMin]="0" [zMax]="100" />
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Disabled Slider</h3>
            <z-slider [zDefault]="30" [zDisabled]="true" />
          </div>
        </div>
      </section>

      <!-- PROGRESS BARS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Progress Bars</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6 max-w-md">
          <div>
            <h3 class="text-lg font-medium mb-3">Progress Values</h3>
            <div class="flex flex-col space-y-3">
              <z-progress-bar [progress]="25" />
              <z-progress-bar [progress]="50" />
              <z-progress-bar [progress]="75" />
              <z-progress-bar [progress]="100" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Progress Types</h3>
            <div class="flex flex-col space-y-3">
              <z-progress-bar [progress]="60" zType="default" />
              <z-progress-bar [progress]="60" zType="destructive" />
              <z-progress-bar [progress]="60" zType="accent" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Progress Sizes</h3>
            <div class="flex flex-col space-y-3">
              <z-progress-bar [progress]="60" zSize="sm" />
              <z-progress-bar [progress]="60" zSize="default" />
              <z-progress-bar [progress]="60" zSize="lg" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Indeterminate Progress</h3>
            <z-progress-bar zIndeterminate />
          </div>
        </div>
      </section>

      <!-- LOADERS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Loaders</h2>
        <z-divider class="mb-6" />

        <div class="flex flex-wrap items-center gap-8">
          <div class="text-center">
            <z-loader zSize="sm" />
            <p class="mt-2 text-sm">Small</p>
          </div>
          <div class="text-center">
            <z-loader zSize="default" />
            <p class="mt-2 text-sm">Default</p>
          </div>
          <div class="text-center">
            <z-loader zSize="lg" />
            <p class="mt-2 text-sm">Large</p>
          </div>
        </div>
      </section>

      <!-- SKELETONS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Skeletons</h2>
        <z-divider class="mb-6" />

        <div class="space-y-4 max-w-md">
          <div class="flex items-center gap-4">
            <z-skeleton class="h-12 w-12 rounded-full" />
            <div class="space-y-2 flex-1">
              <z-skeleton class="h-4 w-full" />
              <z-skeleton class="h-4 w-3/4" />
            </div>
          </div>
          <z-skeleton class="h-32 w-full" />
          <div class="flex gap-4">
            <z-skeleton class="h-10 w-24" />
            <z-skeleton class="h-10 w-24" />
          </div>
        </div>
      </section>

      <!-- TOGGLES SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Toggles</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Toggle Types</h3>
            <div class="flex flex-wrap gap-3">
              <z-toggle zType="default"><z-icon zType="bold" /></z-toggle>
              <z-toggle zType="outline"><z-icon zType="italic" /></z-toggle>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Toggle Sizes</h3>
            <div class="flex flex-wrap items-center gap-3">
              <z-toggle zSize="sm"><z-icon zType="bold" /></z-toggle>
              <z-toggle zSize="md"><z-icon zType="bold" /></z-toggle>
              <z-toggle zSize="lg"><z-icon zType="bold" /></z-toggle>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Toggle States</h3>
            <div class="flex flex-wrap gap-3">
              <z-toggle [zDefault]="true"><z-icon zType="star" /></z-toggle>
              <z-toggle [disabled]="true"><z-icon zType="star" /></z-toggle>
            </div>
          </div>
        </div>
      </section>

      <!-- DIVIDERS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Dividers</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Horizontal Dividers</h3>
            <div class="space-y-4">
              <z-divider zSpacing="sm" />
              <z-divider zSpacing="default" />
              <z-divider zSpacing="lg" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Vertical Divider</h3>
            <div class="flex items-center gap-4 h-8">
              <span>Item 1</span>
              <z-divider zOrientation="vertical" />
              <span>Item 2</span>
              <z-divider zOrientation="vertical" />
              <span>Item 3</span>
            </div>
          </div>
        </div>
      </section>

      <!-- KBD SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Keyboard Keys (Kbd)</h2>
        <z-divider class="mb-6" />

        <div class="flex flex-wrap items-center gap-2">
          <z-kbd>Ctrl</z-kbd>
          <span>+</span>
          <z-kbd>C</z-kbd>
          <span class="mx-4">|</span>
          <z-kbd>Cmd</z-kbd>
          <span>+</span>
          <z-kbd>V</z-kbd>
          <span class="mx-4">|</span>
          <z-kbd>Shift</z-kbd>
          <span>+</span>
          <z-kbd>Enter</z-kbd>
        </div>
      </section>

      <!-- ICONS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Icons</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Icon Sizes</h3>
            <div class="flex flex-wrap items-center gap-4">
              <z-icon zType="heart" zSize="sm" />
              <z-icon zType="heart" zSize="default" />
              <z-icon zType="heart" zSize="lg" />
              <z-icon zType="heart" zSize="xl" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Sample Icons</h3>
            <div class="flex flex-wrap items-center gap-4">
              <z-icon zType="house" />
              <z-icon zType="settings" />
              <z-icon zType="user" />
              <z-icon zType="mail" />
              <z-icon zType="bell" />
              <z-icon zType="search" />
              <z-icon zType="check" />
              <z-icon zType="x" />
              <z-icon zType="plus" />
              <z-icon zType="minus" />
              <z-icon zType="trash" />
              <z-icon zType="file-text" />
            </div>
          </div>
        </div>
      </section>

      <!-- ACCORDION SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Accordion</h2>
        <z-divider class="mb-6" />

        <div class="max-w-lg">
          <z-accordion>
            <z-accordion-item zTitle="Is it accessible?" zValue="item-1">
              Yes. It adheres to the WAI-ARIA design pattern.
            </z-accordion-item>
            <z-accordion-item zTitle="Is it styled?" zValue="item-2">
              Yes. It comes with default styles that match the other components.
            </z-accordion-item>
            <z-accordion-item zTitle="Is it animated?" zValue="item-3">
              Yes. It's animated by default, but you can disable it if you prefer.
            </z-accordion-item>
          </z-accordion>
        </div>
      </section>

      <!-- TABS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Tabs</h2>
        <z-divider class="mb-6" />

        <div class="max-w-lg">
          <z-tab-group>
            <z-tab label="Account">
              <div class="p-4">
                <h3 class="font-medium mb-2">Account Settings</h3>
                <p class="text-muted-foreground">Manage your account settings and preferences.</p>
              </div>
            </z-tab>
            <z-tab label="Password">
              <div class="p-4">
                <h3 class="font-medium mb-2">Password Settings</h3>
                <p class="text-muted-foreground">Change your password and security settings.</p>
              </div>
            </z-tab>
            <z-tab label="Notifications">
              <div class="p-4">
                <h3 class="font-medium mb-2">Notification Preferences</h3>
                <p class="text-muted-foreground">Configure how you receive notifications.</p>
              </div>
            </z-tab>
          </z-tab-group>
        </div>
      </section>

      <!-- TOOLTIPS SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Tooltips</h2>
        <z-divider class="mb-6" />

        <div class="flex flex-wrap gap-4">
          <button z-button zTooltip="This is a tooltip" zPosition="top">
            Hover me (top)
          </button>
          <button z-button zTooltip="Tooltip on right" zPosition="right">
            Hover me (right)
          </button>
          <button z-button zTooltip="Tooltip on bottom" zPosition="bottom">
            Hover me (bottom)
          </button>
          <button z-button zTooltip="Tooltip on left" zPosition="left">
            Hover me (left)
          </button>
        </div>
      </section>

      <!-- EMPTY STATE SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Empty State</h2>
        <z-divider class="mb-6" />

        <div class="max-w-md mx-auto">
          <z-empty
            zTitle="No results found"
            zDescription="Try adjusting your search or filters to find what you're looking for."
            zIcon="search"
          />
        </div>
      </section>

    </div>
  `,
})
export class SharedComponentsPage {}
