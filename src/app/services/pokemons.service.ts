import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Interface
import { SimplePokemon } from 'src/app/interfaces/simple-pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = 'https://pokeapi.co/api/v2/';

  private _pokemons: SimplePokemon[] = [];

  private _pagePokemons: SimplePokemon[] = [];

  public getPokemons(): Observable<{ results: SimplePokemon[] }> {
    return this.http
      .get<{ results: SimplePokemon[] }>(`${this.baseUrl}pokemon?limit=50`)
      .pipe(
        (response) => response,
        (error) => error
      );
  }

  public set pokemons(list: SimplePokemon[]) {
    this._pokemons = [...this._pokemons, ...list];
  }

  public get pokemons() {
    return this._pokemons;
  }

  public setPagePokemons(page: number) {
    this._pagePokemons = this._pokemons.slice((page - 1) * 10, page * 10);
  }

  public get pagePokemons() {
    return this._pagePokemons;
  }
}
