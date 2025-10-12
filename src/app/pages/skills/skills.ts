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
   * Get the level label based on the complete skill
   * @param skill - Complete skill object with level and level_explanation
   * @returns Descriptive label of the level with explanation if exists
   */
  getLevelLabel(skill: any): string {
    const numLevel = parseInt(skill.level);
    let levelText = '';
    
    if (numLevel > 1 && numLevel <= 33) {
      levelText = 'Basic';
    } else if (numLevel > 33 && numLevel <= 66) {
      levelText = 'Intermediate';
    } else if (numLevel > 66 && numLevel <= 100) {
      levelText = 'Advanced';
    } else {
      levelText = 'Unknown';
    }
    
    // If there is level_explanation and it is not empty, add ":"
    if (skill.level_explanation && skill.level_explanation.trim() !== '') {
      levelText += ':';
    }
    
    return levelText;
  }

  /**
   * Get the class for the level
   * @param level - Level of the skill
   * @returns Class for the level
   */
  getLevelClass(level: string): string {
    const numLevel = parseInt(level);
    if (numLevel > 1 && numLevel <= 33) {
      return 'level-basic';
    } else if (numLevel > 33 && numLevel <= 66) {
      return 'level-intermediate';
    } else if (numLevel > 66 && numLevel <= 100) {
      return 'level-advanced';
    } else {
      return 'level-unknown';
    }
  }
}