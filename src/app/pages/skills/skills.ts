import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {

  constructor(public configService: ConfigService) {}

  /**
   * Convierte el nivel numérico (1-3) a porcentaje para la barra de progreso
   * @param level - Nivel de habilidad (1, 2, o 3)
   * @returns Porcentaje para la barra de progreso
   */
  getLevelPercentage(level: string): number {
    const numLevel = parseInt(level);
    switch (numLevel) {
      case 1: return 33;  // Básico
      case 2: return 66;  // Intermedio
      case 3: return 100; // Avanzado
      default: return 0;
    }
  }

  /**
   * Obtiene la etiqueta de nivel basada en el número
   * @param level - Nivel de habilidad (1, 2, o 3)
   * @returns Etiqueta descriptiva del nivel
   */
  getLevelLabel(level: string): string {
    const numLevel = parseInt(level);
    switch (numLevel) {
      case 1: return 'Básico';
      case 2: return 'Intermedio';
      case 3: return 'Avanzado';
      default: return 'Desconocido';
    }
  }

  /**
   * Obtiene la clase CSS para el color de la barra de progreso
   * @param level - Nivel de habilidad (1, 2, o 3)
   * @returns Clase CSS para el color
   */
  getLevelClass(level: string): string {
    const numLevel = parseInt(level);
    switch (numLevel) {
      case 1: return 'level-basic';
      case 2: return 'level-intermediate';
      case 3: return 'level-advanced';
      default: return 'level-unknown';
    }
  }
}