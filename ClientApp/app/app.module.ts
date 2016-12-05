import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalculatorService } from './components/calculator/calculator.service';
import { HeroListComponent } from './components/heroes/heroList.component';
import { HeroDetailComponent } from './components/heroes/heroDetail.component';
import { HeroesService } from './components/heroes/heroes.service';
import { SearchComponent } from './components/search/search.component';
import { SearchService } from './components/search/search.service';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        CalculatorComponent,
        HeroListComponent,
        HeroDetailComponent,
        SearchComponent,
        HomeComponent
    ],
	providers: [
		CalculatorService,
        HeroesService,
        SearchService
	],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'calculator', component: CalculatorComponent },
            { path: 'heroes', component: HeroListComponent },
            { path: 'search', component: SearchComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
