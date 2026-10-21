import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Authentification } from '../../services/authentification';

@Component({
  selector: 'app-cadre-principal',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './cadre-principal.html',
  styleUrl: './cadre-principal.css'
})
export class CadrePrincipal {
  utilisateur = { nom: '', role: 'Étudiant', initiales: '' };

  constructor(private auth: Authentification) {
    const u = this.auth.utilisateur();
    if (u) {
      this.utilisateur.nom = `${u.prenom} ${u.nom}`;
      this.utilisateur.initiales = (u.prenom[0] + u.nom[0]).toUpperCase();
    }
  }
}