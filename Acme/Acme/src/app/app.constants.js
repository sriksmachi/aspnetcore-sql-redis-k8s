var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var Configuration = (function () {
    function Configuration(http) {
        var _this = this;
        this.http = http;
        this.Server = 'http://localhost:4424/';
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
        this.http.get("/api/home/")
            .subscribe(function (data) {
            _this.Server = data.apiserver;
            console.log('Configuration: ' + JSON.stringify(data));
        });
    }
    Configuration = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], Configuration);
    return Configuration;
}());
export { Configuration };
//# sourceMappingURL=app.constants.js.map