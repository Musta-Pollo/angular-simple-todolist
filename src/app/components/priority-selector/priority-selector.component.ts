import { Component, computed, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ZardBadgeComponent } from '@/shared/components/badge';

import type { FilterPriority } from '@/core/models';

interface PriorityOption {
  value: FilterPriority;
  label: string;
  dotColor: string;
}

const ALL_OPTION: PriorityOption = { value: 'all', label: 'All', dotColor: '' };
const NONE_OPTION: PriorityOption = { value: 'none', label: 'None', dotColor: 'bg-muted-foreground' };

const BASE_PRIORITIES: PriorityOption[] = [
  { value: 'high', label: 'High', dotColor: 'bg-red-500' },
  { value: 'medium', label: 'Medium', dotColor: 'bg-yellow-500' },
  { value: 'low', label: 'Low', dotColor: 'bg-blue-500' },
];

@Component({
  selector: 'app-priority-selector',
  standalone: true,
  imports: [ZardBadgeComponent],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (p of priorities(); track p.value) {
        <z-badge
          [zType]="value() === p.value ? 'default' : 'outline'"
          zShape="pill"
          class="cursor-pointer gap-1.5 px-3 py-1"
          (click)="select(p.value)"
        >
          @if (p.dotColor) {
            <span [class]="'w-2 h-2 rounded-full shrink-0 ' + p.dotColor"></span>
          }
          {{ p.label }}
        </z-badge>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrioritySelectorComponent),
      multi: true,
    },
  ],
})
export class PrioritySelectorComponent implements ControlValueAccessor {
  readonly value = model<FilterPriority>('none');
  readonly disabled = input(false);
  readonly includeAll = input(false);
  readonly includeNone = input(true);

  protected readonly priorities = computed(() => {
    const options: PriorityOption[] = [];

    if (this.includeAll()) {
      options.push(ALL_OPTION);
    }

    options.push(...BASE_PRIORITIES);

    if (this.includeNone()) {
      options.push(NONE_OPTION);
    }

    return options;
  });

  private onChange: (value: FilterPriority) => void = () => {};
  private onTouched: () => void = () => {};

  select(priority: FilterPriority) {
    if (this.disabled()) return;

    this.value.set(priority);
    this.onChange(priority);
    this.onTouched();
  }

  writeValue(value: FilterPriority): void {
    this.value.set(value ?? 'none');
  }

  registerOnChange(fn: (value: FilterPriority) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
