import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = '';

    constructor() {

        // go get synchronously where the api server is located
        // without this response app cannot load so sync is opted
        var xmlhttp = new XMLHttpRequest();
        var method = 'GET';
        var url = 'api/home/';
        xmlhttp.open(method, url, false);
        var that = this;
        xmlhttp.onload = function () {
            if (xmlhttp.status === 200) {
                that.Server = JSON.parse(xmlhttp.responseText).apiserver;
                console.log('API Server URL: ' + that.Server);
            } else {
                throw new Error("Critical configuration missing!!")
            }
        };
        xmlhttp.send();
    }
}
