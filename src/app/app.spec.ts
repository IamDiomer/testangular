import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .compileComponents();
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
    httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/ditto/').flush({
      id: 132,
      name: 'ditto',
      base_experience: 101,
      height: 3,
      is_default: true,
      order: 214,
      weight: 40,
      sprites: { front_default: null },
      types: [{ type: { name: 'normal' } }],
    });
  });

  it('should render Ditto details from the API', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/ditto/').flush({
      id: 132,
      name: 'ditto',
      base_experience: 101,
      height: 3,
      is_default: true,
      order: 214,
      weight: 40,
      sprites: { front_default: null },
      types: [{ type: { name: 'normal' } }],
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Ditto');
    expect(compiled.textContent).toContain('101');
    expect(compiled.textContent).toContain('214');
    expect(compiled.textContent).toContain('3');
    expect(compiled.textContent).toContain('40');
    expect(compiled.textContent).toContain('Sí');
  });
});
