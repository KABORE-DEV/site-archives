import { Component } from '@angular/core';

@Component({
  selector: 'app-recherche-archives',
  imports: [],
  templateUrl: './recherche-archives.html',
  styleUrl: './recherche-archives.css'
})
export class RechercheArchives {
  resultats = [
    { titre: 'Mathématiques appliquées - Devoir 1', type: 'Devoir', details: 'Licence 1 - Semestre 1 - 2024/2025' },
    { titre: "Introduction à l'informatique - Test", type: 'Test', details: 'Licence 1 - Semestre 1 - 2024/2025' },
    { titre: 'Algorithmique - Épreuve de session', type: 'Épreuve', details: 'Licence 1 - Semestre 2 - 2024/2025' },
    { titre: 'Base de données - Devoir 2', type: 'Devoir', details: 'Licence 1 - Semestre 2 - 2024/2025' }
  ];
}