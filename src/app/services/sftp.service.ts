import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SftpItem {
  type: '-' | 'd' | 'l';
  name: string;
  size: number;
  modifyTime: number;
  accessTime: number;
  rights: {
    user: string;
    group: string;
    other: string;
  };
  owner: number;
  group: number;
  longname: string;
}

@Injectable({
  providedIn: 'root'
})
export class SftpService {

  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  getList(path: string): Observable<SftpItem[]> {
    return this.http.get<SftpItem[]>(`${this.baseUrl}/list?ruta=${path}`);
  }

  downloadFile(path: string): void {
    this.http.get(`${this.baseUrl}/download?ruta=${path}`, { responseType: 'blob' })
      .subscribe(res => {
        window.open(window.URL.createObjectURL(res));
      });
  }



}
