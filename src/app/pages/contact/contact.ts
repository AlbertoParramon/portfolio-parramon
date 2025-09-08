import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config';
import { UtilsService } from '../../services/utils';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {

  constructor(
    public configService: ConfigService,
    public utilsService: UtilsService
  ) {}

}
