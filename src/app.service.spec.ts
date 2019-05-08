import {AppController} from './app.controller';
import {AppService} from './app.service';
import distancesSample from './shared-data/samples';

jest.mock('fs', () => ({
    readFileSync: ()=> 'name,lat,lng\r\n' +
        'Alex\'s Apartment,55.93560353,-4.5162731\r\n' +
        'Bob\'s Builders,53.42097355,-3.029441567\r\n' +
        'Claire\'s Crib,53.76611138,-2.602467267\r\n' +
        'John\'s Joint,53.72511597,-1.86034\r\n' +
        'Kathy\'s Kennels,53.7660972,-2.602481933',
}));

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(() => {
        appService = new AppService();
        appController = new AppController(appService);
    });

    describe('checkAnagrams', () => {
        it('should return true or false', () => {
            const anagrams = ['test1', 'test1', 'test1'];
            const notAnagrams = ['test1222', 'test1333', 'test11111'];

            expect(appService.isAnagram(notAnagrams)).toBeFalsy();
            expect(appService.isAnagram(anagrams)).toBeTruthy();
        });
    });

    describe('checkGetDistances', () => {
        it('should return array of distances', () => {

            expect(appService.getDistances()).toEqual(distancesSample);
        });
    });


});
