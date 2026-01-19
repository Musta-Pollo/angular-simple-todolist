import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { ZardRadioComponent } from '@/shared/components/radio';
import { ZardSelectComponent, ZardSelectItemComponent } from '@/shared/components/select';
import { ZardInputDirective } from '@/shared/components/input';
import { ZardCardComponent } from '@/shared/components/card';

@Component({
  selector: 'app-form-components',
  standalone: true,
  imports: [
    FormsModule,
    ZardButtonComponent,
    ZardDividerComponent,
    ZardRadioComponent,
    ZardSelectComponent,
    ZardSelectItemComponent,
    ZardInputDirective,
    ZardCardComponent,
  ],
  template: `
    <div class="container mx-auto p-8 space-y-12">
      <h1 class="text-4xl font-bold mb-8">Form Components</h1>

      <!-- RADIO SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Radio Buttons</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3">Radio Group</h3>
            <div class="flex flex-col gap-3">
              <z-radio name="plan" value="free" [(ngModel)]="selectedPlan">Free Plan</z-radio>
              <z-radio name="plan" value="pro" [(ngModel)]="selectedPlan">Pro Plan</z-radio>
              <z-radio name="plan" value="enterprise" [(ngModel)]="selectedPlan">Enterprise Plan</z-radio>
            </div>
            <p class="mt-2 text-sm text-muted-foreground">Selected: {{ selectedPlan }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Disabled Radio</h3>
            <div class="flex flex-col gap-3">
              <z-radio name="disabled-demo" value="option1" [disabled]="true">Disabled Option</z-radio>
              <z-radio name="disabled-demo" value="option2">Enabled Option</z-radio>
            </div>
          </div>
        </div>
      </section>

      <!-- SELECT SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Select</h2>
        <z-divider class="mb-6" />

        <div class="space-y-6 max-w-md">
          <div>
            <h3 class="text-lg font-medium mb-3">Basic Select</h3>
            <z-select zPlaceholder="Select a fruit..." [(zValue)]="selectedFruit">
              <z-select-item zValue="apple">Apple</z-select-item>
              <z-select-item zValue="banana">Banana</z-select-item>
              <z-select-item zValue="orange">Orange</z-select-item>
              <z-select-item zValue="grape">Grape</z-select-item>
              <z-select-item zValue="mango">Mango</z-select-item>
            </z-select>
            <p class="mt-2 text-sm text-muted-foreground">Selected: {{ selectedFruit || 'None' }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Select Sizes</h3>
            <div class="flex flex-col space-y-3">
              <z-select zPlaceholder="Small select..." zSize="sm">
                <z-select-item zValue="1">Option 1</z-select-item>
                <z-select-item zValue="2">Option 2</z-select-item>
              </z-select>
              <z-select zPlaceholder="Default select..." zSize="default">
                <z-select-item zValue="1">Option 1</z-select-item>
                <z-select-item zValue="2">Option 2</z-select-item>
              </z-select>
              <z-select zPlaceholder="Large select..." zSize="lg">
                <z-select-item zValue="1">Option 1</z-select-item>
                <z-select-item zValue="2">Option 2</z-select-item>
              </z-select>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Multi-Select</h3>
            <z-select zPlaceholder="Select colors..." [zMultiple]="true" [(zValue)]="selectedColors">
              <z-select-item zValue="red">Red</z-select-item>
              <z-select-item zValue="green">Green</z-select-item>
              <z-select-item zValue="blue">Blue</z-select-item>
              <z-select-item zValue="yellow">Yellow</z-select-item>
              <z-select-item zValue="purple">Purple</z-select-item>
            </z-select>
            <p class="mt-2 text-sm text-muted-foreground">Selected: {{ selectedColors.length ? selectedColors.join(', ') : 'None' }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Disabled Select</h3>
            <z-select zPlaceholder="Disabled..." [zDisabled]="true">
              <z-select-item zValue="1">Option 1</z-select-item>
            </z-select>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Select with Disabled Items</h3>
            <z-select zPlaceholder="Select status...">
              <z-select-item zValue="active">Active</z-select-item>
              <z-select-item zValue="pending">Pending</z-select-item>
              <z-select-item zValue="disabled" [zDisabled]="true">Disabled (Not Available)</z-select-item>
              <z-select-item zValue="archived">Archived</z-select-item>
            </z-select>
          </div>
        </div>
      </section>

      <!-- FORM EXAMPLE -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Form Example</h2>
        <z-divider class="mb-6" />

        <z-card zTitle="Account Settings" zDescription="Update your account information" class="max-w-lg">
          <form class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Full Name</label>
              <input z-input placeholder="Enter your name" />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">Email</label>
              <input z-input type="email" placeholder="Enter your email" />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">Country</label>
              <z-select zPlaceholder="Select your country...">
                <z-select-item zValue="us">United States</z-select-item>
                <z-select-item zValue="uk">United Kingdom</z-select-item>
                <z-select-item zValue="ca">Canada</z-select-item>
                <z-select-item zValue="au">Australia</z-select-item>
                <z-select-item zValue="de">Germany</z-select-item>
              </z-select>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">Account Type</label>
              <div class="flex flex-col gap-2">
                <z-radio name="account-type" value="personal">Personal</z-radio>
                <z-radio name="account-type" value="business">Business</z-radio>
              </div>
            </div>

            <div class="flex gap-2 pt-4">
              <button z-button type="submit">Save Changes</button>
              <button z-button zType="outline" type="button">Cancel</button>
            </div>
          </form>
        </z-card>
      </section>
    </div>
  `,
})
export class FormComponentsPage {
  selectedPlan = 'free';
  selectedFruit = '';
  selectedColors: string[] = [];
}
