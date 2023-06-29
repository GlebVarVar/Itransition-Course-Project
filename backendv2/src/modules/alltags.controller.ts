import { Controller, Get } from '@nestjs/common';
import { AllTagsService } from './alltags.service';

@Controller()
export class AlltagsController {
  constructor(private readonly allTagsService: AllTagsService) {}

  @Get("/test")
  findAll() {
    return this.allTagsService.findOne('1');
  }
}
