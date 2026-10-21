import { Inscription } from './pages/inscription/inscription';import { Routes } from '@angular/router';

import { CadreConnexion } from './cadres/cadre-connexion/cadre-connexion';
import { CadrePrincipal } from './cadres/cadre-principal/cadre-principal';

import { Connexion } from './pages/connexion/connexion';
import { TableauDeBord } from './pages/tableau-de-bord/tableau-de-bord';
import { RechercheArchives } from './pages/recherche-archives/recherche-archives';
import { Programme } from './pages/programme/programme';
import { DetailModule } from './pages/detail-module/detail-module';
import { AjoutArchive } from './pages/ajout-archive/ajout-archive';
import { GestionUtilisateurs } from './pages/gestion-utilisateurs/gestion-utilisateurs';
import { MesDocuments } from './pages/mes-documents/mes-documents';
import { MonProfil } from './pages/mon-profil/mon-profil';

export const routes: Routes = [
  // Pages SANS menu latéral
  {
    path: '',
    component: CadreConnexion,
    children: [
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },
],
  },

  // Pages AVEC menu latéral
  {
    path: '',
    component: CadrePrincipal,
    children: [
      { 
        path: 'tableau-de-bord', 
        component: TableauDeBord 
    },
      { 
        path: 'archives', 
        component: RechercheArchives
     },
      {
         path: 'programme', 
         component: Programme
         },
      { 
        path: 'modules/:id',
         component: DetailModule 
        },
      { 
        path: 'ajout-archive', 
        component: AjoutArchive
     },
      { 
        path: 'utilisateurs', 
        component: GestionUtilisateurs
     },
    { 
      path: 'docs-telecharges', 
      component: MesDocuments 
    },
{ 
  path: 'mon-profil',
   component: MonProfil
   },
    ],
  },

  // Page d'accueil par défaut
  { 
    path: '', redirectTo: 'connexion', 
    pathMatch: 'full' 
},
];