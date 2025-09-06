import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config';
import { UtilsService } from '../../services/utils';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

  constructor(
    public configService: ConfigService,
    public utilsService: UtilsService
  ) {}

}
