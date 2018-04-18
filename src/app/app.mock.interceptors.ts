import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MockAdopterInterceptor } from './mocks/adopters.interceptor';
import { MockAdoptionIntercepter } from './mocks/adoptions.interceptor';
import { MockAnimalInterceptor } from './mocks/animals.interceptor';

export const APP_MOCK_INTERCEPTORS = [
    { provide: HTTP_INTERCEPTORS, useClass: MockAdopterInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MockAdoptionIntercepter, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MockAnimalInterceptor, multi: true }
];
