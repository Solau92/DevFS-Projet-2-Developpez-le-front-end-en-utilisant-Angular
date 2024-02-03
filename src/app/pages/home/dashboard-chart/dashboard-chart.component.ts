import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

export class Toto {
  public name!: string;
  public value!: number;

}
/**
 * DashboardChartComponent, linked to HomePageComponent
 */
@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './dashboard-chart.component.html',
  styleUrl: './dashboard-chart.component.scss'
})
export class DashboardChartComponent implements OnInit, OnDestroy {

  // Data 
  public dataDashboard: {name: string; value: number;}[] = [];
  public olympics$!: Observable<Olympic[]>;

  //////// Ajout pour unsubscribe
  public subscription!: Subscription;

  // @Input() olympicsF$!: Observable<Olympic[]>;

  // Graph options 
  public showLegend: boolean = false;
  public showLabels: boolean = true;
  public legendPosition = LegendPosition.Below;
  public maxLabelLength = 30;

  constructor(private olympicService: OlympicService, private router: Router) {
  }

  /**
   * Gets data needed for the graph
   */
  public ngOnInit(): void {

    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe(value => this.transformData(value));

  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Transforms data in a format that can be used by the graph
   * @param data: Olympic[] 
   */ 
  public transformData(data: Olympic[]): void {
    
    const dataDashboardTemp: {
      name: string;
      value: number;
    }[] = [];

    for(let i = 0 ; i < data.length ; i++) {

      let nbOfMedals = 0;

      for(let j = 0 ; j < data[i].participations.length ; j++) {
        nbOfMedals += data[i].participations[j].medalsCount;
      }
      const obj = { name: data[i].country, value: nbOfMedals};
      dataDashboardTemp.push(obj);
    }
    this.dataDashboard = dataDashboardTemp;
  } 

  /**
   * Sets the tooltipText by returning an html tag corresponding to the tooltip text
   * @param tooltipText: any TODO: voir 
   * @returns string
   */

  //TODO : objet complexe --> enlever any quand même ??
  public setToolTipText(tooltipText: any): string {

    // console.log(tooltipText);

    return "<span> <span class=\"tooltip-label\">" + tooltipText.data.name + "</span> <span class=\"tooltip-val\">" + " 🎖" + tooltipText.value + "</span></span>";
    
  }

  /**
   * Defines the action onSelect of the graph
   */

  //TODO : vérifier que suppression de any est ok
  public onSelect(data: {name: string; value: number; label: string}): void {

    // console.log(data);
    
    this.router.navigateByUrl(`detail/${data.name}`);
 
  }

}

