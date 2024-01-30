import { Component } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
export class DashboardChartComponent {

  // Data 
  public dataDashboard!: any[]; // TODO: any ?
  public olympics$!: Observable<Olympic[]>;

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
    this.olympics$.subscribe(value => this.transformData(value));

  }

  /**
   * Transforms data in a format that can be used by the graph
   * @param data: Olympic[] 
   */ 
  public transformData(data: Olympic[]) {
    
    // TODO: any ??
    const dataDashboardTemp: any[] = [];

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
   * @param tooltipText: any 
   * @returns string
   */

  //TODO : voir any
  public setToolTipText(tooltipText: any): string {

    return "<span> <span class=\"tooltip-label\">" + tooltipText.data.name + "</span> <span class=\"tooltip-val\">" + " 🎖" + tooltipText.value + "</span></span>";
    
  }

  /**
   * Defines the action onSelect of the graph
   */

  //TODO : voir any
  public onSelect(data: any): void {
    
    this.router.navigateByUrl(`detail/${data.name}`);
 
  }

}

