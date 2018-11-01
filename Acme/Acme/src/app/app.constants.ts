import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { strictEqual } from 'assert';


@Injectable()
export class Configuration {
    public Server = 'http://localhost:4424/';
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');

        // go get where the api server is located
        this.http.get("/api/home/")
            .subscribe(data => {
                this.Server = (<any>data).apiserver;
                console.log('Configuration: ' + JSON.stringify(data));
            });
    }
}
