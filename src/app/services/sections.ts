import { Injectable, signal } from '@angular/core';

// Interface para las secciones
export interface Section {
  name: string;
  label: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class SectionsService {
  // Signal para la lista de secciones (reactive)
  private sectionsSignal = signal<Section[]>([
    { name: 'ABOUT', label: 'app-about', visible: true },
    { name: 'EDUCATION', label: 'app-education', visible: false },
    { name: 'EXPERIENCE', label: 'app-experience', visible: false },
    { name: 'SKILLS', label: 'app-skills', visible: false },
    { name: 'PROJECTS', label: 'app-projects', visible: false },
    { name: 'OTRA', label: 'app-otra', visible: false }
  ]);

  // Getter público para acceder a las secciones
  get sections() {
    return this.sectionsSignal();
  }
  
  // Getter para solo secciones visibles
  get visibleSections() {
    return this.sectionsSignal().filter(section => section.visible);
  }

  // Getter para todas las secciones
  get allSections() {
    return this.sectionsSignal();
  }

  // Método para actualizar la visibilidad de una sección
  toggleSection(label: string) {
    const currentSections = this.sectionsSignal();
    const updatedSections = currentSections.map(section => ({
      ...section,
      visible: section.label === label ? !section.visible : section.visible
    }));
    this.sectionsSignal.set(updatedSections);
  }

  // Método para mostrar solo una sección específica
  showOnlySection(label: string) {
    const updatedSections = this.sectionsSignal().map(section => ({
      ...section,
      visible: section.label === label
    }));
    this.sectionsSignal.set(updatedSections);
  }
}

