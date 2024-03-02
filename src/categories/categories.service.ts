import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      throw new Error('Error while fetching categories');
    }
  }

  async getCategoryById(id: number): Promise<Category> {
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new BadRequestException('Invalid category ID');
    }
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      throw new Error(`Error while fetching category with ID ${id}`);
    }
  }

  async createCategory(categoryDto: CategoryDto): Promise<Category> {
    if (!categoryDto || !categoryDto.name) {
      throw new BadRequestException('Category name is required');
    }

    try {
      return await this.prisma.category.create({
        data: { name: categoryDto.name },
      });
    } catch (error) {
      throw new Error('Error while creating category');
    }
  }

  async updateCategory(id: number, categoryData: Category): Promise<Category> {
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new BadRequestException('Invalid category ID');
    }
    if (
      !categoryData ||
      typeof categoryData !== 'object' ||
      Object.keys(categoryData).length === 0
    ) {
      throw new BadRequestException('Invalid category data');
    }
    try {
      return await this.prisma.category.update({
        where: { id },
        data: categoryData,
      });
    } catch (error) {
      throw new Error(`Error while updating category with ID ${id}`);
    }
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new BadRequestException('Invalid category ID');
    }
    try {
      await this.getCategoryById(id);
      await this.prisma.category.delete({
        where: { id },
      });
      return { message: `Category with ID ${id} has been deleted` };
    } catch (error) {
      throw new Error(`Error while deleting category with ID ${id}`);
    }
  }
}
