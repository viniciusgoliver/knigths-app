import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { KnightsService } from './knight.service';
import { CreateKnightDTO } from './dtos/create.dto';
import { Knight } from './schema/knigth.schema';

@Controller('/knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Post()
  async create(@Body() createKnightDto: CreateKnightDTO): Promise<Knight> {
    try {
      return await this.knightsService.create(createKnightDto);
    } catch (error) {
      throw new NotFoundException('Failed to create knight');
    }
  }

  @Get()
  async findAll(): Promise<string> {
    const knights = await this.knightsService.findAll();
    return JSON.stringify(knights);
  }

  @Get('/heroes')
  async findHeroes() {
    try {
      return this.knightsService.findHeroes();
    } catch (error) {
      throw new NotFoundException('Heroes not found');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Knight> {
    try {
      return await this.knightsService.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Knight with ID ${id} not found`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateKnightDto: CreateKnightDTO,
  ): Promise<Knight> {
    try {
      return await this.knightsService.update(id, updateKnightDto);
    } catch (error) {
      throw new NotFoundException(`Knight with ID ${id} not found`);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.knightsService.delete(id);
    } catch (error) {
      throw new NotFoundException(`Knight with ID ${id} not found`);
    }
  }
}
