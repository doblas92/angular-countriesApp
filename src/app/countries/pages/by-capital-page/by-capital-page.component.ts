import { Country } from '../../interfaces/country';
import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'country-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = ''

  constructor( private countriesService: CountriesService ){}

  ngOnInit(): void {
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
    this.countries = this.countriesService.cacheStore.byCapital.countries;
  }

  search(term: string): void {
    this.isLoading = true;
    this.countriesService.search(term,'capital')
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
