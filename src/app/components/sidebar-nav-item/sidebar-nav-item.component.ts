import { Component, input, output, computed } from '@angular/core';

import { ZardIconComponent, ZardIcon } from '@/shared/components/icon';
import { ZardTooltipImports } from '@/shared/components/tooltip';

@Component({
  selector: 'app-sidebar-nav-item',
  standalone: true,
  imports: [ZardIconComponent, ZardTooltipImports],
  template: `
    <button
      type="button"
      [class]="classes()"
      [zTooltip]="collapsed() ? label() : null"
      zTooltipPosition="right"
      (click)="clicked.emit()"
    >
      <z-icon [zType]="icon()" class="h-4 w-4 shrink-0" />
      @if (!collapsed()) {
        <span>{{ label() }}</span>
      }
    </button>
  `,
})
export class SidebarNavItemComponent {
  readonly icon = input.required<ZardIcon>();
  readonly label = input.required<string>();
  readonly active = input(false);
  readonly collapsed = input(false);

  readonly clicked = output<void>();

  protected readonly classes = computed(() => {
    const base = 'flex items-center w-full text-sm font-medium rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
    const spacing = this.collapsed() ? 'justify-center p-2' : 'gap-3 px-3 py-2';

    if (this.active()) {
      return `${base} ${spacing} bg-accent text-accent-foreground`;
    }
    return `${base} ${spacing} text-muted-foreground hover:bg-accent hover:text-accent-foreground`;
  });
}
