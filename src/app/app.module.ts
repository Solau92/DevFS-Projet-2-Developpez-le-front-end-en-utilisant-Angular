import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardChartComponent } from './pages/home/dashboard-chart/dashboard-chart.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DetailChartComponent } from './pages/detail/detail-chart/detail-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// TOOD : Voir pourquoi declarations / imports (/standadlone)

/**
 * Root module of the app
 */
@NgModule({
  declarations: [AppComponent], 
  imports: [HomeComponent, NotFoundComponent, BrowserModule, AppRoutingModule, HttpClientModule, DashboardChartComponent, 
    BrowserModule, DetailComponent, DetailChartComponent, BrowserAnimationsModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
