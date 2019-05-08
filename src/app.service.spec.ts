import {AppController} from './app.controller';
import {AppService} from './app.service';
import distancesSample from './shared-data/samples';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(() => {
        appService = new AppService();
        appController = new AppController(appService);
    });

    describe('checkAnagrams', () => {
        it('should return true or false',  () => {
            const anagrams = ['test1', 'test1', 'test1'];
            const notAnagrams = ['test1222', 'test1333', 'test11111'];

            expect(appService.isAnagram(notAnagrams)).toBeFalsy();
            expect(appService.isAnagram(anagrams)).toBeTruthy();
        });
    });

    describe('checkGetDistances', () => {
        it('should return array of distances',  () => {

            expect(appService.getDistances()).toEqual(distancesSample);
        });
    });


});
