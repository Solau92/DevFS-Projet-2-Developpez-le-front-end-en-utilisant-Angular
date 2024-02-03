import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';

/**
 * HomeComponent, corresponding to home page of the app
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardChartComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  // Data
  public olympics$: Observable<Olympic[]> = of([]);
  public results!: { name: string; value: number; }[];

  //////// Ajout pour unsubscribe
  public subscription!: Subscription;

  public numberOfJOs: number = 0;
  public numberOfCountries: number = 0;

  constructor(private olympicService: OlympicService) {
  }

  /**
   * Gets data that must be displayed on the page 
   */
  public ngOnInit(): void {

    this.olympics$ = this.olympicService.getOlympics();

    this.subscription = this.olympics$.subscribe(value => {
      this.numberOfCountries = value.length;
      this.numberOfJOs = this.calculateNumberOfJOs(value);
      this.results = this.transformData(value);
    });

  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Calculates and returns the number of JOs, given an Olympic[]
   * @param value: Olympic[] 
   * @returns number
   */
  public calculateNumberOfJOs(value: Olympic[]): number {

    // TODO: suite mentorat 

    //////// Version initiale ////////

    /*     let jos = new Set<string>();
    
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].participations.length; j++) {
            jos.add(value[i].participations[j].city);
          }
        }
        return jos.size; */

    //////// Version intermédiaire ////////

    /*   let tab: string[] = [];
    
        value.forEach((olympic) => 
          olympic.participations.forEach((participation) => {
            tab.push(participation.city);
          }))
    
        return new Set(tab).size;
      } */

    //////// Version map ////////

    let jos = value.flatMap(olympic => olympic.participations).map(participation => participation.city);

    return new Set(jos).size;

  }

  /**
  * Transforms data in a format that can be used by the graph
  * @param data: Olympic[] 
  */
  public transformData(data: Olympic[]): { name: string; value: number; }[] {

    let dataDashboard: {
      name: string;
      value: number;
    }[] = [];

    data.map(olympic => {
      let nbOfMedals = (olympic.participations)
        .map(participation => participation.medalsCount)
        .reduce((acc, medalsCount) => acc + medalsCount);
      dataDashboard.push({ name: olympic.country, value: nbOfMedals });
    })

    return dataDashboard;
  }

}

