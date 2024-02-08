import { Component, Input } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
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

  // Data from HomeComponent
  @Input() public dataDashboard!: { name: string; value: number; }[];

  // Graph options 
  public showLegend: boolean = false;
  public showLabels: boolean = true;
  public legendPosition = LegendPosition.Below;
  public maxLabelLength = 30;

  constructor(private router: Router) {
  }

  /**
   * Sets the tooltipText by returning an html tag corresponding to the tooltip text
   * @param tooltipText 
   * @returns string
   */

  public setToolTipText(tooltipText: any): string {
    return "<span> <span class=\"tooltip-label\">" + tooltipText.data.name + "</span> <span class=\"tooltip-val\">" + " 🎖" + tooltipText.value + "</span></span>";
  }

  /**
   * Defines the action onSelect of the graph : user must be redirected to 
   * detail page of the selected country
   */
  public onSelect(data: { name: string; value: number; label: string }): void {
    this.router.navigateByUrl(`detail/${data.name}`);
  }

}

