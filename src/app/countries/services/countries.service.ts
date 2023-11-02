import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/chache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { countries: [] }
  }
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor( private http: HttpClient ) { }

  search( term: string, type: string ): Observable<Country[]>
  {
    const url: string = `${this.apiUrl}/${type}/${term}`;
    return this.http.get<Country[]>( url )
    .pipe(
      tap( countries => {

        switch(type) {
          case 'name': {
            this.cacheStore.byCountries = { term, countries };
            break;
          }
          case 'region': {
            this.cacheStore.byRegion = { region: <Region>term, countries };
            break;
          }
          case 'capital': {
            this.cacheStore.byCapital = { term, countries };
            break;
          }
        }
      }),
      catchError( () => of([]) )
    );
  }

}
