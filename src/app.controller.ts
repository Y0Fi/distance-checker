import {Controller, Get, Post, Body, Request} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getAllCoordinates(){
       return this.appService.getCoordinates();
    }


    @Post()
    checkAnagrams(@Body() body, @Request() req): string {
        return this.appService.isAnagram(body.word1, body.word2);
    }

}
