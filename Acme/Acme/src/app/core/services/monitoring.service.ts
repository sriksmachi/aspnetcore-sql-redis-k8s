import { Injectable } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, ResolveEnd, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { AppInsights } from 'applicationinsights-js';
import { environment } from '../../../environments/environment';
import * as StackTrace from 'stacktrace-js';

@Injectable()
export class MonitoringService {

    private routerSubscription: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    setup() {
        if (environment.appInsightsConfig && environment.appInsightsConfig.instrumentationKey) {
            AppInsights.downloadAndSetup(environment.appInsightsConfig);
        }

        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.logPageView(window.location.href, event.urlAfterRedirects);
            }
        });
    }

    setAuthenticatedUserId(userId: string): void {
        AppInsights.setAuthenticatedUserContext(userId);
    }

    private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
        let path = '';
        if (snapshot.routeConfig) {
            path += snapshot.routeConfig.path;
        }

        if (snapshot.firstChild) {
            return path + this.getRouteTemplate(snapshot.firstChild);
        }

        return path;
    }

    private AddGlobalProperties(properties?: { [key: string]: string }): { [key: string]: string } {
        if (!properties) {
            properties = {};
        }

        //add your custom properties such as app version

        return properties;
    }

    public logPageView(
        name: string,
        url?: string,
        properties?: { [key: string]: string },
        measurements?: { [key: string]: number },
        duration?: number) {

        AppInsights.trackPageView(name, url, this.AddGlobalProperties(properties), measurements, duration);
    }

    public logEvent(name: string, properties?: { [key: string]: string }, measurements?: { [key: string]: number }) {
        AppInsights.trackEvent(name, this.AddGlobalProperties(properties), measurements);
    }

    public logError(error: Error, properties?: { [key: string]: string }, measurements?: { [key: string]: number }) {
        try {
            let stackString = this.getStackTrace(error);
            properties = { "URL": window.location.href, "Message": error.message, "Detail": stackString }
            AppInsights.trackException(error, null, this.AddGlobalProperties(properties), measurements);
        } catch {
            console.log("AppInsights logging is unavailable. Fallback to console");
            console.log(error);
        }
    }

    public getStackTrace(error: Error) {
        var stackString;
        StackTrace.fromError(error, {
            filter: (stackframe) => {
                return /main/g.test(stackframe.fileName); // Allow stackframe only if coming from main.js
            }
        }).then(stackframes => {
            stackString = stackframes
                .map(function (sf) {
                    return sf.toString();

                }).join('\n');
        });
        return stackString;
    }
}