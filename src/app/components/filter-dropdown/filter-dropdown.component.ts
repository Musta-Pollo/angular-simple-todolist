import { Component, computed, effect, input, output, signal } from '@angular/core';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardIconComponent, type ZardIcon } from '@/shared/components/icon';
import { ZardMenuLabelComponent } from '@/shared/components/menu';
import {
  ZardToggleGroupComponent,
  type ZardToggleGroupItem,
} from '@/shared/components/toggle-group';

import { PrioritySelectorComponent } from '@/components/priority-selector';
import type { FilterPriority, SortBy } from '@/core/models';

export interface FilterState {
  priority: FilterPriority;
  sortBy: SortBy;
  descending: boolean;
}

interface SortOption {
  value: SortBy;
  label: string;
  icon: ZardIcon;
}

const DEFAULT_FILTER_STATE: FilterState = {
  priority: 'all',
  sortBy: 'dateCreated',
  descending: false,
};

@Component({
  selector: 'app-filter-dropdown',
  standalone: true,
  imports: [
    ZardButtonComponent,
    ZardIconComponent,
    ZardDividerComponent,
    ZardMenuLabelComponent,
    ZardToggleGroupComponent,
    PrioritySelectorComponent,
    ...ZardDropdownImports,
  ],
  template: `
    <z-dropdown-menu [class]="'w-56'" align="end">
      <button
        dropdown-trigger
        z-button
        zType="outline"
        zSize="lg"
        class="gap-2"
        [class.bg-muted]="isFiltering()"
        [class.border-primary/50]="isFiltering()"
        [class.dark:bg-white/15]="isFiltering()"
        [class.dark:border-white/30]="isFiltering()"
      >
        <z-icon zType="list-filter-plus" class="h-5 w-5" />
        <span class="hidden sm:inline text-base">Filter</span>
        <z-icon zType="chevron-down" class="h-5 w-5 hidden sm:block" />
      </button>

      <!-- Priority Section -->
      <div class="p-3" (click)="$event.stopPropagation()">
        <z-menu-label class="text-xs uppercase tracking-wide mb-2 px-0">Priority</z-menu-label>
        <app-priority-selector
          [value]="state().priority"
          [includeAll]="true"
          [includeNone]="false"
          (valueChange)="selectPriority($event)"
        />
      </div>

      <z-divider zSpacing="sm" />

      <!-- Sort By Section -->
      <div class="px-3">
        <z-menu-label class="text-xs uppercase tracking-wide mb-2 px-0">Sort by</z-menu-label>
        <div class="space-y-0.5">
          @for (s of sortOptions; track s.value) {
            <button
              type="button"
              z-button
              zType="ghost"
              zSize="sm"
              class="w-full justify-start gap-3 font-normal"
              (click)="selectSortBy(s.value); $event.stopPropagation()"
            >
              <z-icon [zType]="s.icon" class="h-5 w-5 text-muted-foreground" />
              <span class="flex-1 text-left">{{ s.label }}</span>
              @if (state().sortBy === s.value) {
                <z-icon zType="check" class="h-5 w-5 text-primary" />
              }
            </button>
          }
        </div>
      </div>

      <z-divider zSpacing="sm" />

      <!-- Sort Order Toggle -->
      <div class="px-3" (click)="$event.stopPropagation()">
        <z-menu-label class="text-xs uppercase tracking-wide mb-2 px-0">Order</z-menu-label>
        <z-toggle-group
          zMode="single"
          zType="outline"
          zSize="md"
          [items]="sortOrderItems"
          [value]="state().descending ? 'desc' : 'asc'"
          (valueChange)="setSortOrder($event)"
        />
      </div>

      <z-divider zSpacing="sm" />

      <!-- Reset Filters -->
      <div class="px-3">
        <button
          type="button"
          z-button
          zType="ghost"
          zSize="default"
          class="w-full text-muted-foreground hover:text-foreground"
          (click)="resetFilters()"
        >
          Reset Filters
        </button>
      </div>
    </z-dropdown-menu>
  `,
})
export class FilterDropdownComponent {
  readonly initialState = input<FilterState>(DEFAULT_FILTER_STATE);

  readonly filterChange = output<FilterState>();

  readonly state = signal<FilterState>(DEFAULT_FILTER_STATE);

  readonly isFiltering = computed(() => this.state().priority !== 'all');

  constructor() {
    effect(() => {
      this.state.set(this.initialState());
    });
  }

  readonly sortOptions: SortOption[] = [
    { value: 'dateCreated', label: 'Date Created', icon: 'calendar' },
    { value: 'priority', label: 'Priority', icon: 'layers' },
    { value: 'deadline', label: 'Deadline', icon: 'calendar' },
    { value: 'alphabetical', label: 'Alphabetical', icon: 'file-text' },
  ];

  readonly sortOrderItems: ZardToggleGroupItem[] = [
    { value: 'desc', label: 'Desc', icon: 'chevron-down' },
    { value: 'asc', label: 'Asc', icon: 'chevron-up' },
  ];

  selectPriority(priority: FilterPriority) {
    this.state.update((s) => ({ ...s, priority }));
    this.filterChange.emit(this.state());
  }

  selectSortBy(sortBy: SortBy) {
    this.state.update((s) => ({ ...s, sortBy }));
    this.filterChange.emit(this.state());
  }

  setSortOrder(value: string | string[]) {
    const descending = value === 'desc';
    this.state.update((s) => ({ ...s, descending }));
    this.filterChange.emit(this.state());
  }

  resetFilters() {
    this.state.set(DEFAULT_FILTER_STATE);
    this.filterChange.emit(this.state());
  }
}
