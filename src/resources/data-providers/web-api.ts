import * as data from 'text!./data.json';
import { Employee } from '../models/employee'

export class WebAPI {
    jsonData;

    connect() {
        try {
            this.jsonData = JSON.parse(data);
        } catch (ex) {
            console.log(ex);
        }
    }

    listEmployee() {
        return this.jsonData.map(x => { return new Employee(x.id, x.name, x.email,x.about)});
    }

    getEmployee(id: number) {
        let found = this.jsonData.filter(x => x.id == id)[0];
        return new Employee(found.id, found.name, found.email,found.about);
    }
}
