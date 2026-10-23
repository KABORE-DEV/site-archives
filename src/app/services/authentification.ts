import { Injectable } from '@angular/core';

export type Role = 'etudiant' | 'chef' | 'admin';

export interface Utilisateur {
  prenom: string;
  nom: string;
  role: Role;
}

@Injectable({ providedIn: 'root' })
export class Authentification {
  private cle = 'utilisateur';

  connecter(utilisateur: Utilisateur, souvenir: boolean) {
    this.deconnecter();
    const stockage = souvenir ? localStorage : sessionStorage;
    stockage.setItem(this.cle, JSON.stringify(utilisateur));
  }

  utilisateur(): Utilisateur | null {
    const texte = localStorage.getItem(this.cle) ?? sessionStorage.getItem(this.cle);
    if (!texte) return null;
    try {
      return JSON.parse(texte);
    } catch {
      return null;
    }
  }

  estConnecte(): boolean {
    return this.utilisateur() !== null;
  }

  role(): Role {
    return this.utilisateur()?.role ?? 'etudiant';
  }

  deconnecter() {
    localStorage.removeItem(this.cle);
    sessionStorage.removeItem(this.cle);
  }
}
