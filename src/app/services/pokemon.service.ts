import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  readonly baseUrl = 'https://pokeapi.co/api/v2';
  private readonly http = inject(HttpClient);

  getPokemon(identifier: string): Observable<Pokemon> {
    const pokemon = encodeURIComponent(identifier.trim().toLowerCase());
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${pokemon}/`);
  }
}
