import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interface
import { PokemonData } from '../interfaces/pokemon-data';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  private _pokemons: PokemonData[] = [];

  private _pagePokemons: PokemonData[] = [];

  public getPokemons(): Observable<{ results: PokemonData[] }> {
    return this.http
      .get<{ results: PokemonData[] }>(
        `${this.baseUrl}?limit=40&offset=${this._pokemons.length}`
      )
      .pipe(
        (response) => response,
        (error) => error
      );
  }

  public getPokemonData(name: string): Observable<PokemonData> {
    return this.http.get<PokemonData>(`${this.baseUrl}/${name}`).pipe(
      (response) => response,
      (error) => error
    );
  }

  public setPokemon(value: PokemonData): void {
    this._pokemons.push(value);
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
