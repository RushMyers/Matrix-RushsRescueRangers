import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MockAnimalInterceptor } from './mocks/animals.interceptor';

export const APP_MOCK_INTERCEPTORS = [
    { provide: HTTP_INTERCEPTORS, useClass: MockAnimalInterceptor, multi: true }
];
