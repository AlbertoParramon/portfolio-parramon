import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  valueCopied = '';

  constructor() { }

  /**
   * Copies text to the user's clipboard and handles visual feedback
   * @param text - Text to copy
   * @returns Promise that resolves with the copied text if successful
   */
  async copyToClipboard(text: string): Promise<string> {
    try {
      await navigator.clipboard.writeText(text);
      this.valueCopied = text;
      setTimeout(() => this.valueCopied = "", 500);
      return text;
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      throw err;
    }
  }

  /**
   * Opens a file in a new tab
   * @param path - Path of the file to open
   */
  async openFile(path: string): Promise<void> {
    // Open the file in a new tab
    window.open(path, '_blank');
  }
}