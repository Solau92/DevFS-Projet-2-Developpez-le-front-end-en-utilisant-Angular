import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Observable, Subscription } from 'rxjs';
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
export class DashboardChartComponent implements OnInit {

  // Data 
  @Input() public dataDashboard!: { name: string; value: number; }[];

  //////// Ajout pour unsubscribe
  public subscription!: Subscription;

  // Graph options 
  public showLegend: boolean = false;
  public showLabels: boolean = true;
  public legendPosition = LegendPosition.Below;
  public maxLabelLength = 30;

  constructor(private router: Router) {
  }

  /**
   * Gets data needed for the graph
   * A supprimer 
   */
  public ngOnInit(): void {
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
  public onSelect(data: { name: string; value: number; label: string }): void {

    // console.log(data);

    this.router.navigateByUrl(`detail/${data.name}`);

  }

}

