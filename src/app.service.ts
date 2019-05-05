import {Injectable} from '@nestjs/common';
import * as fs from "fs";
import * as path from 'path';


@Injectable()
export class AppService {


    getCoordinates() {
        const csvString = fs.readFileSync(path.resolve('./src/shared-data/location_list.csv'), 'UTF8')

        return csvString.split('\r\n')
            .splice(1)
            .map(item => {
                const [name, latitude, longitude] = item.split(',');

                let distance = this.calculateDistance(latitude, longitude);

                return {name, latitude, longitude, distance};
            });
    }

    calculateDistance(subLatitude, subLongitude) {
        const mainLatitude = 53.528769;
        const mainLongitude = -2.657577;
        const p = 0.017453292519943295;    // Math.PI / 180
        let a = 0.5 - Math.cos((subLatitude - mainLatitude) * p) / 2 + Math.cos(mainLatitude * p) * Math.cos(subLatitude * p) * (1 - Math.cos((subLongitude - mainLongitude) * p)) / 2;
        let distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
        return distance;
    }
}
