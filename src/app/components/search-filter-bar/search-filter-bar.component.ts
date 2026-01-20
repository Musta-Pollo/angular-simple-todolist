import { Component, computed, input, model } from '@angular/core';

import { FilterDropdownComponent, type FilterState } from '@/components/filter-dropdown';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardInputDirective } from '@/shared/components/input';

import type { TaskPriority, ViewType } from '@/core/models';

const DEFAULT_FILTER_STATE: FilterState = {
  priority: 'all',
  sortBy: 'dateCreated',
  descending: true,
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  none: 'None',
};

const VIEW_CHIPS: Partial<Record<ViewType, { label: string; icon: 'calendar' | 'clock' | 'circle-check' }>> = {
  today: { label: 'Due today', icon: 'calendar' },
  upcoming: { label: 'Upcoming', icon: 'clock' },
  completed: { label: 'Completed', icon: 'circle-check' },
};

@Component({
  selector: 'app-search-filter-bar',
  standalone: true,
  imports: [ZardIconComponent, ZardInputDirective, FilterDropdownComponent, ZardBadgeComponent],
  template: `
    <div class="flex flex-col gap-2">
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

      <!-- Active Filter Chips -->
      @if (activePriority() || activeViewChip()) {
        <div class="flex flex-wrap gap-2 pt-1">
          @if (activeViewChip(); as chip) {
            <z-badge
              zType="secondary"
              zShape="pill"
              class="gap-2 pl-3 pr-2 py-1.5 cursor-pointer hover:bg-secondary/80"
              (click)="clearViewFilter()"
            >
              <z-icon [zType]="chip.icon" class="h-4 w-4" />
              <span>{{ chip.label }}</span>
              <z-icon zType="x" class="h-4 w-4 hover:text-destructive" />
            </z-badge>
          }
          @if (activePriority()) {
            <z-badge
              zType="secondary"
              zShape="pill"
              class="gap-2 pl-3 pr-2 py-1.5 cursor-pointer hover:bg-secondary/80"
              (click)="clearPriorityFilter()"
            >
              <z-icon zType="layers" class="h-4 w-4" />
              <span>{{ priorityLabel() }} priority</span>
              <z-icon zType="x" class="h-4 w-4 hover:text-destructive" />
            </z-badge>
          }
        </div>
      }
    </div>
  `,
})
export class SearchFilterBarComponent {
  readonly placeholder = input('Search tasks...');

  readonly searchValue = model('');
  readonly filterState = model<FilterState>(DEFAULT_FILTER_STATE);
  readonly view = model<ViewType>('all');

  readonly activePriority = computed(() => {
    const priority = this.filterState().priority;
    return priority !== 'all' ? priority : null;
  });

  readonly priorityLabel = computed(() => {
    const priority = this.activePriority();
    return priority ? PRIORITY_LABELS[priority as TaskPriority] : '';
  });

  readonly activeViewChip = computed(() => {
    const v = this.view();
    return VIEW_CHIPS[v] ?? null;
  });

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue.set(value);
  }

  clearPriorityFilter() {
    this.filterState.update((state) => ({ ...state, priority: 'all' }));
  }

  clearViewFilter() {
    this.view.set('all');
  }
}
