import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataService, Device, Measurement } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Date2stringPipe } from '../pipes/date2string/date2string.pipe';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonList, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButtons, IonBackButton, CommonModule, FormsModule, Date2stringPipe, IonCard]
})
export class MedicionesPage implements OnInit {
  deviceId!: string | null;
  measurements: Measurement[] = [];
  device!: Device

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.deviceId = this.activatedRoute.snapshot.paramMap.get('deviceId');
    this.dataService.getDeviceById(this.deviceId!).then(res => this.device = res)
    this.dataService.getMeasurementsByDeviceId(this.deviceId!).then(res => this.measurements = res)
      ;
  }
}
