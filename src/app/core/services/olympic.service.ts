import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Observable, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

/**
 * Contains methods to get data
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService implements OnDestroy {

  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  public subscription!: Subscription;

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
   * @return nothing if data not yet loaded
   * @returns Observable<Olympic>
   * @error if Olympic not found 
   */
  public getOlympicByCountryName(countryName: string): Observable<Olympic> {

    let olympicByName$ = new BehaviorSubject<Olympic>(new Olympic());

    this.subscription = this.olympics$.subscribe(
      olympics => {
        if (olympics.length == 0) {
          // Initial data has not been loaded yet
          return;
        }
        let found: boolean = false;
        for (let olympic of olympics) {
          if (olympic.country === countryName) {
            olympicByName$.next(olympic)
            found = true;
          }
        }
        if (!found) {
          olympicByName$.error(new Error('Country not found'));
        }
      }
    )    
    return olympicByName$.asObservable(); 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
