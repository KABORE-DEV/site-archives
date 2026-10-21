import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Authentification {

  connecter(prenom: string, nom: string) {
    localStorage.setItem('utilisateur', JSON.stringify({ prenom, nom }));
  }

  utilisateur() {
    const texte = localStorage.getItem('utilisateur');
    return texte ? JSON.parse(texte) : null;
  }

  deconnecter() {
    localStorage.removeItem('utilisateur');
  }
}