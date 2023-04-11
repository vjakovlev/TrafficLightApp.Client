import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { SignalRService } from 'src/app/services/signal-r.service';
import { TrafficLightService } from 'src/app/services/traffic-light.service';


@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.css']
})
export class TrafficLightComponent implements OnInit {

  colors = {
    off: '#201f1f',
    red: '#e64c3c',
    yellow: '#f3d55b',
    green: '#4fba6f'
  };

  stateCounter: number = 0;
  selectedColor: string = "";
  trafficLightInterval: any;
  trafficLightStateTimer: any;

  constructor(public signalRService: SignalRService,
    private _trafficLightService: TrafficLightService) { }

  ngOnInit() {
    this._trafficLightService.activateHub().subscribe(data => {
      this.selectedColor = data.activeTrafficLight.lightColor;
      this.scheduleAndSetTrafficLightState(data.activeTrafficLight.duration, data.activeTrafficLight.lightColor)
    });

    this.signalRService.dataSubject$
      .pipe(filter(val => !!val))
      .subscribe((data) => {
        this.scheduleAndSetTrafficLightState(data.activeTrafficLight.duration, data.activeTrafficLight.lightColor)
      });
  }

  scheduleAndSetTrafficLightState(duration: number, color: string) {
    this.selectedColor = color;
    clearInterval(this.trafficLightInterval)
    this.stateCounter = duration;

    this.trafficLightInterval = setInterval(() => {
      this.stateCounter--
    }, 1000)
    
    this.trafficLightStateTimer = setTimeout(() => {
      this._trafficLightService.updateState().subscribe()
    }, duration * 1000)
  }

  pedestrianButtonClicked() {
    if (this.selectedColor === 'Green' && this.stateCounter > 5) {
      clearTimeout(this.trafficLightStateTimer);
      clearInterval(this.trafficLightInterval);
      this.scheduleAndSetTrafficLightState(30, 'Green')
    }
  }

}

