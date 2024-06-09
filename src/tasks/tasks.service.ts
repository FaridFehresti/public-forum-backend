// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        completed: createTaskDto.completed,
        description: createTaskDto.description,
        tags: createTaskDto.tags,
        color: createTaskDto.color,
        categoryId: createTaskDto.categoryId,
        userId: 1, // Replace with actual user ID
        subtasks: {
          create: createTaskDto.subtasks?.map(subtask => ({
            name: subtask.name,
            completed: subtask.completed,
            description: subtask.description,
            tags: subtask.tags,
            color: subtask.color,
            categoryId: subtask.categoryId,
            userId: 1, // Replace with actual user ID
          })) || [],
        },
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      include: { subtasks: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
      include: { subtasks: true },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        name: updateTaskDto.name,
        completed: updateTaskDto.completed,
        description: updateTaskDto.description,
        tags: updateTaskDto.tags,
        color: updateTaskDto.color,
        categoryId: updateTaskDto.categoryId,
        subtasks: {
          create: updateTaskDto.subtasks?.map(subtask => ({
            name: subtask.name,
            completed: subtask.completed,
            description: subtask.description,
            tags: subtask.tags,
            color: subtask.color,
            categoryId: subtask.categoryId,
            userId: 1, // Replace with actual user ID
          })) || [],
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
