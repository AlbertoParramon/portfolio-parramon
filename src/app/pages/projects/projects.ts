import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  constructor(public configService: ConfigService) {}

  onImageError(event: any): void {
    // Si la imagen no se puede cargar, usar una imagen por defecto
    event.target.src = 'assets/images/projects/default-project.png';
  }

  openProject(url: string): void {
    window.open(url, '_blank');
  }
}
