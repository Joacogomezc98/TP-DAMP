import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { CapitalizePipe } from '../pipes/capitalize/capitalize.pipe';
import { DataService, Device } from '../services/data.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, CommonModule, CapitalizePipe]
})

export class ListadoComponent {
  devices: Device[] = []

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getDevices()
      .then(res => this.devices = res)
  }

  goToDevice(deviceId: number) {
    this.router.navigate(['/dispositivo', deviceId]);
  }
}
