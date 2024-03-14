import { environment } from './../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app-config';
const local_storage_token = environment.local_storage_token;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private appConfig: AppConfig = {} as AppConfig;

  private set(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  private get(key: string) {
    return localStorage.getItem(key);
  }
  setToken(token: string) {
    this.appConfig.jwtToken = token;
    this.set(local_storage_token, JSON.stringify(this.appConfig));
  }
  getToken(): string {
    const storedConfig = this.get(local_storage_token);
    try {
      this.appConfig = storedConfig ? JSON.parse(storedConfig) : {};
      return this.appConfig.jwtToken || '';
    } catch (error) {
      console.error('Error parsing stored config:', error);
      return '';
    }
  }
  removeToken() {
    const storedConfig = this.get(local_storage_token);
    this.appConfig = storedConfig ? JSON.parse(storedConfig) : null;
    if (this.appConfig.jwtToken) {
      this.appConfig.jwtToken = null;
      this.set(local_storage_token, JSON.stringify(this.appConfig));
      return;
    }
  }
}
