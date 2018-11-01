var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { LogAppInsights } from "./appinsights.service";
var ExceptionHandler = (function () {
    function ExceptionHandler(_logAppInsights) {
        this._logAppInsights = _logAppInsights;
    }
    ExceptionHandler.prototype.handleError = function (error) {
        this.errorMsg = "<div><h3>Error</h3></div>" +
            "<div>" +
            "<p id='dialogBody'>Sorry, an unexpected error occurred.</p>" +
            "<p>Please try again later or contact your IT support team and share the following reference id: </p>" +
            "<p>";
        var closingString = "</p></div>";
        var appinsights = window.appInsights;
        if (appinsights && appinsights.context && appinsights.context.operation && appinsights.context.operation.id) {
            var uuid = appinsights.context.operation.id;
            this.errorMsg += uuid + closingString;
            this._logAppInsights.logException(uuid, "", { "URL": window.location.href, "Message": error.message, "Detail": error.stack });
        }
        else {
            console.log("AppInsights logging is unavailable. Fallback to console");
            console.log(error);
        }
    };
    ExceptionHandler = __decorate([
        Component({
            selector: "app-error-message",
            template: "<div id=\"addDiv\"></div>"
        }),
        __metadata("design:paramtypes", [LogAppInsights])
    ], ExceptionHandler);
    return ExceptionHandler;
}());
export { ExceptionHandler };
//# sourceMappingURL=errorhandler.service.js.map