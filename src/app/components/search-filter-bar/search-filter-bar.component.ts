import { Component, input, model } from '@angular/core';

import { FilterDropdownComponent, type FilterState } from '@/components/filter-dropdown';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardInputDirective } from '@/shared/components/input';

const DEFAULT_FILTER_STATE: FilterState = {
  priority: 'all',
  sortBy: 'dateCreated',
  descending: true,
};

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
          class="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
        />
        <input
          z-input
          type="text"
          zSize="lg"
          [placeholder]="placeholder()"
          [value]="searchValue()"
          (input)="onSearchInput($event)"
          class="w-full pl-12 text-base"
        />
      </div>

      <!-- Filter Dropdown -->
      <app-filter-dropdown
        [initialState]="filterState()"
        (filterChange)="filterState.set($event)"
      />
    </div>
  `,
})
export class SearchFilterBarComponent {
  readonly placeholder = input('Search tasks...');

  readonly searchValue = model('');
  readonly filterState = model<FilterState>(DEFAULT_FILTER_STATE);

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue.set(value);
  }
}
