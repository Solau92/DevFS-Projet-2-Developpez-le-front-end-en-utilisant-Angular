import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, filter, catchError } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

/**
 * Contains methods to get data
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {
  }

  /**
   * Loads initial data from data source
   * @returns Observable<Olympic[]>
   * @error if error when getting data  
   */
  public loadInitialData(): Observable<Olympic[]> {

    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next(new Array<Olympic>);
        return caught;
      })
    );
  }

  /**
   * Returns the data as Observable
   * @returns Observable<Olympic[]> (takes only the first Olympic if serveral Olympics represent the same country)
   */
  public getOlympics(): Observable<Olympic[]> {

    return this.olympics$.asObservable().pipe(
      map(olympics => {
        return olympics.filter((item, index) => olympics.findIndex(o => o.country === item.country) === index);
      })
    );
    
  }

  /**
   * Returns the Olympic as Observable, given the countryName
   * @param countryName: string
   * @returns Observable<Olympic>
   * @error if Olympic not found 
   */
  public getOlympicByCountryName(countryName: string): Observable<Olympic> {

    return this.olympics$.pipe(
      filter(olympics => olympics.length > 0),
      map(olympics => {
        let olympic = olympics.find(olympic => olympic.country === countryName)

        if(olympic === undefined) {
          throw new Error("Country not found");
        }
        
        return olympic;        
      }
    ));

  }

}
