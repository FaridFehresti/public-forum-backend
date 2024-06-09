// src/tasks/dto/create-task.dto.ts
import { IsString, IsBoolean, IsOptional, IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  completed: boolean;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  color: string;

  @IsInt()
  categoryId: number;

  @IsArray()
  @IsOptional()
  subtasks?: CreateTaskDto[];
}
