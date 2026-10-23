import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Donnees } from '../../services/donnees';

@Component({
  selector: 'app-ajout-archive',
  imports: [FormsModule],
  templateUrl: './ajout-archive.html',
  styleUrl: './ajout-archive.css'
})
export class AjoutArchive {
  filiere = '';
  niveau = '';
  semestre = '';
  annee = '';
  module = '';
  type = '';
  titre = '';
  description = '';

  fichier: File | null = null;
  erreurFichier = '';
  survol = false;
  erreur = '';
  succes = '';

  readonly extensionsOk = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
  readonly tailleMax = 10 * 1024 * 1024; // 10 Mo

  constructor(public donnees: Donnees, private router: Router) {}

  // Les listes dépendantes
  semestres(): string[] {
    return this.donnees.semestresDe(this.niveau);
  }

  modules(): string[] {
    return this.donnees.modulesDeFiliere(this.filiere, this.niveau);
  }

  changerFiliere(valeur: string) {
    this.filiere = valeur;
    this.module = '';
  }

  changerNiveau(valeur: string) {
    this.niveau = valeur;
    this.semestre = '';
    this.module = '';
  }

  // Le fichier
  choisirFichier(event: Event) {
    const input = event.target as HTMLInputElement;
    this.verifier(input.files?.[0] ?? null);
  }

  deposer(event: DragEvent) {
    event.preventDefault();
    this.survol = false;
    this.verifier(event.dataTransfer?.files?.[0] ?? null);
  }

  survoler(event: DragEvent) {
    event.preventDefault();
    this.survol = true;
  }

  private verifier(f: File | null) {
    this.fichier = null;
    this.erreurFichier = '';
    if (!f) return;

    const extension = f.name.split('.').pop()?.toLowerCase() ?? '';
    if (!this.extensionsOk.includes(extension)) {
      this.erreurFichier = 'Format non accepté (PDF, DOC, DOCX, JPG, PNG).';
      return;
    }
    if (f.size > this.tailleMax) {
      this.erreurFichier = 'Fichier trop lourd (10 Mo maximum).';
      return;
    }
    this.fichier = f;
  }

  retirerFichier() {
    this.fichier = null;
    this.erreurFichier = '';
  }

  // Le formulaire
  ajouter() {
    this.succes = '';

    if (!this.filiere || !this.niveau || !this.semestre || !this.annee ||
        !this.module || !this.type || !this.titre.trim()) {
      this.erreur = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    if (!this.fichier) {
      this.erreur = 'Veuillez ajouter un fichier.';
      return;
    }

    this.erreur = '';
    // Sans serveur, le fichier reste en mémoire jusqu'au rechargement de la page.
    // Avec l'API, il sera envoyé au back-end ici.
    this.donnees.ajouterArchive({
      titre: this.titre.trim(),
      type: this.type,
      filiere: this.filiere,
      module: this.module,
      niveau: this.niveau,
      semestre: this.semestre,
      annee: this.annee,
      fichier: URL.createObjectURL(this.fichier)
    });
    this.succes = 'Archive ajoutée. Elle apparaît maintenant dans la recherche.';
    this.reinitialiser();
  }

  annuler() {
    this.router.navigate(['/tableau-de-bord']);
  }

  private reinitialiser() {
    this.filiere = '';
    this.niveau = '';
    this.semestre = '';
    this.annee = '';
    this.module = '';
    this.type = '';
    this.titre = '';
    this.description = '';
    this.fichier = null;
    this.erreurFichier = '';
  }
}
