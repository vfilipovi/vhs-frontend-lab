import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ValidationPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { VhsService } from './vhs.service';
import { CreateVhsDto } from './dto/create-vhs.dto';
import { UpdateVhsDto } from './dto/update-vhs.dto';
import { Vhs } from './entities/vhs.entity';
import { GetVhsFilterDto } from './dto/get-vhs-filter.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/entities/user.role.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('vhs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VhsController {
  constructor(private readonly vhsService: VhsService) {}

  /**
   * Gets all VHS entities.
   */
  @Get()
  @Roles(UserRole.ADMIN)
  getAllVhs(
    @Query(ValidationPipe) vhsFilterDto: GetVhsFilterDto,
  ): Promise<Vhs[]> {
    return this.vhsService.getAllVhs(vhsFilterDto);
  }

  /**
   * Gets the VHS with given id if it exists. If not, 404 is returned.
   */
  @Get(':id')
  @Roles(UserRole.ADMIN)
  getVhsById(@Param('id', ParseIntPipe) id: number): Promise<Vhs> {
    return this.vhsService.getVhsById(+id);
  }

  /**
   * Creates a new VHS entity in the database.
   */
  @Post()
  @Roles(UserRole.ADMIN)
  createVhs(@Body() createVhsDto: CreateVhsDto): Promise<Vhs> {
    return this.vhsService.createVhs(createVhsDto);
  }

  /**
   * Updates specified VHS's data if it exists.
   */
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  updateVhs(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVhsDto: UpdateVhsDto,
  ): Promise<Vhs> {
    return this.vhsService.updateVhs(+id, updateVhsDto);
  }

  /**
   * Deletes the VHS with specified id if it exists.
   */
  @Delete(':id')
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  deleteVhs(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.vhsService.deleteVhs(+id);
  }
}
