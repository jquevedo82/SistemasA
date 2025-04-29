import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-nopage-found',
  templateUrl: './nopage-found.component.html',
  styleUrls: ['./nopage-found.component.css'],
})
export class NopageFoundComponent implements OnInit {
  public titulo?: string;
  public urltitulo?: string;
  public Subtitulo?: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getArguments().subscribe(
      ({ titulo, Subtitulo, urltitulo }) => {
        this.titulo = titulo;
        this.Subtitulo = Subtitulo;
        this.urltitulo = urltitulo;
        document.title = `Neumen - ${titulo}`;
      }
    );
  }

  ngOnInit(): void {}
  getArguments() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
