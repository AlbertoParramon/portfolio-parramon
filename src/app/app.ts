import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Skeleton } from '@layout/skeleton/skeleton';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Skeleton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio-parramon');
}
