import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  valueCopied = '';

  constructor(public configService: ConfigService) {}

  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.valueCopied = text;
      setTimeout(() => this.valueCopied = "", 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  }

  async downloadFile(path: string, filename: string): Promise<void> {
    const link = document.createElement('a');
    link.href = path;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Native browser notification.
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Descarga completada', {
          body: `${filename} file downloaded successfully.`,
          icon: '/assets/icons/android-chrome-transparente-512x512.png'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Descarga completada', {
              body: `${filename} file downloaded successfully.`,
              icon: '/assets/icons/android-chrome-transparente-512x512.png'
            });
          }
        });
      }
    }
  }
}
