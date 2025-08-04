import { Component } from '@angular/core';
import { Sidebar } from '@layout/sidebar/sidebar';
import { MainContent } from '@layout/main-content/main-content';
import { Footer } from '@layout/footer/footer';

@Component({
  selector: 'app-skeleton',
  imports: [Sidebar, MainContent, Footer],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss'
})
export class Skeleton {

}
