import { AppService } from './app.service';
import { Department } from './users/schemas/user.schema';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getDepartments(): {
        label: string;
        value: Department;
    }[];
}
