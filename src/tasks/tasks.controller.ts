import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, EditTaskDto } from './dto/useCases-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() CreateTaskDto: Task): Task[] {
    this.tasksService.create(CreateTaskDto);
    return this.findAll();
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() taskDto: EditTaskDto): Task[] {
    this.tasksService.edit(id, taskDto);
    return this.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): Task[] {
    this.tasksService.delete(id);
    return this.findAll();
  }

  @Post(':id')
  complete(@Param('id') id: string): Task[] {
    this.tasksService.complete(id);
    return this.findAll();
  }
}
