import { Injectable, signal } from '@angular/core';

// Interface para las secciones
export interface Section {
  icon: string;
  name: string;
  label: string;
  visible: boolean;
  children?: Section[];
  isOpen?: boolean;
}

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class SectionsService {
  // Signal para la lista de secciones (reactive)
  private sectionsSignal = signal<Section[]>([
    { icon: 'fas fa-home', name: 'ABOUT', label: 'app-about', visible: true },
    { icon: 'fas fa-envelope', name: 'EDUCATION', label: 'app-education', visible: false },
    { icon: 'fas fa-envelope', name: 'EXPERIENCE', label: 'app-experience', visible: false, children: [
      { icon: 'fas fa-chart-pie', name: 'Ejemplo 1', label: 'ejemplo 1', visible: false },
      { icon: 'fas fa-tasks', name: 'Ejemplo 2', label: 'ejemplo 2', visible: false },
    ] },
    { icon: 'fas fa-envelope', name: 'SKILLS', label: 'app-skills', visible: false },
    { icon: 'fas fa-envelope', name: 'PROJECTS', label: 'app-projects', visible: false },
    { icon: 'fas fa-envelope', name: 'OTRA', label: 'app-otra', visible: false }
  ]);

  // Getter público para acceder a las secciones
  get sections() {
    return this.sectionsSignal();
  }
  
  // Getter para solo secciones visibles
  get visibleSections() {
    return this.sectionsSignal().filter(section => section.visible);
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

