import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Authentification, Role } from '../../services/authentification';

const ACCES: Record<Role, { titre: string; detail: string; lien: string }[]> = {
  etudiant: [
    { titre: 'Rechercher des archives', detail: 'Devoirs, tests, épreuves', lien: '/archives' },
    { titre: 'Voir le programme', detail: "Programme de l'année", lien: '/programme' },
    { titre: 'Docs téléchargés', detail: 'Mes fichiers téléchargés', lien: '/mes-documents' },
    { titre: 'Mon profil', detail: 'Mes informations', lien: '/mon-profil' }
  ],
  chef: [
    { titre: 'Ajouter une archive', detail: 'Déposer un devoir, test ou épreuve', lien: '/ajout-archive' },
    { titre: 'Ajouter un programme', detail: 'Déposer la photo du programme', lien: '/ajout-programme' },
    { titre: 'Rechercher des archives', detail: 'Consulter les archives existantes', lien: '/archives' },
    { titre: 'Mon profil', detail: 'Mes informations', lien: '/mon-profil' }
  ],
  admin: [
    { titre: 'Gérer les utilisateurs', detail: 'Comptes et rôles', lien: '/utilisateurs' },
    { titre: 'Gérer les modules', detail: 'Modules par filière', lien: '/gestion-modules' },
    { titre: 'Ajouter une archive', detail: 'Déposer un fichier', lien: '/ajout-archive' },
    { titre: 'Ajouter un programme', detail: 'Déposer la photo du programme', lien: '/ajout-programme' }
  ]
};

const SOUS_TITRES: Record<Role, string> = {
  etudiant: 'Voici un aperçu de votre espace étudiant.',
  chef: 'Voici un aperçu de votre espace chef de filière.',
  admin: "Voici un aperçu de l'administration de la plateforme."
};

@Component({
  selector: 'app-tableau-de-bord',
  imports: [RouterLink],
  templateUrl: './tableau-de-bord.html',
  styleUrl: './tableau-de-bord.css'
})
export class TableauDeBord {
  prenom = '';
  sousTitre = '';
  accesRapides: { titre: string; detail: string; lien: string }[] = [];

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
    const u = this.auth.utilisateur();
    const role: Role = u?.role ?? 'etudiant';
    this.prenom = u?.prenom ?? '';
    this.sousTitre = SOUS_TITRES[role];
    this.accesRapides = ACCES[role];
  }
}
