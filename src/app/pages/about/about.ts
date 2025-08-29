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

  async openFile(path: string): Promise<void> {
    // Abrir el archivo en una nueva pestaña
    window.open(path, '_blank');
  }
}
