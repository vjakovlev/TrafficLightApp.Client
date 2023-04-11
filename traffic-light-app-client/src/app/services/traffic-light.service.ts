import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITraficLightResonse } from '../interfaces/trafficlight.model';

@Injectable({
  providedIn: 'root'
})
export class TrafficLightService {

  constructor(private _httpClient: HttpClient) { }

  activateHub(): Observable<any> {
    let url = `https://localhost:7232/api/TrafficLight/ActivateHub`;
    return this._httpClient.get<ITraficLightResonse>(url);
  }

  updateState(): Observable<ITraficLightResonse> {
    let url = `https://localhost:7232/api/TrafficLight/ChangeState`;
    return this._httpClient.get<ITraficLightResonse>(url);
  }

}