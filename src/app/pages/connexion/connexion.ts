import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Authentification } from '../../services/authentification';
@Component({
  selector: 'app-connexion',
  imports: [RouterLink, FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class Connexion {
  identifiant = '';
  mdp = '';
  souvenir = false;
  erreur = '';
  afficherMdp = false;

  constructor(private router: Router) {}

  basculerMdp() {
    this.afficherMdp = !this.afficherMdp;
  }

  seConnecter() {
    if (!this.identifiant.trim() || !this.mdp) {
      this.erreur = 'Veuillez saisir votre identifiant et votre mot de passe.';
      return;
    }

    const motif = /^[a-zA-Z0-9._@-]{3,50}$/;
    if (!motif.test(this.identifiant.trim())) {
      this.erreur = 'Identifiant invalide.';
      return;
    }

    this.erreur = '';
    // Faux login : plus tard, on appellera l'API ici
    this.router.navigate(['/tableau-de-bord']);
  }
}