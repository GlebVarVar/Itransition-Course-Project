import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Alltags } from '../models/alltags.model';

@Injectable()
export class AllTagsService {
  constructor(
    @InjectModel(Alltags)
    private alltagsModel: typeof Alltags,
  ) {}

  async findAll(): Promise<Alltags[]> {
    return this.alltagsModel.findAll();
  }

  findOne(id: string): Promise<Alltags> {
    return this.alltagsModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const tag = await this.findOne(id);
    await tag.destroy();
  }
}
