import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../data-providers/web-api';
import { EmployeeListSelected } from '../employee-list/employee-list-messages';
import { Employee } from '../../models/employee';

@inject(WebAPI, EventAggregator)
export class EmployeeContainer {
    title = "Employee of the month";
    employee: Employee;

    constructor(private api: WebAPI, ea: EventAggregator) {
        api.connect();
        ea.subscribe(EmployeeListSelected, msg => {
            // let id = msg.employee.id;
            // this.employee = api.getEmployee(id);
            this.employee = msg.employee;
        });
    }
}