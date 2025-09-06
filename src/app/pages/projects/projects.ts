import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config';
import { UtilsService } from '../../services/utils';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  constructor(
    public configService: ConfigService,
    public utilsService: UtilsService
  ) {}


}
