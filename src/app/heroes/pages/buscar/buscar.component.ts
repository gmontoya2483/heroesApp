import { Component, OnInit } from '@angular/core';
import {Heroe} from '../../interfaces/heroes.interface';
import {HeroesService} from '../../services/heroes.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public termino = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(): void {
    this.heroesService.gutSugerencias( this.termino.trim())
      .subscribe(
      (heroes: Heroe[]) => {
        this.heroes = heroes;
      }
    );
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent): void {

    if (!event.option.value){
      console.log('No hay valor');
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    // tslint:disable-next-line:no-non-null-assertion
    this.heroesService.getHeroePorId(heroe.id!)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        (heroe: Heroe) => {
          this.heroeSeleccionado = heroe;
        }
      );
  }
}
