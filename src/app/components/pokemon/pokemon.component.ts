import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  imports: [
    ButtonModule,
    ChipModule,
    InputTextModule,
    JsonPipe,
    MessageModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    TagModule,
  ],
  selector: 'app-pokemon',
  styleUrl: './pokemon.component.css',
  templateUrl: './pokemon.component.html',
})
export class PokemonComponent {
  private readonly pokemonService = inject(PokemonService);
  protected readonly pokemon = signal<Pokemon | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly query = signal('ditto');
  protected readonly apiUrl = computed(() => {
    const pokemon = this.pokemon();
    return pokemon
      ? `${this.pokemonService.baseUrl}/pokemon/${pokemon.name}/`
      : this.pokemonService.baseUrl;
  });
  protected readonly imageGallery = computed(() => {
    const sprites = this.pokemon()?.sprites;
    if (!sprites) {
      return [];
    }

    const candidates = [
      { label: 'Ilustración oficial', url: sprites.other?.['official-artwork']?.front_default },
      { label: 'Vista frontal', url: sprites.front_default },
      { label: 'Vista posterior', url: sprites.back_default },
      { label: 'Vista frontal variocolor', url: sprites.front_shiny },
      { label: 'Vista posterior variocolor', url: sprites.back_shiny },
      { label: 'Ilustración Home', url: sprites.other?.home?.front_default },
      { label: 'Ilustración Dream World', url: sprites.other?.dream_world?.front_default },
      { label: 'Animación frontal', url: sprites.other?.showdown?.front_default },
      { label: 'Animación posterior', url: sprites.other?.showdown?.back_default },
    ];
    const seen = new Set<string>();

    return candidates.filter((image): image is { label: string; url: string } => {
      if (!image.url || seen.has(image.url)) {
        return false;
      }

      seen.add(image.url);
      return true;
    });
  });

  constructor() {
    this.loadPokemon('ditto');
  }

  protected onSearchInput(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.query.set(event.target.value);
    }
  }

  protected searchPokemon(): void {
    this.loadPokemon(this.query());
  }

  protected loadPokemon(identifier: string): void {
    const normalizedIdentifier = identifier.trim();
    if (!normalizedIdentifier) {
      this.error.set('Escribe el nombre o número de un Pokémon para buscarlo.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.pokemonService.getPokemon(normalizedIdentifier).subscribe({
      next: (pokemon) => {
        this.pokemon.set(pokemon);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.error.set(
          error.status === 404
            ? `No encontramos "${normalizedIdentifier}". Revisa el nombre o número e inténtalo otra vez.`
            : 'No pudimos conectar con la PokéAPI. Comprueba tu conexión e inténtalo de nuevo.',
        );
        this.loading.set(false);
      },
    });
  }
}
