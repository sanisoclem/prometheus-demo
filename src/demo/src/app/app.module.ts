import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatListModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatSliderModule, MatDividerModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LineChartModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatSliderModule,
    MatDividerModule,
    MatFormFieldModule,
    MatListModule,
    HttpClientModule,
    LineChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
