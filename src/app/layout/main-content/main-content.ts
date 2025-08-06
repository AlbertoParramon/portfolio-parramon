import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { About } from '@pages/about/about';
import { Experience } from '@pages/experience/experience';
import { Education } from '@pages/education/education';
import { Skills } from '@pages/skills/skills';
import { Projects } from '@pages/projects/projects';
import { SectionsService, Section } from '@services/sections';


@Component({
  selector: 'app-main-content',
  imports: [CommonModule, About, Experience, Education, Skills, Projects],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss'
})
export class MainContent {
  sections: Section[] = [];
  isSmallScreen = false;

  constructor(private sectionsService: SectionsService) {
    this.sections = this.sectionsService.sections;
    this.checkScreenSize();
  }

  // Detectar cambios en el tamaño de la ventana
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 992; // Pantallas de 992px o menos
  }

  // Obtener secciones según el tamaño de pantalla
  get sectionsToShow() {
    return this.isSmallScreen ? this.sectionsService.allSections : this.sectionsService.visibleSections;
  }
}
