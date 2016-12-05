import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from "rxjs/Subject";
import { SearchSignalR, SearchProxy, SearchClient, SearchServer, SignalRConnectionStatus, SearchQuery, SearchResult } from '../../signalR/interfaces';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {
	
    private connectionStateSubject = new Subject<SignalRConnectionStatus>();
    private setConnectionIdSubject = new Subject<string>();
    private searchSubject = new Subject<SearchQuery>();
    private searchResultSubject = new Subject<SearchResult>();
    
    private server: SearchServer;

	constructor(private http: Http) {
        this.connectionState = this.connectionStateSubject.asObservable();
        this.setConnectionId = this.setConnectionIdSubject.asObservable();
        this.search = this.searchSubject.asObservable();
        this.searchResult = this.searchResultSubject.asObservable();
     }

    public currentState = SignalRConnectionStatus.Disconnected;
    public connectionState: Observable<SignalRConnectionStatus>;
    public setConnectionId: Observable<string>;
    public search: Observable<SearchQuery>;
    public searchResult: Observable<SearchResult>;

    public start(): Observable<SignalRConnectionStatus> {
  
        $.connection.hub.logging = true;

        let connection = <SearchSignalR>$.connection;
        let searchHub = connection.searchHub;
        this.server = searchHub.server;

        // Methods called by server.
        searchHub.client.setConnectId = id => this.onSetConnectionId(id);
        searchHub.client.search = query => this.onSearch(query);
        searchHub.client.searchResult = result => this.onSearchResult(result);

        // start the connection
        $.connection.hub.start()
            .done(response => this.setConnectionState(SignalRConnectionStatus.Connected))
            .fail(error => this.connectionStateSubject.error(error));
 
        // Start the connection.
        return this.connectionState;
    }

    public connect(sessionId: number): void {
        this.server.connect(sessionId);
    }

    public disconnect(sessionId: number): void {
        this.server.disconnect(sessionId);
    }

    public PostSearch(query: SearchQuery) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .post('/api/search/search', JSON.stringify(query), { headers: headers })
            .map((res: Response) => {
                return null;
            })
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    private setConnectionState(connectionState: SignalRConnectionStatus) {
        console.log('connection state changed to: ' + connectionState);
        this.currentState = connectionState;
        this.connectionStateSubject.next(connectionState);
    }

    private onSetConnectionId(id: string) {
        this.setConnectionIdSubject.next(id);
    }

    private onSearch(query: SearchQuery) {
        this.searchSubject.next(query);
    }

    private onSearchResult(result: SearchResult) {
        this.searchResultSubject.next(result);
    }

}
