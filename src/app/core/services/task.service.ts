import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import type { Task, TaskPriority, TasksFilter, SortBy } from '../models';

const STORAGE_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly tasks$ = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.load();
  }

  watchTasks(filter?: TasksFilter): Observable<Task[]> {
    return this.tasks$.pipe(map((tasks) => this.applyFilter(tasks, filter)));
  }

  createTask(task: Omit<Task, 'id' | 'dateCreated'>): void {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      dateCreated: new Date().toISOString(),
    };
    this.tasks$.next([...this.tasks$.getValue(), newTask]);
    this.save();
  }

  editTask(task: Task): void {
    const tasks = this.tasks$.getValue();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      this.tasks$.next([...tasks]);
      this.save();
    }
  }

  deleteTask(taskId: string): void {
    const tasks = this.tasks$.getValue().filter((t) => t.id !== taskId);
    this.tasks$.next(tasks);
    this.save();
  }

  private save(): void {
    const tasks = this.tasks$.getValue();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  private load(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const tasks = JSON.parse(stored) as Task[];
        this.tasks$.next(tasks);
      } catch {
        this.tasks$.next([]);
      }
    }
  }

  private applyFilter(tasks: Task[], filter?: TasksFilter): Task[] {
    if (!filter) return tasks;

    let filtered = [...tasks];

    // View filter
    if (filter.view) {
      filtered = this.filterByView(filtered, filter.view);
    }

    // Priority filter
    if (filter.priority) {
      filtered = filtered.filter((t) => t.priority === filter.priority);
    }

    // Search query filter
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      filtered = filtered.filter((t) => t.title.toLowerCase().includes(query));
    }

    // Sorting
    if (filter.sortBy) {
      filtered = this.sortTasks(filtered, filter.sortBy, filter.ascending ?? true);
    }

    return filtered;
  }

  private filterByView(tasks: Task[], view: TasksFilter['view']): Task[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    switch (view) {
      case 'today':
        return tasks.filter((t) => {
          if (!t.deadline) return false;
          const deadline = new Date(t.deadline);
          deadline.setHours(0, 0, 0, 0);
          return deadline.getTime() === today.getTime();
        });

      case 'upcoming':
        return tasks.filter((t) => {
          if (!t.deadline) return false;
          const deadline = new Date(t.deadline);
          deadline.setHours(0, 0, 0, 0);
          return deadline.getTime() >= tomorrow.getTime();
        });

      case 'completed':
        return tasks.filter((t) => t.completed);

      case 'all':
      default:
        return tasks;
    }
  }

  private sortTasks(tasks: Task[], sortBy: SortBy, ascending: boolean): Task[] {
    const priorityOrder: Record<TaskPriority, number> = {
      high: 0,
      medium: 1,
      low: 2,
      none: 3,
    };

    const sorted = [...tasks].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'dateCreated':
          comparison = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
          break;

        case 'priority':
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;

        case 'deadline':
          if (!a.deadline && !b.deadline) comparison = 0;
          else if (!a.deadline) comparison = 1;
          else if (!b.deadline) comparison = -1;
          else comparison = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
          break;

        case 'alphabetical':
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return ascending ? comparison : -comparison;
    });

    return sorted;
  }
}
