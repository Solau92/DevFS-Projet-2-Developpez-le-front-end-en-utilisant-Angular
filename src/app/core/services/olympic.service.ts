import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  // Remplacé : 
  //private olympics$ = new BehaviorSubject<any>(undefined);
  private olympics$ = new Subject<Olympic[]>()

  constructor(private http: HttpClient) {
  }

  public loadInitialData(): Observable<Olympic[]> {
    // Remplacé : 
    // return this.http.get<any>(this.olympicUrl).pipe(
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        // Ne fonctionne plus avec les modifications du code, à voir : 
        // this.olympics$.next(null);
        return caught;
      })
    );
  }


  public getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

/* public getCountriesAndMedalls(): Olympic[]  {

    console.log("InGetCountriesAndMedalls");

    const countries: Olympic[]=[];
    this.olympics$.subscribe(value => countries.concat(value));
    // this.olympics$.subscribe(value => console.log(value));

    console.log("After subscribe, countries : ");
    console.log(countries);

    return countries; */
  }


