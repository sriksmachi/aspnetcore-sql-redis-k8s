import { Injectable, ErrorHandler, Injector  } from "@angular/core";
import { MonitoringService } from "../services/monitoring.service";
import { UUID } from 'angular2-uuid';

@Injectable()
export class ExceptionHandler extends ErrorHandler {

    constructor(private injector: Injector) {
        super();
    }

    handleError(error: any): void {
        const monitoringService = this.injector.get(MonitoringService);
        // handle client side exceptions here
        monitoringService.logError(error);
        super.handleError(error);
    }
}