import { Component, OnInit } from '@angular/core';
import { SimplePokemon } from 'src/app/interfaces/simple-pokemon';

//Services
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private pokemonsService: PokemonsService) {}

  public pagePokemons: SimplePokemon[] = [];

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
}
