import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  // Remplacé : 
  //private olympics$ = new BehaviorSubject<any>(undefined);
  private olympics$ = new BehaviorSubject<Olympic[]>([])

  private olympicByName$ = new BehaviorSubject<Olympic>(new Olympic())

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

  public getOlympicByCountryName(countryName: string): Observable<Olympic> {

    /* let olympicForTest: Olympic = new Olympic();

    let participations: Participation[] = [];

    let participation1: Participation = new Participation();
    participation1.city = "PaysJO1";
    participation1.athleteCount = 100;
    participation1.medalsCount = 10;

    let participation2: Participation = new Participation();
    participation2.city = "PaysJO2";
    participation2.athleteCount = 200;
    participation2.medalsCount = 20;

    participations.push(participation1);
    participations.push(participation2);

    olympicForTest.country = "PaysTest";
    olympicForTest.id = 6;
    olympicForTest.participations = participations;

    console.log("olympicForTest$");
 */
    this.olympics$.subscribe(
      olympics => {
        for (let olympic of olympics) {
          if (olympic.country === countryName) {
            // setInterval( 
            //   () => {
            // olympic.participations[0].medalsCount++; 
                this.olympicByName$.next(olympic)
            //   },
            //   1000
            // )
          }
        }
      }
    )

    return this.olympicByName$.asObservable();

  }
}


