import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Donnees, Telechargement } from '../../services/donnees';

@Component({
  selector: 'app-mes-documents',
  imports: [RouterLink],
  templateUrl: './mes-documents.html',
  styleUrl: './mes-documents.css'
})
export class MesDocuments {
  constructor(private donnees: Donnees) {}

  liste(): Telechargement[] {
    return this.donnees.mesTelechargements();
  }

  vider() {
    if (confirm('Vider la liste de vos documents téléchargés ?')) {
      this.donnees.viderTelechargements();
    }
  }
}
