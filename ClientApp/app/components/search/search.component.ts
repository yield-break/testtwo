import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service'
import { SignalRConnectionStatus, SearchQuery, SearchResult } from '../../signalR/interfaces';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    public query: string;
    public result: string;

    private sessionId: number;

    constructor(private searchService: SearchService) {
        this.sessionId = 1; 
    }

    ngOnInit() {
        let self = this;

        self.searchService
            .searchResult
            .subscribe(result => {
                self.result = `Received search result containing ${result.numberOfResults} results`;
            },
            error => { console.log(error); });
        
        self.searchService
            .start()
            .subscribe(status => {
                if (status === SignalRConnectionStatus.Connected) {
                    try {
                        self.searchService
                            .connect(self.sessionId);
                    } catch (error) {
                        console.log(error)
                    }
                }
                else if (status === SignalRConnectionStatus.Disconnected) {
                    try {
                        self.searchService
                            .disconnect(self.sessionId);
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
            error => { console.log(error); });
    }

    public search(): void {
        let query: SearchQuery = {
            sessionId: this.sessionId,
            query: this.query,
        }

        this.searchService
            .PostSearch(query)
            .subscribe(() => {
                // Nothing to do here.
                // Since is subscribed, caller will also receive the search result.
                console.log('search query sent...');
            },
            error => { console.log(error); });
    }

}