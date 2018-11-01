var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var LogAppInsights = (function () {
    function LogAppInsights() {
    }
    LogAppInsights.prototype.LogAppInsights = function () {
        window.appInsights.downloadAndSetup({ instrumentationKey: "ed61c982-fa7d-4f15-bfcc-9dbbfea0eb5c" });
    };
    LogAppInsights.prototype.logPageView = function (targettext) {
        window.appInsights.trackPageView(targettext);
        console.log('page view logged');
    };
    ;
    LogAppInsights.prototype.logCustomEvent = function (event) {
        window.appInsights.trackEvent(event);
    };
    ;
    LogAppInsights.prototype.logException = function (exception, handledAt, properties) {
        window.appInsights.trackException(exception, handledAt, properties);
        console.log('exception logged');
    };
    ;
    LogAppInsights.prototype.logMetric = function (key, value) {
        window.appInsights.trackMetric(key, value);
        console.log('metric logged');
    };
    ;
    LogAppInsights.prototype.logTrace = function (message) {
        window.appInsights.trackTrace(message);
        console.log('trace logged');
    };
    ;
    LogAppInsights = __decorate([
        Injectable()
    ], LogAppInsights);
    return LogAppInsights;
}());
export { LogAppInsights };
//# sourceMappingURL=appinsights.service.js.map