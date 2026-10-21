import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-recherche-archives',
  imports: [FormsModule, RouterLink],
  templateUrl: './recherche-archives.html',
  styleUrl: './recherche-archives.css'
})
export class RechercheArchives {
  recherche = '';
  onglets = ['Tous', 'Devoir', 'Test', 'Épreuve de session'];
  ongletActif = 'Tous';

  filiere = 'Toutes';
  module = 'Tous';
  niveau = 'Tous';
  annee = 'Toutes';

  filieres = [
    'Génie Informatique',
    'Réseaux et systèmes',
    'Réseaux et télécommunications',
    'Électricité industrielle',
    'Électronique, électrotechnique et automatisme'
  ];

  // Les modules de chaque filière (exemples à compléter)
  modulesParFiliere: Record<string, string[]> = {
    'Génie Informatique': ['Mathématiques appliquées', "Introduction à l'informatique", 'Algorithmique'],
    'Réseaux et systèmes': ['Base de données', 'Systèmes d’exploitation'],
    'Réseaux et télécommunications': ['Réseaux', 'Télécommunications'],
    'Électricité industrielle': ['Électricité générale'],
    'Électronique, électrotechnique et automatisme': ['Électronique de base']
  };

  archives = [
    { titre: 'Mathématiques appliquées - Devoir 1', type: 'Devoir', filiere: 'Génie Informatique', module: 'Mathématiques appliquées', niveau: 'Licence 1', semestre: 'Semestre 1', annee: '2024 - 2025' },
    { titre: "Introduction à l'informatique - Test", type: 'Test', filiere: 'Génie Informatique', module: "Introduction à l'informatique", niveau: 'Licence 1', semestre: 'Semestre 1', annee: '2024 - 2025' },
    { titre: 'Algorithmique - Épreuve de session', type: 'Épreuve de session', filiere: 'Génie Informatique', module: 'Algorithmique', niveau: 'Licence 1', semestre: 'Semestre 2', annee: '2024 - 2025' },
    { titre: 'Base de données - Devoir 2', type: 'Devoir', filiere: 'Réseaux et systèmes', module: 'Base de données', niveau: 'Licence 2', semestre: 'Semestre 2', annee: '2023 - 2024' },
    { titre: 'Mathématiques appliquées - Devoir 1', type: 'Devoir', filiere: 'Génie Informatique', module: 'Mathématiques appliquées', niveau: 'Licence 1', semestre: 'Semestre 1', annee: '2024 - 2025', fichier: '/fichiers/exemple.pdf' }
  ];

  // Modules à proposer selon la filière choisie
  modules(): string[] {
    return this.modulesParFiliere[this.filiere] ?? [];
  }

  changerFiliere(valeur: string) {
    this.filiere = valeur;
    this.module = 'Tous';
  }

  resultats() {
    const texte = this.recherche.trim().toLowerCase();
    return this.archives.filter(a =>
      a.titre.toLowerCase().includes(texte) &&
      (this.ongletActif === 'Tous' || a.type === this.ongletActif) &&
      (this.filiere === 'Toutes' || a.filiere === this.filiere) &&
      (this.module === 'Tous' || a.module === this.module) &&
      (this.niveau === 'Tous' || a.niveau === this.niveau) &&
      (this.annee === 'Toutes' || a.annee === this.annee)
    );
  }
}