import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-module',
  imports: [],
  templateUrl: './detail-module.html',
  styleUrl: './detail-module.css'
})
export class DetailModule {
  module = '';
  onglets = ['Devoir', 'Test', 'Épreuve de session'];
  ongletActif = 'Devoir';

  archives = [
    { titre: 'Devoir 1 - Structures de données', type: 'Devoir', module: 'Algorithmique', date: '15 oct. 2024', fichier: '/fichiers/exemple.pdf' },
    { titre: 'Devoir 2 - Algorithmes de tri', type: 'Devoir', module: 'Algorithmique', date: '28 nov. 2024', fichier: '/fichiers/exemple.pdf' },
    { titre: 'Test 1 - Complexité', type: 'Test', module: 'Algorithmique', date: '10 janv. 2025', fichier: '/fichiers/exemple.pdf' },
    { titre: 'Épreuve de session 1', type: 'Épreuve de session', module: 'Algorithmique', date: '20 févr. 2025', fichier: '/fichiers/exemple.pdf' }
  ];

  constructor(route: ActivatedRoute) {
    this.module = route.snapshot.paramMap.get('id') ?? '';
  }

  resultats() {
    return this.archives.filter(a =>
      a.module === this.module && a.type === this.ongletActif
    );
  }
}