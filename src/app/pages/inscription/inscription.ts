import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  imports: [RouterLink, FormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class Inscription {
  nom= '';
  prenom = '';
  identifiant = '';
  filiere = '';
  niveau = '';
  mdp = '';
  mdp2 = '';
  erreur = '';

  creerCompte() {
    // 1. Champs vides
    if (!this.nom.trim() || !this.prenom.trim() || !this.identifiant.trim()
        || !this.filiere || !this.niveau || !this.mdp || !this.mdp2) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }

    // 2. Identifiant : seulement des caractères sûrs, 3 à 30 caractères
    const motif = /^[a-zA-Z0-9._-]{3,30}$/;
    if (!motif.test(this.identifiant.trim())) {
      this.erreur = 'Identifiant : 3 à 30 caractères (lettres, chiffres, point, tiret).';
      return;
    }

    // 3. Longueur du mot de passe
    if (this.mdp.length < 8) {
      this.erreur = 'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    // 4. Les deux mots de passe identiques
    if (this.mdp !== this.mdp2) {
      this.erreur = 'Les mots de passe ne sont pas identiques.';
      return;
    }

    this.erreur = '';
    console.log('Formulaire valide');
  }
}