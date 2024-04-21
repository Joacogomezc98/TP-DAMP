import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataService, Log } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Date2stringPipe } from '../pipes/date2string/date2string.pipe';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonBackButton, IonButtons, CommonModule, FormsModule, Date2stringPipe]
})
export class LogsPage implements OnInit {

  electrovalvulaId!: string | null;
  logs: Log[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.electrovalvulaId = this.activatedRoute.snapshot.paramMap.get('electrovalvulaId');
    // Assuming you have a method in DataService to get logs by device ID
    this.dataService.getLogsByElectrovalvulaId(parseInt(this.electrovalvulaId!))
      .then(res => this.logs = res);
  }

}
