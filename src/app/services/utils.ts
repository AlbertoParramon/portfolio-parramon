import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  valueCopied = '';

  constructor() { }

  /**
   * Copia texto al portapapeles del usuario y maneja el feedback visual
   * @param text - Texto a copiar
   * @returns Promise que se resuelve con el texto copiado si es exitoso
   */
  async copyToClipboard(text: string): Promise<string> {
    try {
      await navigator.clipboard.writeText(text);
      this.valueCopied = text;
      setTimeout(() => this.valueCopied = "", 500);
      return text;
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
      throw err;
    }
  }

  /**
   * Abre un archivo en una nueva pestaña
   * @param path - Ruta del archivo a abrir
   */
  async openFile(path: string): Promise<void> {
    // Abrir el archivo en una nueva pestaña
    window.open(path, '_blank');
  }
}