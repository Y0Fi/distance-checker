import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {ICoordinates, IDistances} from './shared-data/coordinate.interface';

@Injectable()
export class AppService {

    private officeLatitude = 53.528769;
    private officeLongitude = -2.657577;
    private PI = Math.PI / 180;

    getDistances(): IDistances[] {
        return this.getCoordinates()
            .map(item => ({
                name: item.name,
                distance: this.calculateDistance(item.latitude, item.longitude),
            }))
            .sort((firstDistance, nextDistance) => {
                return firstDistance.distance - nextDistance.distance;
            });
    }

    private getCoordinates(): ICoordinates[] {
        const csvString = fs.readFileSync(path.resolve('./src/shared-data/location_list.csv'), 'UTF8');

        return csvString.split('\r\n')
            .splice(1)
            .map(item => {
                const [name, latitude, longitude] = item.split(',');
                return {name, latitude: Number(latitude), longitude: Number(longitude)};
            });
    }

    private calculateDistance(latitude: number, longitude: number): number {
        const haversineFormula = 0.5 - Math.cos((latitude - this.officeLatitude) * this.PI) / 2 +
            Math.cos(this.officeLatitude * this.PI) * Math.cos(latitude * this.PI) *
            (1 - Math.cos((longitude - this.officeLongitude) * this.PI)) / 2;

        return 12742000 * Math.asin(Math.sqrt(haversineFormula)); // count in metres
    }

    isAnagram(words: string[]): boolean {
        return words.every((item, index, array) => index === 0 || this.reformatWord(item) === this.reformatWord(array[index - 1]));
    }

    private reformatWord(str) {
        return str.toLowerCase().replace(/[^a-z\d]/g, '').split('').sort().join('');
    }
}
