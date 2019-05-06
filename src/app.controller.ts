import {Controller, Get, Post, Body, Response,} from '@nestjs/common';
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
    checkAnagrams(@Body() body, @Response() res): string {
        const result = this.appService.isAnagram(body.words);
        return res.status(result? 200 : 420).send(result ? 'All words are anagrams' : 'Not all words are anagrams');
    }
}
