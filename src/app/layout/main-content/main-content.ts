import { Component } from '@angular/core';
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

  constructor(private sectionsService: SectionsService) {
    this.sections = this.sectionsService.sections;
  }

  // Obtener solo las secciones visibles
  get visibleSections() {
    return this.sectionsService.visibleSections;
  }
}
