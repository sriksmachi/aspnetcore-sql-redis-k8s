import { Component, ViewEncapsulation } from '@angular/core';
import { Configuration } from './app.constants';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MonitoringService } from './core/services/monitoring.service';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
    constructor(private configuration: Configuration, public router: Router, public monitoringService: MonitoringService) {
        this.monitoringService.setup();
    }
}


