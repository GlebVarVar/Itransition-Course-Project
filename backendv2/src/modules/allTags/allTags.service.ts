import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Alltags, Comments } from "@/models";

@Injectable()
export class AllTagsService {
  constructor(
    @InjectModel(Alltags)
    private alltagsModel: typeof Alltags,
  ) {}

  

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


  // async findAll(): Promise<Alltags[]> {
  //   return this.alltagsModel.findAll();
  // }

  async findAllTags() {
    return this.alltagsModel.findAll()
  }

  async createNewTag() {

  }

  createPostTag() {

  }
}
