import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Authentification, Role } from '../../services/authentification';

// COMPTES DE TEST : à supprimer quand l'API sera branchée
const COMPTES_TEST: { id: string; mdp: string; prenom: string; nom: string; role: Role }[] = [
  { id: 'etudiant', mdp: 'etudiant123', prenom: 'Aïssatou', nom: 'Diallo', role: 'etudiant' },
  { id: 'chef.info', mdp: 'chef12345', prenom: 'Moussa', nom: 'Traoré', role: 'chef' },
  { id: 'admin', mdp: 'admin12345', prenom: 'Fatou', nom: 'Ouattara', role: 'admin' }
];

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

  constructor(private router: Router, private auth: Authentification) {}

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

    const id = this.identifiant.trim().toLowerCase();
    const compte = COMPTES_TEST.find(c => c.id === id && c.mdp === this.mdp);

    if (!compte) {
      this.erreur = 'Identifiant ou mot de passe incorrect.';
      return;
    }

    this.erreur = '';
    this.auth.connecter(
      { prenom: compte.prenom, nom: compte.nom, role: compte.role },
      this.souvenir
    );
    this.router.navigate(['/tableau-de-bord']);
  }
}
