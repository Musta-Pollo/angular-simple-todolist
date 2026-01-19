import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-task-list-header',
  standalone: true,
  template: `
    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-foreground">{{ title() }}</h1>
      <p class="text-sm text-muted-foreground">{{ countLabel() }}</p>
    </div>
  `,
})
export class TaskListHeaderComponent {
  readonly title = input.required<string>();
  readonly count = input(0);

  protected readonly countLabel = computed(() => {
    const count = this.count();
    return count === 1 ? '1 task' : `${count} tasks`;
  });
}
