import { Component } from '@angular/core';

import { ZardDividerComponent } from '@/shared/components/divider';

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [ZardDividerComponent],
  template: `
    <div class="container mx-auto p-8 space-y-12">
      <div>
        <h1 class="text-4xl font-bold mb-2">App Elements</h1>
        <p class="text-muted-foreground">Custom components and elements specific to this application.</p>
      </div>

      <z-divider />

      <!-- Add your app-specific components here -->

      <!-- SideBar Nav Item -->
       

    </div>
  `,
})
export class AppElementsPage {}
