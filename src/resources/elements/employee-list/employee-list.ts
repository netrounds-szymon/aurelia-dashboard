import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../data-providers/web-api';
import { EmployeeListSelected } from './employee-list-messages';
import { Employee } from '../../models/employee';

@inject(WebAPI, EventAggregator)
export class EmployeeList {
    title = "Select employee of the month";
    employees;
    selectedId = 0;

    constructor(private api: WebAPI, private ea: EventAggregator) { }

    created() {
        this.api.connect()
        this.employees = this.api.listEmployee();
    }

    select(employee) {
        this.selectedId = employee.id;
        this.ea.publish(new EmployeeListSelected(employee));
        return true;
    }
}