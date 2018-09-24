import { Component, ViewEncapsulation } from '@angular/core';
import { Configuration } from './app.constants';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
    constructor(private configuration: Configuration) { }
}
