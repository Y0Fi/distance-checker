import {Controller, Get, Post, Body} from '@nestjs/common';
import {AppService} from './app.service';
import {IDistances} from './shared-data/coordinate.interface';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getDistances(): IDistances[] {
        return this.appService.getDistances();
    }

    @Post()
    checkAnagrams(@Body() body): string {
        return this.appService.isAnagram(body.words);
    }
}
