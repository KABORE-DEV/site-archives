import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Authentification } from '../../services/authentification';

@Component({
  selector: 'app-tableau-de-bord',
  imports: [RouterLink],
  templateUrl: './tableau-de-bord.html',
  styleUrl: './tableau-de-bord.css'
})
export class TableauDeBord {
  prenom = '';

  accesRapides = [
    { titre: 'Rechercher des archives', detail: 'Devoirs, tests, épreuves', lien: '/archives' },
    { titre: 'Voir le programme', detail: "Programme de l'année", lien: '/programme' },
    { titre: 'Docs téléchargés', detail: 'Mes fichiers téléchargés', lien: '/mes-documents' },
    { titre: 'Mon profil', detail: 'Mes informations', lien: '/mon-profil' }
  ];

  actualites = [
    {
      titre: 'Mise à jour des archives 2024',
      texte: 'Les épreuves de la session 1 sont disponibles.',
      date: '12 mars 2025'
    },
    {
      titre: 'Rappel',
      texte: 'Les dépôts de fichiers sont ouverts pour les chefs de filière.',
      date: '5 mars 2025'
    }
  ];

  constructor(private auth: Authentification) {
    this.prenom = this.auth.utilisateur()?.prenom ?? '';
  }
}