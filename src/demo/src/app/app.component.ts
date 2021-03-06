import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  distrib = [50,50,50];
  throughput = 10;
  difficulty = 0;
  started = false;
  ctr = [0,0,0];
  sent = 0;
  rcvd = 0;
  maxPending = 10;

  constructor(private http: HttpClient) {
  }
 
  start() {
    if (this.started)
      return;
    this.ctr = [0,0,0];
    this.sent = 0;
    this.rcvd = 0;
    this.started = true;
    this.work();
  }

  stop() {
    if (!this.started)
      return;

    this.started = false;
  }

  work() {
    if (!this.started)
      return;
    
    // -- do work if queue is not full
    if (this.sent - this.rcvd < this.maxPending) {
      const queue =  this.getNextQueue();
      if (queue < 0) {
        this.started = false;
        return;
      } 
      this.sent++;
      this.ctr[queue]++;
      this.http.get<void>('api/gcd' + (queue+1) + '?difficulty=' + this.difficulty)
        .toPromise()
        .catch(()=>{})
        .then(()=> {
          this.rcvd++;
        })
    }

    // queue next execution
    setTimeout(()=> {
      //this.randomize();
      this.work();
    },1000 * (1/(this.throughput+1)));
  }

  getNextQueue() : number {
    let retval = -1;
    for (let i=0;i<this.distrib.length;i++) {
      if (this.ctr[i] < this.sent*(this.distrib[i]/this.distrib.reduce((p,c)=>p+=c,0.0))) {
        retval = i;
        break;
      }
    }
    if (retval == -1){
      for (let i=0;i<this.distrib.length;i++) {
        if (this.distrib[i] > 0) {
          retval = i;
          break;
        }
      }
    }
    return retval;
  }

  randomize() {
    if (Math.random() < 0.001) {
      this.difficulty = (this.difficulty+ Math.floor(Math.random()*5)) % 6;
    }
    if (Math.random() < (0.0001 * (100-this.throughput+1))) {
      this.throughput = ((this.throughput + Math.floor(Math.random()*50)) % 100) + 1;
    }
  }
}
