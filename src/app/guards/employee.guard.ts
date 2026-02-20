import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

export const employeeGuard = () => {
  const api = inject(ApiService);
  const router = inject(Router);

  if (api.isEmployeeLoggedIn()) {
    return true;
  }

  router.navigate(['/employee/login']);
  return false;
};
