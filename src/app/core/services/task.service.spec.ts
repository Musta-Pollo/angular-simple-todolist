import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import type { Task } from '../models';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  const mockTask: Omit<Task, 'id' | 'dateCreated'> = {
    title: 'Test Task',
    completed: false,
    priority: 'medium',
    deadline: new Date().toISOString(),
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('createTask', () => {
    it('should create a task with auto-generated id and dateCreated', async () => {
      service.createTask(mockTask);

      const tasks = await firstValueFrom(service.watchTasks());

      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Test Task');
      expect(tasks[0].id).toBeDefined();
      expect(tasks[0].dateCreated).toBeDefined();
    });

    it('should persist task to localStorage', () => {
      service.createTask(mockTask);

      const stored = localStorage.getItem('tasks');
      expect(stored).not.toBeNull();

      const tasks = JSON.parse(stored!) as Task[];
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Test Task');
    });
  });

  describe('editTask', () => {
    it('should update an existing task', async () => {
      service.createTask(mockTask);
      let tasks = await firstValueFrom(service.watchTasks());
      const createdTask = tasks[0];

      const updatedTask: Task = { ...createdTask, title: 'Updated Task' };
      service.editTask(updatedTask);

      tasks = await firstValueFrom(service.watchTasks());
      expect(tasks[0].title).toBe('Updated Task');
    });

    it('should not modify tasks if id does not exist', async () => {
      service.createTask(mockTask);

      const nonExistentTask: Task = {
        id: 'non-existent-id',
        title: 'Non-existent',
        completed: false,
        priority: 'low',
        dateCreated: new Date().toISOString(),
      };
      service.editTask(nonExistentTask);

      const tasks = await firstValueFrom(service.watchTasks());
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Test Task');
    });
  });

  describe('deleteTask', () => {
    it('should remove a task by id', async () => {
      service.createTask(mockTask);
      let tasks = await firstValueFrom(service.watchTasks());
      const taskId = tasks[0].id;

      service.deleteTask(taskId);

      tasks = await firstValueFrom(service.watchTasks());
      expect(tasks.length).toBe(0);
    });

    it('should persist deletion to localStorage', async () => {
      service.createTask(mockTask);
      const tasks = await firstValueFrom(service.watchTasks());

      service.deleteTask(tasks[0].id);

      const stored = localStorage.getItem('tasks');
      const storedTasks = JSON.parse(stored!) as Task[];
      expect(storedTasks.length).toBe(0);
    });
  });

  describe('watchTasks - view filters', () => {
    beforeEach(async () => {
      const today = new Date();
      today.setHours(12, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      service.createTask({ title: 'Today Task', completed: false, priority: 'high', deadline: today.toISOString() });
      service.createTask({ title: 'Tomorrow Task', completed: false, priority: 'medium', deadline: tomorrow.toISOString() });
      service.createTask({ title: 'Next Week Task', completed: false, priority: 'low', deadline: nextWeek.toISOString() });
      service.createTask({ title: 'Completed Task', completed: true, priority: 'none' });
      service.createTask({ title: 'No Deadline Task', completed: false, priority: 'medium' });
    });

    it('should return all tasks when view is "all"', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ view: 'all' }));
      expect(tasks.length).toBe(5);
    });

    it('should return only today tasks when view is "today"', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ view: 'today' }));
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Today Task');
    });

    it('should return only upcoming tasks when view is "upcoming"', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ view: 'upcoming' }));
      expect(tasks.length).toBe(2);
      expect(tasks.map((t) => t.title)).toContain('Tomorrow Task');
      expect(tasks.map((t) => t.title)).toContain('Next Week Task');
    });

    it('should return only completed tasks when view is "completed"', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ view: 'completed' }));
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Completed Task');
    });
  });

  describe('watchTasks - priority filter', () => {
    beforeEach(() => {
      service.createTask({ title: 'High Priority', completed: false, priority: 'high' });
      service.createTask({ title: 'Medium Priority', completed: false, priority: 'medium' });
      service.createTask({ title: 'Low Priority', completed: false, priority: 'low' });
      service.createTask({ title: 'No Priority', completed: false, priority: 'none' });
    });

    it('should filter by priority', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ priority: 'high' }));
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('High Priority');
    });

    it('should return all tasks when priority is undefined', async () => {
      const tasks = await firstValueFrom(service.watchTasks({}));
      expect(tasks.length).toBe(4);
    });
  });

  describe('watchTasks - search query', () => {
    beforeEach(() => {
      service.createTask({ title: 'Buy groceries', completed: false, priority: 'high' });
      service.createTask({ title: 'Write code', completed: false, priority: 'medium' });
      service.createTask({ title: 'Buy clothes', completed: false, priority: 'low' });
    });

    it('should filter by search query (case-insensitive)', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ searchQuery: 'buy' }));
      expect(tasks.length).toBe(2);
    });

    it('should return no tasks when search query does not match', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ searchQuery: 'xyz' }));
      expect(tasks.length).toBe(0);
    });
  });

  describe('watchTasks - sorting', () => {
    beforeEach(() => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');
      const date3 = new Date('2024-01-03');

      service.createTask({ title: 'Zebra', completed: false, priority: 'low', deadline: date3.toISOString() });
      service.createTask({ title: 'Apple', completed: false, priority: 'high', deadline: date1.toISOString() });
      service.createTask({ title: 'Mango', completed: false, priority: 'medium', deadline: date2.toISOString() });
    });

    it('should sort alphabetically ascending', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ sortBy: 'alphabetical', ascending: true }));
      expect(tasks[0].title).toBe('Apple');
      expect(tasks[1].title).toBe('Mango');
      expect(tasks[2].title).toBe('Zebra');
    });

    it('should sort alphabetically descending', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ sortBy: 'alphabetical', ascending: false }));
      expect(tasks[0].title).toBe('Zebra');
      expect(tasks[1].title).toBe('Mango');
      expect(tasks[2].title).toBe('Apple');
    });

    it('should sort by priority descending (high first)', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ sortBy: 'priority', ascending: false }));
      expect(tasks[0].priority).toBe('high');
      expect(tasks[1].priority).toBe('medium');
      expect(tasks[2].priority).toBe('low');
    });

    it('should sort by deadline ascending', async () => {
      const tasks = await firstValueFrom(service.watchTasks({ sortBy: 'deadline', ascending: true }));
      expect(tasks[0].title).toBe('Apple');
      expect(tasks[2].title).toBe('Zebra');
    });
  });

  describe('localStorage persistence', () => {
    it('should load tasks from localStorage on initialization', () => {
      const storedTasks: Task[] = [
        {
          id: 'stored-1',
          title: 'Stored Task',
          completed: false,
          priority: 'high',
          dateCreated: new Date().toISOString(),
        },
      ];
      localStorage.setItem('tasks', JSON.stringify(storedTasks));

      const newService = TestBed.inject(TaskService);
      newService['load']();

      firstValueFrom(newService.watchTasks()).then((tasks) => {
        expect(tasks.length).toBe(1);
        expect(tasks[0].title).toBe('Stored Task');
      });
    });

    it('should handle invalid JSON in localStorage gracefully', () => {
      localStorage.setItem('tasks', 'invalid-json');

      const newService = TestBed.inject(TaskService);
      newService['load']();

      firstValueFrom(newService.watchTasks()).then((tasks) => {
        expect(tasks.length).toBe(0);
      });
    });
  });
});
