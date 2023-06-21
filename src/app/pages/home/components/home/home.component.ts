import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/interfaces/pokemon-data';

//Services
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private pokemonsService: PokemonsService) {}

  public pagePokemons: PokemonData[] = [];

  public page: number = 1;

  ngOnInit(): void {
    this.pokemonsService.getPokemons().subscribe({
      next: (res) => {
        this.pokemonsService.pokemons = res.results;
        this.pokemonsService.setPagePokemons(this.page);
        this.pagePokemons = [...this.pokemonsService.pagePokemons];
      },
      error: (error) => console.log(error),
    });
  }

  public getNewPokemons(): void {
    this.pokemonsService.getPokemons().subscribe({
      next: (res) => {
        this.pokemonsService.pokemons = res.results;
      },
      error: (error) => console.log(error),
    });
  }

  public addPage(): void {
    this.page += 1;
    this.pokemonsService.setPagePokemons(this.page);
    this.pagePokemons = [...this.pokemonsService.pagePokemons];
    if (this.page === this.pokemonsService.pokemons.length / 10 - 1) {
      this.getNewPokemons();
    }
  }

  public subtractPage(): void {
    this.page -= 1;
    this.pokemonsService.setPagePokemons(this.page);
    this.pagePokemons = [...this.pokemonsService.pagePokemons];
  }
}
