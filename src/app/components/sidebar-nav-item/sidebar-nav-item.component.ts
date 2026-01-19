import { Component, input, output, computed } from '@angular/core';

import { ZardIconComponent, ZardIcon } from '@/shared/components/icon';

@Component({
  selector: 'app-sidebar-nav-item',
  standalone: true,
  imports: [ZardIconComponent],
  template: `
    <button
      type="button"
      [class]="classes()"
      (click)="clicked.emit()"
    >
      <z-icon [zType]="icon()" class="h-4 w-4 shrink-0" />
      <span>{{ label() }}</span>
    </button>
  `,
})
export class SidebarNavItemComponent {
  readonly icon = input.required<ZardIcon>();
  readonly label = input.required<string>();
  readonly active = input(false);

  readonly clicked = output<void>();

  protected readonly classes = computed(() => {
    const base = 'flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

    if (this.active()) {
      return `${base} bg-accent text-accent-foreground`;
    }
    return `${base} text-muted-foreground hover:bg-accent hover:text-accent-foreground`;
  });
}
