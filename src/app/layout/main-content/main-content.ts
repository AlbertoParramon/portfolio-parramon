import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { About } from '@pages/about/about';
import { Experience } from '@pages/experience/experience';
import { Education } from '@pages/education/education';
import { Skills } from '@pages/skills/skills';
import { Projects } from '@pages/projects/projects';
import { ConfigService, Config } from '@services/config';

@Component({
  selector: 'app-main-content',
  imports: [CommonModule],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss'
})
export class MainContent {
  sections: Config[] = [];
  isSmallScreen = false;

  // Mapeo de labels a componentes
  componentMap: { [key: string]: any } = {
    'about': About,
    'education': Education,
    'experience': Experience,
    'skills': Skills,
    'projects': Projects
  };

  constructor(private configService: ConfigService) {
    this.sections = this.configService.sections;
    this.checkScreenSize();
  }

  // Detectar cambios en el tamaño de la ventana
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= this.configService.smallScreenBreakpoint$;
  }

  // Obtener secciones según el tamaño de pantalla
  get sectionsToShow() {
    return this.isSmallScreen ? this.configService.allSections : this.configService.visibleSections;
  }



  // Obtener el componente correspondiente
  getComponent(label: string): any {
    return this.componentMap[label] || null;
  }
}
