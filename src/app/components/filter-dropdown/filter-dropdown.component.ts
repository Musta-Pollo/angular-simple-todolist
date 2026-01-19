import { Component, input, output, signal } from '@angular/core';

import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardIconComponent, type ZardIcon } from '@/shared/components/icon';
import { ZardMenuLabelComponent } from '@/shared/components/menu';

export type Priority = 'all' | 'high' | 'medium' | 'low';
export type SortBy = 'date-created' | 'priority' | 'deadline' | 'alphabetical';

export interface FilterState {
  priority: Priority;
  sortBy: SortBy;
  descending: boolean;
}

interface PriorityOption {
  value: Priority;
  label: string;
  dotColor: string;
}

interface SortOption {
  value: SortBy;
  label: string;
  icon: ZardIcon;
}

@Component({
  selector: 'app-filter-dropdown',
  standalone: true,
  imports: [
    ZardButtonComponent,
    ZardBadgeComponent,
    ZardIconComponent,
    ZardDividerComponent,
    ZardMenuLabelComponent,
    ...ZardDropdownImports,
  ],
  template: `
    <z-dropdown-menu class="w-56">
      <button dropdown-trigger z-button zType="outline" zSize="sm" class="gap-2">
        <z-icon zType="list-filter-plus" class="h-4 w-4" />
        Filter
        <z-icon zType="chevron-down" class="h-4 w-4" />
      </button>

      <!-- Priority Section -->
      <div class="p-3">
        <z-menu-label class="text-xs uppercase tracking-wide mb-2 px-0">Priority</z-menu-label>
        <div class="flex flex-wrap gap-2">
          @for (p of priorities; track p.value) {
            <z-badge
              [zType]="state().priority === p.value ? 'default' : 'outline'"
              zShape="pill"
              class="cursor-pointer gap-1.5 px-3 py-1"
              (click)="selectPriority(p.value); $event.stopPropagation()"
            >
              @if (p.dotColor) {
                <span [class]="'w-2 h-2 rounded-full shrink-0 ' + p.dotColor"></span>
              }
              {{ p.label }}
            </z-badge>
          }
        </div>
      </div>

      <z-divider />

      <!-- Sort By Section -->
      <div class="p-3">
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
              <z-icon [zType]="s.icon" class="h-4 w-4 text-muted-foreground" />
              <span class="flex-1 text-left">{{ s.label }}</span>
              @if (state().sortBy === s.value) {
                <z-icon zType="check" class="h-4 w-4 text-primary" />
              }
            </button>
          }
        </div>
      </div>

      <z-divider />

      <!-- Descending Toggle -->
      <div class="p-3">
        <button
          type="button"
          z-button
          zType="ghost"
          zSize="sm"
          class="w-full justify-start gap-3 font-normal"
          (click)="toggleDescending(); $event.stopPropagation()"
        >
          <z-icon zType="chevron-down" class="h-4 w-4 text-muted-foreground" />
          <span class="flex-1 text-left">Descending</span>
          @if (state().descending) {
            <z-icon zType="check" class="h-4 w-4 text-primary" />
          }
        </button>
      </div>

      <z-divider />

      <!-- Reset Filters -->
      <div class="p-3">
        <button
          type="button"
          z-button
          zType="ghost"
          zSize="sm"
          class="w-full text-muted-foreground hover:text-foreground"
          (click)="resetFilters(); $event.stopPropagation()"
        >
          Reset Filters
        </button>
      </div>
    </z-dropdown-menu>
  `,
})
export class FilterDropdownComponent {
  readonly initialState = input<FilterState>({
    priority: 'all',
    sortBy: 'date-created',
    descending: true,
  });

  readonly filterChange = output<FilterState>();

  readonly state = signal<FilterState>({
    priority: 'all',
    sortBy: 'date-created',
    descending: true,
  });

  readonly priorities: PriorityOption[] = [
    { value: 'all', label: 'All', dotColor: '' },
    { value: 'high', label: 'High', dotColor: 'bg-red-500' },
    { value: 'medium', label: 'Medium', dotColor: 'bg-yellow-500' },
    { value: 'low', label: 'Low', dotColor: 'bg-blue-500' },
  ];

  readonly sortOptions: SortOption[] = [
    { value: 'date-created', label: 'Date Created', icon: 'calendar' },
    { value: 'priority', label: 'Priority', icon: 'layers' },
    { value: 'deadline', label: 'Deadline', icon: 'calendar' },
    { value: 'alphabetical', label: 'Alphabetical', icon: 'file-text' },
  ];

  selectPriority(priority: Priority) {
    this.state.update(s => ({ ...s, priority }));
    this.filterChange.emit(this.state());
  }

  selectSortBy(sortBy: SortBy) {
    this.state.update(s => ({ ...s, sortBy }));
    this.filterChange.emit(this.state());
  }

  toggleDescending() {
    this.state.update(s => ({ ...s, descending: !s.descending }));
    this.filterChange.emit(this.state());
  }

  resetFilters() {
    this.state.set({
      priority: 'all',
      sortBy: 'date-created',
      descending: true,
    });
    this.filterChange.emit(this.state());
  }
}
