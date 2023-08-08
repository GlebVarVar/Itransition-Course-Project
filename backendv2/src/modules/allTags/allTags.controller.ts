import { Controller, Get, Post } from "@nestjs/common";
import { AllTagsService } from "./allTags.service";

@Controller('tag')
export class AlltagsController {
  constructor(private readonly allTagsService: AllTagsService) {}

  @Get("alltags/")
  findAllTags() {
    return this.allTagsService.findAllTags();
  }

  @Post("alltags/create")
  createNewTag() {
    return this.allTagsService.createNewTag();
  }

  @Post("/")
  createPostTag() {
    return this.allTagsService.createPostTag();
  }

}
