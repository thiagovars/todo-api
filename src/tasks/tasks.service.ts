import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, EditTaskDto } from './dto/useCases-task.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public findAll(): Task[] {
    return this.tasks;
  }

  public create(tasksDto: Task): Task[] {
    tasksDto = { id: uuidv4(), ...tasksDto };
    this.tasks.push(tasksDto);
    return this.tasks;
  }

  public edit(id: string, updatedTask: EditTaskDto): Task[] {
    const findedTask = this.find(id);
    this.tasks[findedTask.index] = { id: findedTask.task.id, ...updatedTask };
    return this.tasks;
  }

  public delete(id: string): Task[] {
    const findedTask = this.find(id);
    this.tasks.splice(findedTask.index, 1);
    return this.tasks;
  }

  public complete(id: string): Task[] {
    const findedTask = this.find(id);
    this.toggleComplete(findedTask.index);
    this.tasks[findedTask.index] = findedTask.task;
    return this.tasks;
  }

  private find(id: string): { task: Task; index: number } {
    const index = this.tasks.findIndex((tsk) => tsk.id === id);
    const task = this.tasks[index];
    if (!task) {
      throw new NotFoundException(`Não foi possível encontrar a task "${id}"`);
    }

    return { task, index };
  }

  private toggleComplete(index: number): void {
    const toggle = this.tasks[index].isCompleted === true ? false : true;
    this.tasks[index].isCompleted = toggle;
  }
}
