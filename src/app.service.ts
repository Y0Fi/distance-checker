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
                return {name, latitude, longitude};
            });
    }
}
