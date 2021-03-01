import {Component, OnInit} from '@angular/core';
import {Heroe, Publisher} from '../../interfaces/heroes.interface';
import {HeroesService} from '../../services/heroes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmarComponent} from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }

  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor(private heroeService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }
      this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.heroeService.getHeroePorId(id) )
        )
        .subscribe(
          (heroe: Heroe) => {
            this.heroe = heroe;
            console.log(this.heroe);
          }
        );

  }

  guardar(): void {
    if (this.heroe.superhero.trim().length === 0){
      return;
    }

    if (this.heroe.id) {
      // Actualizar
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe(
          (heroe: Heroe) => {
            this.mostrarSnakbar('Heroe actualizado');
          }
        );
    } else {
      // Crear
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(
          (heroe: Heroe) => {
            this.heroe.id = heroe.id;
            this.mostrarSnakbar('Heroe creado');
            this.router.navigate(['/heroes', 'editar', heroe.id]);
          }
        );
    }

  }

  borrarHeroe(): void {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: {...this.heroe}
    });

    dialog.afterClosed().subscribe(
      (resultado) => {
        if (resultado){
          this.heroeService.borrarHeroe(this.heroe.id!).subscribe(
            (resp: any) => {
              this.mostrarSnakbar('Heroe eliminado');
              this.router.navigate(['/heroes']);
            }
          );
        }
      }
    );
  }

  mostrarSnakbar( mensaje: string): void {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

}
