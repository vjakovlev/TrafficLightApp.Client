import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public dataSubject$ = new BehaviorSubject<any>(null);
  private hubConnection: HubConnection;

  public startConnection = () => {  
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7232/trafficlight")
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("Signal-R connected!"))
      .catch(err => console.log("Error while starting connection: " + err));
  }

  public addTrafficLightListener = () => {
    this.hubConnection.on("trafficlightlistener", (data) => {
      this.dataSubject$.next(data);
    });
  }
  
}
