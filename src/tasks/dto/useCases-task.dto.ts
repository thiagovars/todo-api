import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface Task {
  id: string;
  name: string;
  description?: string;
  isCompleted: boolean;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean = false;
}

export class EditTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}
