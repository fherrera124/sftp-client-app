import { Component } from '@angular/core';
import { SftpItem, SftpService } from './services/sftp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  path = '/';
  fileList!: SftpItem[];

  constructor(private sftpService: SftpService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.sftpService.getList(this.path).subscribe(
      {
        next: (data) => {
          this.fileList = data;
        },
        error: (error) => {
          console.error('Error al obtener la lista de archivos:', error);
        }
      }
    );
  }

  enterDirectory(directoryName: string) {
    console.warn(directoryName);
    // Concatenar el nombre del directorio a la ruta actual
    console.warn("nueva ruta: ", `${this.path}${directoryName}/`);
    this.path = `${this.path}${directoryName}/`;
    // Obtener la lista actualizada para el nuevo directorio
    this.getList();
  }

  downloadFile(file: any) {
    const filePath = `${this.path}${file.name}`;
    this.sftpService.downloadFile(filePath)/* .subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: file.type });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = file.name;
        link.click();
      },
      (error) => {
        console.error('Error al descargar el archivo:', error);
      }
    ); */
  }
}
