import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Interfaces
import { PokemonData } from 'src/app/interfaces/pokemon-data';

//Services
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private pokemonsService: PokemonsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public pagePokemons: PokemonData[] = [];

  public page: number = 1;

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe((params) => {
      this.page = parseInt(params['page']);
    });
    await this.pokemonsService
      .getPokemons(this.page !== 1 ? this.page : undefined)
      .subscribe({
        next: async (res) => {
          await Promise.all(
            res.results.map((pokemon, index) => {
              this.pokemonsService.getPokemonData(pokemon.name).subscribe({
                next: (response) => {
                  this.pokemonsService.setPokemon(response);
                  if (index === res.results.length - 1) {
                    this.pokemonsService.setPagePokemons(this.page);
                    this.pagePokemons = [...this.pokemonsService.pagePokemons];
                  }
                },
                error: (error) => console.log(error),
              });
            })
          ).then((response) => {});
        },
        error: (error) => console.log(error),
      });
  }

  public getNewPokemons(): void {
    this.pokemonsService.getPokemons().subscribe({
      next: (res) => {
        Promise.all(
          res.results.map((pokemon) => {
            this.pokemonsService.getPokemonData(pokemon.name).subscribe({
              next: (response) => this.pokemonsService.setPokemon(response),
              error: (error) => console.log(error),
            });
          })
        ).then((response) => response);
      },
      error: (error) => console.log(error),
    });
  }

  public addPage(): void {
    this.router.navigate([''], { queryParams: { page: this.page + 1 } });
    this.pokemonsService.setPagePokemons(this.page + 1);
    this.pagePokemons = [...this.pokemonsService.pagePokemons];
    if (this.page >= this.pokemonsService.pokemons.length / 10 - 2) {
      this.getNewPokemons();
    }
  }

  public subtractPage(): void {
    this.router.navigate([''], { queryParams: { page: this.page - 1 } });
    this.pokemonsService.setPagePokemons(this.page - 1);
    this.pagePokemons = [...this.pokemonsService.pagePokemons];
  }
}
