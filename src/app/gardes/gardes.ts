import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authentification, Role } from '../services/authentification';

// Bloque les pages si personne n'est connecté
export const gardeConnecte: CanActivateFn = () => {
  const auth = inject(Authentification);
  const router = inject(Router);
  return auth.estConnecte() ? true : router.createUrlTree(['/connexion']);
};

// Bloque les pages réservées à certains rôles
export function gardeRole(autorises: Role[]): CanActivateFn {
  return () => {
    const auth = inject(Authentification);
    const router = inject(Router);
    return autorises.includes(auth.role()) ? true : router.createUrlTree(['/tableau-de-bord']);
  };
}
