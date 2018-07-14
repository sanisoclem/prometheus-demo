import { Component } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  distrib1 = 33;
  distrib2 = 33;
  distrib3 = 33;
  throughput = 10;
  difficulty = 5;
  started = false;

  constructor(private http: Http) {
   }
 
  start() {
    if (this.started)
      return;
    this.started = true;
  }
  stop() {
    if (!this.started)
      return;

    this.started = false;
  }

  work() {
    // do work
    // queue next execution

    if (this.started)
      return;
    setTimeout(()=> {
      
    },1000 * (1/this.throughput));
  }
}
