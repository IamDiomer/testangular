import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    providePrimeNG({
    license: 'eyJpZCI6ImUxYTcwMDUxLTQxYTgtNDliNS1iZGJhLTBhZmQxZDNlNDdiYSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTM1NDk5NjUsImV4cCI6MTgyNTA4NTk2NX0.-tBn50bhOQWAPdbrh4HeOH1O2-T9NvME5oezyA21rmSjZ1yfXhCd6tNP_IZUjfhH3h9GRO8QaMtGAyW7dHHzCQ',

      theme: {

        preset: Aura,
      },
    }),
  ]
};
