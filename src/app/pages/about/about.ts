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
  emailCopied = false;
  phoneCopied = false;

  constructor(public configService: ConfigService) {}

  async copyToClipboard(text: string, type: 'email' | 'phone'): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      
      if (type === 'email') {
        this.emailCopied = true;
        setTimeout(() => this.emailCopied = false, 2000);
      } else {
        this.phoneCopied = true;
        setTimeout(() => this.phoneCopied = false, 2000);
      }
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  }

  downloadCV(): void {
    const cvConfig = this.configService.config?.sections?.['about']?.['cv'];
    const cvPath = cvConfig?.['path'] || 'assets/cv.pdf';
    const cvFilename = cvConfig?.['filename'] || 'Alberto_Parramon_CV.pdf';
    
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = cvFilename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
