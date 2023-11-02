import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { map } from 'rxjs';

@Component({
  selector: 'country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor( private activatedRoute: ActivatedRoute,
               private countriesService: CountriesService,
               private router : Router ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({id}) => {
        this.search(id);
      });
  }

  private search(term: string) {
    this.countriesService.search(term,'alpha')
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : undefined )
    )
    .subscribe( country => {
      this.country = country;
      this.checkResponse( );
    });
  }

  private checkResponse()
  {
    if(this.country === undefined ) return this.router.navigateByUrl('');
    console.log('TENEMOS UN PAIS');
    return;
  }

}
