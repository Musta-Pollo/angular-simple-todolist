import { Component, input, output, signal } from '@angular/core';

import { FilterDropdownComponent, type FilterState } from '@/components/filter-dropdown';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardInputDirective } from '@/shared/components/input';

@Component({
  selector: 'app-search-filter-bar',
  standalone: true,
  imports: [ZardIconComponent, ZardInputDirective, FilterDropdownComponent],
  template: `
    <div class="flex items-center gap-3">
      <!-- Search Input -->
      <div class="relative flex-1">
        <z-icon
          zType="search"
          class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />
        <input
          z-input
          type="text"
          [placeholder]="placeholder()"
          [value]="searchValue()"
          (input)="onSearchInput($event)"
          class="pl-12 w-full"
        />
      </div>

      <!-- Filter Dropdown -->
      <app-filter-dropdown [initialState]="filterState()" (filterChange)="onFilterChange($event)" />
    </div>
  `,
})
export class SearchFilterBarComponent {
  readonly placeholder = input('Search tasks...');
  readonly initialFilterState = input<FilterState>({
    priority: 'all',
    sortBy: 'date-created',
    descending: true,
  });

  readonly searchChange = output<string>();
  readonly filterChange = output<FilterState>();

  readonly searchValue = signal('');
  readonly filterState = signal<FilterState>({
    priority: 'all',
    sortBy: 'date-created',
    descending: true,
  });

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue.set(value);
    this.searchChange.emit(value);
  }

  onFilterChange(filter: FilterState) {
    this.filterState.set(filter);
    this.filterChange.emit(filter);
  }
}
