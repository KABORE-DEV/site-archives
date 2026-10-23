import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Donnees } from '../../services/donnees';

@Component({
  selector: 'app-programme',
  imports: [FormsModule],
  templateUrl: './programme.html',
  styleUrl: './programme.css'
})
export class Programme {
  dossierActif = 'genie-informatique';
  niveauActif = 'Licence 1';
  semestreActif = 'Semestre 1';
  photoAbsente = false;

  constructor(public donnees: Donnees) {}

  get filieres() {
    return this.donnees.filieres;
  }

  get niveaux() {
    return this.donnees.niveaux;
  }

  semestres(): string[] {
    return this.donnees.semestresDe(this.niveauActif);
  }

  changerNiveau(niveau: string) {
    this.niveauActif = niveau;
    this.semestreActif = this.semestres()[0] ?? '';
  }

  // Programme ajouté par l'admin, sinon photo du dossier public/programmes
  photoDuSemestre(): string {
    return this.donnees.urlProgramme(this.dossierActif, this.semestreActif);
  }
}
