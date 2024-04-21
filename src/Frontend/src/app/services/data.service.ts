import { Injectable } from '@angular/core';
import axios from 'axios';

const baseURL: string = 'http://localhost:8000'

export interface Device {
  dispositivoId: number;
  nombre: string;
  ubicacion: string;
  electrovalvulaId: number;
}

export interface Measurement {
  medicionId: number;
  fecha: Date;
  valor: number;
  dispositivoId: number;
}

export interface Log {
  logRiegoId: number;
  apertura: number;
  fecha: Date;
  electrovalvulaId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getDevices() {
    const data = axios.get(`${baseURL}/dispositivos`).then(response => {
      return response.data;
    });
    return data
  }

  getDeviceById(deviceId: string) {
    const data = axios.get(`${baseURL}/dispositivos/${deviceId}`).then(response => {
      return response.data;
    });
    return data
  }

  getMeasurementsByDeviceId(deviceId: string) {
    const data = axios.get(`${baseURL}/mediciones/${deviceId}`).then(response => {
      return response.data;
    });
    return data
  }

  async getLastValueByDeviceId(deviceId: string) {
    let lastMeasurmentValue: number
    const measurementsList = await this.getMeasurementsByDeviceId(deviceId)
    if (measurementsList.length > 0) {
      lastMeasurmentValue = parseInt(measurementsList[0].valor)
    } else {
      lastMeasurmentValue = 0
    }
    return lastMeasurmentValue
  }


  getLogsByElectrovalvulaId(electrovalvulaId: number) {
    const data = axios.get(`${baseURL}/logs/${electrovalvulaId}`).then(response => {
      return response.data;
    });
    return data
  }

  postLog(payload: Partial<Log>) {
    axios.post(`${baseURL}/logs`, payload)
  }

  postMeasurment(payload: Partial<Measurement>) {
    axios.post(`${baseURL}/mediciones`, payload)
  }
}
