import { Component } from '@angular/core';
import { PokemonComponent } from './components/pokemon/pokemon.component';

@Component({
  imports: [PokemonComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
