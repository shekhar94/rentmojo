import { Injectable, NgModule } from '@angular/core';
import { Headers, Http } from '@angular/http';

@NgModule({
    imports: []
})
@Injectable()
export class CommentDataService {
    baseUrl = 'http://localhost:3000';
    constructor(private _http: Http) { }
    private setHeaders(): Headers {
        const headersConfig = {
            'Content-Type': 'application/json'
        };
        return new Headers(headersConfig);
    }

    saveComments(comments, usrid = 'default') {
        const url = `${this.baseUrl}/saveComments`;
        const options = { headers: this.setHeaders() };
        return this._http.post(url, { comments, usrid }, options);
    }

}
