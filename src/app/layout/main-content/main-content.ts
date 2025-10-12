import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { About } from '@pages/about/about';
import { Experience } from '@pages/experience/experience';
import { Education } from '@pages/education/education';
import { Skills } from '@pages/skills/skills';
import { Projects } from '@pages/projects/projects';
import { Contact } from '@pages/contact/contact';
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

  // Component mapping
  componentMap: { [key: string]: any } = {
    'about': About,
    'education': Education,
    'experience': Experience,
    'projects': Projects,
    'skills': Skills,
    'contact': Contact
  };

  constructor(private configService: ConfigService) {
    this.sections = this.configService.sections;
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= this.configService.smallScreenBreakpoint$;
  }

  get sectionsToShow() {
    return this.isSmallScreen ? this.configService.allSections : this.configService.visibleSections;
  }

  getComponent(label: string): any {
    return this.componentMap[label] || null;
  }
}
