import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateVhsDto } from './dto/create-vhs.dto';
import { UpdateVhsDto } from './dto/update-vhs.dto';
import { VhsRepository } from './vhs.repository';
import { Vhs } from './entities/vhs.entity';
import { GetVhsFilterDto } from './dto/get-vhs-filter.dto';

@Injectable()
export class VhsService {
  constructor(
    @InjectRepository(VhsRepository)
    private vhsRepository: VhsRepository,
  ) {}

  getAllVhs(vhsFilterDto: GetVhsFilterDto): Promise<Vhs[]> {
    return this.vhsRepository.getAllVhs(vhsFilterDto);
  }

  async getVhsById(id: number): Promise<Vhs> {
    const vhs = await this.vhsRepository.findOne(id);

    if (!vhs) {
      throw new NotFoundException(`VHS with ID ${id} not found.`);
    }

    return vhs;
  }

  createVhs(
    thumbnail: Express.Multer.File,
    createVhsDto: CreateVhsDto,
  ): Promise<Vhs> {
    return this.vhsRepository.createVhs(createVhsDto, thumbnail);
  }

  async updateVhs(
    id: number,
    updateVhsDto: UpdateVhsDto,
    thumbnail: Express.Multer.File,
  ): Promise<Vhs> {
    const vhs = await this.getVhsById(id);

    if (!vhs) {
      throw new NotFoundException(`The specified VHS does not exist.`);
    }

    return this.vhsRepository.updateVhs(vhs, updateVhsDto, thumbnail);
  }

  async deleteVhs(id: number): Promise<void> {
    const result = await this.vhsRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`VHS with ID ${id} not found.`);
    }
  }
}
