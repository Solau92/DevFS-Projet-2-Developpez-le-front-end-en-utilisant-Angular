import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

/**
 * Contains methods to get data
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([])
  private olympicByName$ = new BehaviorSubject<Olympic>(new Olympic())

  constructor(private http: HttpClient) {
  }

  /**
   * Loads initial data from data source
   * @returns Observable<Olympic[]>
   * @error TODO: 
   */
  public loadInitialData(): Observable<Olympic[]> {

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

  /**
   * Returns the data as Observable
   * @returns Observable<Olympic[]>
   * @error TODO:
   */
  public getOlympics(): Observable<Olympic[]> {

    // TODO: gérer erreurs ?
    return this.olympics$.asObservable();

  }

  /**
   * Returns the Olympic as Observable, given the countryName
   * @param countryName: string
   * @returns Observable<Olympic>
   * @error TODO:
   */
  public getOlympicByCountryName(countryName: string): Observable<Olympic> {

    // TODO: gérer erreurs ?
    this.olympics$.subscribe(
      olympics => {
        for (let olympic of olympics) {
          if (olympic.country === countryName) {
            this.olympicByName$.next(olympic)
          }
        }
      }
    )
    return this.olympicByName$.asObservable();
  }
}
