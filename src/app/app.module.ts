import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// Voir : import { BrowserAnimationsModule } from '@angular/plateform-browser/animations';
// Ajouté 
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardChartComponent } from './pages/home/dashboard-chart/dashboard-chart.component';
import { DetailComponent } from './pages/detail/detail.component';

// import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ScaleLinear, ScalePoint, ScaleTime } from 'd3-scale';

// Test
import { TestComponent } from './pages/home/test/test.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent ], // Voir pourquoi declarations / imports (/standadlone)
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, DashboardChartComponent, 
    BrowserModule, TestComponent, DetailComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
