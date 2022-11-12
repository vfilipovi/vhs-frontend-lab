import { EntityRepository, Repository } from 'typeorm';

import { Vhs } from './entities/vhs.entity';
import { CreateVhsDto } from './dto/create-vhs.dto';
import { UpdateVhsDto } from './dto/update-vhs.dto';
import { GetVhsFilterDto } from './dto/get-vhs-filter.dto';

@EntityRepository(Vhs)
export class VhsRepository extends Repository<Vhs> {
  async getAllVhs(vhsFilterDto: GetVhsFilterDto): Promise<Vhs[]> {
    const { genre, isAvailable } = vhsFilterDto;
    const query = this.createQueryBuilder('vhs');

    if (genre) {
      query.andWhere('vhs.genre = :genre', { genre });
    }

    if (isAvailable === true) {
      query.andWhere('vhs.quantity > 0');
    } else if (isAvailable === false) {
      query.andWhere('vhs.quantity = 0');
    }

    const allVhs = await query.getMany();
    return allVhs;
  }

  async createVhs(createVhsDto: CreateVhsDto): Promise<Vhs> {
    const {
      title,
      description,
      genre,
      duration,
      releasedAt,
      rentalPrice,
      rentalDuration,
    } = createVhsDto;

    const vhs = new Vhs();

    vhs.title = title;
    vhs.description = description;
    vhs.genre = genre;
    vhs.duration = duration;
    vhs.releasedAt = releasedAt;
    vhs.rentalPrice = rentalPrice;
    vhs.rentalDuration = rentalDuration;
    vhs.quantity = 1;

    await vhs.save();
    return vhs;
  }

  async updateVhs(vhs: Vhs, updateVhsDto: UpdateVhsDto): Promise<Vhs> {
    const {
      title,
      description,
      genre,
      duration,
      releasedAt,
      rentalPrice,
      rentalDuration,
      quantity,
    } = updateVhsDto;

    if (title) vhs.title = title;
    if (description) vhs.description = description;
    if (genre) vhs.genre = genre;
    if (duration) vhs.duration = duration;
    if (releasedAt) vhs.releasedAt = releasedAt;
    if (rentalPrice) vhs.rentalPrice = rentalPrice;
    if (rentalDuration) vhs.rentalDuration = rentalDuration;
    if (quantity) vhs.quantity = quantity;

    await vhs.save();
    return vhs;
  }
}
