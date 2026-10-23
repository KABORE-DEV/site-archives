import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authentification, Role } from '../../services/authentification';

const NOMS_ROLES: Record<Role, string> = {
  etudiant: 'Étudiant',
  chef: 'Chef de filière',
  admin: 'Administrateur'
};

@Component({
  selector: 'app-mon-profil',
  imports: [FormsModule],
  templateUrl: './mon-profil.html',
  styleUrl: './mon-profil.css'
})
export class MonProfil {
  prenom = '';
  nom = '';
  role = '';
  initiales = '';

  ancien = '';
  nouveau = '';
  confirmation = '';
  erreur = '';
  succes = '';

  constructor(auth: Authentification) {
    const u = auth.utilisateur();
    if (u) {
      this.prenom = u.prenom;
      this.nom = u.nom;
      this.role = NOMS_ROLES[u.role] ?? 'Étudiant';
      this.initiales = (u.prenom[0] + u.nom[0]).toUpperCase();
    }
  }

  changerMotDePasse() {
    this.succes = '';
    if (!this.ancien || !this.nouveau || !this.confirmation) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }
    if (this.nouveau.length < 8) {
      this.erreur = 'Le nouveau mot de passe doit contenir au moins 8 caractères.';
      return;
    }
    if (this.nouveau === this.ancien) {
      this.erreur = 'Le nouveau mot de passe doit être différent de l\'ancien.';
      return;
    }
    if (this.nouveau !== this.confirmation) {
      this.erreur = 'Les deux mots de passe ne sont pas identiques.';
      return;
    }

    this.erreur = '';
    // Plus tard : envoi à l'API, qui vérifiera l'ancien mot de passe côté serveur.
    this.succes = 'Vérifications réussies. Le changement sera enregistré quand l\'API sera branchée.';
    this.ancien = '';
    this.nouveau = '';
    this.confirmation = '';
  }
}
