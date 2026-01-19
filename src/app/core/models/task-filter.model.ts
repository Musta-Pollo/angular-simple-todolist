import type { TaskPriority } from './task.model';

export type ViewType = 'all' | 'today' | 'upcoming' | 'completed';

export type SortBy = 'dateCreated' | 'priority' | 'deadline' | 'alphabetical';

export interface TasksFilter {
  view?: ViewType;
  priority?: TaskPriority;
  sortBy?: SortBy;
  ascending?: boolean;
  searchQuery?: string;
}
