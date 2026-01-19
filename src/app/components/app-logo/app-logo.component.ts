import { Component, input, computed } from '@angular/core';

import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [ZardIconComponent],
  template: `
    <div [class]="containerClasses()">
      <div [class]="iconContainerClasses()">
        <z-icon zType="check" [class]="iconClasses()" />
      </div>
      <span [class]="textClasses()">TaskFlow</span>
    </div>
  `,
})
export class AppLogoComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  protected readonly containerClasses = computed(() => {
    return 'flex items-center gap-2';
  });

  protected readonly iconContainerClasses = computed(() => {
    const base = 'flex items-center justify-center rounded bg-green-500 text-white';
    const sizes = {
      sm: 'h-5 w-5',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    };
    return `${base} ${sizes[this.size()]}`;
  });

  protected readonly iconClasses = computed(() => {
    const sizes = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };
    return sizes[this.size()];
  });

  protected readonly textClasses = computed(() => {
    const base = 'font-semibold text-foreground';
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
    };
    return `${base} ${sizes[this.size()]}`;
  });
}
