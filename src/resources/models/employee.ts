export class Employee {
    id: number;
    name: string;
    email: string;
    about: string;

    constructor(id: number, name: string, email: string, about: string) {
        this.id = id;
        this.name = name;
        this.about = about;
        this.email = email;
    }
}