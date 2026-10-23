import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Archive, Donnees } from '../../services/donnees';

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

  constructor(public donnees: Donnees) {}

  // Les modules proposés dépendent de la filière choisie
  modules(): string[] {
    return this.filiere === 'Toutes' ? [] : this.donnees.modulesDeFiliere(this.filiere);
  }

  changerFiliere(valeur: string) {
    this.filiere = valeur;
    this.module = 'Tous';
  }

  resultats(): Archive[] {
    const texte = this.recherche.trim().toLowerCase();
    return this.donnees.archives().filter(a =>
      (a.titre.toLowerCase().includes(texte) || a.module.toLowerCase().includes(texte)) &&
      (this.ongletActif === 'Tous' || a.type === this.ongletActif) &&
      (this.filiere === 'Toutes' || a.filiere === this.filiere) &&
      (this.module === 'Tous' || a.module === this.module) &&
      (this.niveau === 'Tous' || a.niveau === this.niveau) &&
      (this.annee === 'Toutes' || a.annee === this.annee)
    );
  }

  telecharger(a: Archive) {
    this.donnees.enregistrerTelechargement(a.titre, a.fichier);
  }
}
