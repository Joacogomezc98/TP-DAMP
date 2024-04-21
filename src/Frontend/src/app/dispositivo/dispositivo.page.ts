import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonNote, IonTitle, IonToggle, IonToolbar, NavController, ToastController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { detalleSensorPage } from '../detalle-sensor/detalle-sensor.page';
import { DataService, Device } from '../services/data.service';
import * as moment from 'moment';
import { TextColorDirective } from '../directives/text-color.directive';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonToggle,
    IonItem,
    IonLabel,
    IonCardHeader,
    IonCardContent,
    IonButton,
    detalleSensorPage,
    IonBackButton,
    IonButtons,
    TextColorDirective,
    IonImg,
    IonNote,
  ]
})

export class DispositivoPage implements OnInit {

  deviceId!: string | null;

  device!: Device | null;

  valveState!: 1 | 0;

  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private dataService: DataService,
    private router: Router,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.deviceId = this.activatedRoute.snapshot.paramMap.get('deviceId');
    this.device = await this.dataService.getDeviceById(this.deviceId!)
    const lastLog = await this.dataService.getLogsByElectrovalvulaId(this.device!.electrovalvulaId)
    this.valveState = lastLog[0].apertura
  }

  goToPreviousPage() {
    this.navCtrl.back();
  }

  goToMeasurment() {
    this.router.navigate(['/mediciones', this.deviceId]);
  }

  goToLogs() {
    this.router.navigate(['/logs', this.device?.electrovalvulaId]);
  }

  randomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async presentToast(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: type,
    });
    toast.present();
  }

  async handleValve(id: number) {
    const log_payload = {
      apertura: this.valveState ? 1 : 0,
      fecha: moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss.SSS') as unknown as Date,
      electrovalvulaId: id
    }

    try {
      this.dataService.postLog(log_payload)
      this.presentToast('Estado de valvula loggeado.', 'success');
    }
    catch (error) {
      this.presentToast('Error en loggeo de estado', 'danger');
    }

    //Si se cierra la valvula crear medicion
    if (!this.valveState) {
      const measurment = {
        fecha: moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss.SSS') as unknown as Date,
        dispositivoId: parseInt(this.deviceId!),
        //valor random para simular medicion de humedad de suelo. Entre 0 y 60.
        valor: this.randomValue(0, 60)
      }
      try {
        this.dataService.postMeasurment(measurment);
        this.presentToast('Medicion registrada.', 'success');
      } catch (error) {
        this.presentToast('Error en registrar medicion.', 'danger');
      }
    }
  }

  buttonClicked(buttonNumber: number) {
    switch (buttonNumber) {
      case 1:
        this.goToMeasurment()
        break;
      case 2:
        this.goToLogs()
        break;
      default:
        break;
    }
  }

}
