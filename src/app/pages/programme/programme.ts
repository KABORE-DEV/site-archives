import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-programme',
  imports: [FormsModule],
  templateUrl: './programme.html',
  styleUrl: './programme.css'
})
export class Programme {
  filieres = [
    { nom: 'Génie Informatique', dossier: 'genie-informatique' },
    { nom: 'Réseaux et systèmes', dossier: 'reseaux-systemes' },
    { nom: 'Réseaux et télécommunications', dossier: 'reseaux-telecommunications' },
    { nom: 'Électricité industrielle', dossier: 'electricite-industrielle' },
    { nom: 'Électronique, électrotechnique et automatisme', dossier: 'electronique-electrotechnique-automatisme' }
  ];
  dossierActif = 'genie-informatique';

  niveaux = ['Licence 1', 'Licence 2', 'Licence 3'];
  niveauActif = 'Licence 1';

  semestresParNiveau: Record<string, string[]> = {
    'Licence 1': ['Semestre 1', 'Semestre 2'],
    'Licence 2': ['Semestre 3', 'Semestre 4'],
    'Licence 3': ['Semestre 5', 'Semestre 6']
  };
  semestreActif = 'Semestre 1';

  semestres() {
    return this.semestresParNiveau[this.niveauActif];
  }

  changerNiveau(niveau: string) {
    this.niveauActif = niveau;
    this.semestreActif = this.semestres()[0];
  }

  // Ex : /programmes/genie-informatique/semestre-1.jpg
  photoDuSemestre() {
    const numero = this.semestreActif.split(' ')[1];
    return `/programmes/${this.dossierActif}/semestre-${numero}.jpg`;
  }

  photoAbsente = false;
}