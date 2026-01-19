import { Component, computed, input, output } from '@angular/core';

import { ZardIconComponent, type ZardIcon } from '@/shared/components/icon';

type FabPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';

@Component({
  selector: 'app-fab',
  standalone: true,
  imports: [ZardIconComponent],
  template: `
    <button type="button" [class]="classes()" (click)="clicked.emit()">
      <z-icon [zType]="icon()" class="h-9 w-9" />
      @if (label()) {
        <span class="ml-2">{{ label() }}</span>
      }
    </button>
  `,
})
export class FloatingActionButtonComponent {
  readonly icon = input<ZardIcon>('plus');
  readonly label = input<string>();
  readonly position = input<FabPosition>('bottom-right');

  readonly clicked = output<void>();

  protected readonly classes = computed(() => {
    const base =
      'fixed p-3 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 cursor-pointer';

    const positionClasses: Record<FabPosition, string> = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    };

    return `${base} ${positionClasses[this.position()]}`;
  });
}
