import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.categoriesService.getAllCategories();
  }

  @ApiOperation({ summary: 'Get category' })
  @Get(':id')
  getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoriesService.getCategoryById(id);
  }

  @ApiOperation({ summary: 'Create category' })
  @Post()
  createCategory(@Body() categoryData: Category): Promise<Category> {
    return this.categoriesService.createCategory(categoryData);
  }

  @ApiOperation({ summary: 'Change category' })
  @Patch(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryData: Category,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, categoryData);
  }

  @ApiOperation({ summary: 'Delete category' })
  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.categoriesService.deleteCategory(id);
    return { message: `Category with ID ${id} has been deleted` };
  }
}
