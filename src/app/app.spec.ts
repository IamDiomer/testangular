import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

const dittoResponse = {
  id: 132,
  name: 'ditto',
  base_experience: 101,
  height: 3,
  is_default: true,
  order: 214,
  weight: 40,
  abilities: [
    { ability: { name: 'limber', url: '/ability/7' }, is_hidden: false, slot: 1 },
  ],
  forms: [{ name: 'ditto', url: '/pokemon-form/132' }],
  game_indices: [{ game_index: 132, version: { name: 'red', url: '/version/1' } }],
  held_items: [],
  location_area_encounters: '/pokemon/132/encounters',
  moves: [{ move: { name: 'transform', url: '/move/144' } }],
  species: { name: 'ditto', url: '/pokemon-species/132' },
  sprites: {
    front_default: 'https://example.com/ditto.png',
    back_default: null,
    front_shiny: null,
    back_shiny: null,
    other: {
      'official-artwork': {
        front_default: 'https://example.com/ditto-art.png',
        front_shiny: null,
      },
    },
  },
  stats: [{ base_stat: 48, effort: 1, stat: { name: 'hp', url: '/stat/1' } }],
  types: [{ slot: 1, type: { name: 'normal', url: '/type/1' } }],
};

describe('App', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('loads Ditto and shows its data and images', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/ditto/').flush(dittoResponse);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')?.textContent).toContain('ditto');
    expect(element.textContent).toContain('101');
    expect(element.textContent).toContain('0.3');
    expect(element.textContent).toContain('4');
    expect(element.textContent).toContain('transform');
    expect(element.querySelectorAll('.image-tile img').length).toBe(2);
    expect(element.querySelector('.pokemon-artwork')?.getAttribute('src')).toBe('https://example.com/ditto-art.png');
  });

  it('searches by the name entered by the user', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/ditto/').flush(dittoResponse);

    const input = fixture.nativeElement.querySelector('#pokemon-search') as HTMLInputElement;
    input.value = 'Pikachu';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.search-controls button').click();

    const request = httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu/');
    request.flush({ ...dittoResponse, id: 25, name: 'pikachu' });
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('h2')?.textContent).toContain('pikachu');
  });

  it('shows a useful message when a Pokémon is not found', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/ditto/').flush(dittoResponse);

    const input = fixture.nativeElement.querySelector('#pokemon-search') as HTMLInputElement;
    input.value = 'not-a-pokemon';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.search-controls button').click();
    httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/not-a-pokemon/').flush(
      { detail: 'Not found.' },
      { status: 404, statusText: 'Not Found' },
    );
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('No encontramos "not-a-pokemon"');
  });
});
