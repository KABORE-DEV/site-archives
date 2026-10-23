import { Injectable, signal } from '@angular/core';
import { Authentification, Role } from './authentification';

export interface Filiere { nom: string; dossier: string; }
export interface Module { id: number; nom: string; filiere: string; niveau: string; semestre: string; credits: number; }
export interface Archive {
  id: number; titre: string; type: string; filiere: string; module: string;
  niveau: string; semestre: string; annee: string; date: string; fichier: string;
}
export interface Compte { id: number; prenom: string; nom: string; identifiant: string; role: Role; actif: boolean; }
export interface Telechargement { titre: string; fichier: string; date: string; }

const FICHIER_EXEMPLE = '/fichiers/exemple.pdf';

const MODULES_INIT: Module[] = [
  { id: 1, nom: 'Mathématiques appliquées', filiere: 'Génie Informatique', niveau: 'Licence 1', semestre: 'Semestre 1', credits: 6 },
  { id: 2, nom: "Introduction à l'informatique", filiere: 'Génie Informatique', niveau: 'Licence 1', semestre: 'Semestre 1', credits: 6 },
  { id: 3, nom: 'Algorithmique', filiere: 'Génie Informatique', niveau: 'Licence 1', semestre: 'Semestre 2', credits: 6 },
  { id: 4, nom: 'Base de données', filiere: 'Réseaux et systèmes', niveau: 'Licence 2', semestre: 'Semestre 3', credits: 6 },
  { id: 5, nom: 'Systèmes d’exploitation', filiere: 'Réseaux et systèmes', niveau: 'Licence 2', semestre: 'Semestre 4', credits: 6 },
  { id: 6, nom: 'Réseaux', filiere: 'Réseaux et télécommunications', niveau: 'Licence 1', semestre: 'Semestre 1', credits: 6 },
  { id: 7, nom: 'Télécommunications', filiere: 'Réseaux et télécommunications', niveau: 'Licence 1', semestre: 'Semestre 2', credits: 6 },
  { id: 8, nom: 'Électricité générale', filiere: 'Électricité industrielle', niveau: 'Licence 1', semestre: 'Semestre 1', credits: 6 },
  { id: 9, nom: 'Électronique de base', filiere: 'Électronique, électrotechnique et automatisme', niveau: 'Licence 1', semestre: 'Semestre 1', credits: 6 }
];

const ARCHIVES_INIT: Archive[] = [
  { id: 1, titre: 'Mathématiques appliquées - Devoir 1', type: 'Devoir', filiere: 'Génie Informatique', module: 'Mathématiques appliquées', niveau: 'Licence 1', semestre: 'Semestre 1', annee: '2024 - 2025', date: '15 sept. 2024', fichier: FICHIER_EXEMPLE },
  { id: 2, titre: "Introduction à l'informatique - Test", type: 'Test', filiere: 'Génie Informatique', module: "Introduction à l'informatique", niveau: 'Licence 1', semestre: 'Semestre 1', annee: '2024 - 2025', date: '10 oct. 2024', fichier: FICHIER_EXEMPLE },
  { id: 3, titre: 'Algorithmique - Épreuve de session', type: 'Épreuve de session', filiere: 'Génie Informatique', module: 'Algorithmique', niveau: 'Licence 1', semestre: 'Semestre 2', annee: '2024 - 2025', date: '20 févr. 2025', fichier: FICHIER_EXEMPLE },
  { id: 4, titre: 'Base de données - Devoir 2', type: 'Devoir', filiere: 'Réseaux et systèmes', module: 'Base de données', niveau: 'Licence 2', semestre: 'Semestre 3', annee: '2023 - 2024', date: '12 déc. 2023', fichier: FICHIER_EXEMPLE },
  { id: 5, titre: 'Algorithmique - Devoir 1 (structures de données)', type: 'Devoir', filiere: 'Génie Informatique', module: 'Algorithmique', niveau: 'Licence 1', semestre: 'Semestre 2', annee: '2024 - 2025', date: '15 oct. 2024', fichier: FICHIER_EXEMPLE },
  { id: 6, titre: 'Algorithmique - Devoir 2 (algorithmes de tri)', type: 'Devoir', filiere: 'Génie Informatique', module: 'Algorithmique', niveau: 'Licence 1', semestre: 'Semestre 2', annee: '2024 - 2025', date: '28 nov. 2024', fichier: FICHIER_EXEMPLE },
  { id: 7, titre: 'Algorithmique - Test 1 (complexité)', type: 'Test', filiere: 'Génie Informatique', module: 'Algorithmique', niveau: 'Licence 1', semestre: 'Semestre 2', annee: '2024 - 2025', date: '10 janv. 2025', fichier: FICHIER_EXEMPLE }
];

const COMPTES_INIT: Compte[] = [
  { id: 1, prenom: 'Aïssatou', nom: 'Diallo', identifiant: 'etudiant', role: 'etudiant', actif: true },
  { id: 2, prenom: 'Moussa', nom: 'Traoré', identifiant: 'chef.info', role: 'chef', actif: true },
  { id: 3, prenom: 'Fatou', nom: 'Ouattara', identifiant: 'admin', role: 'admin', actif: true },
  { id: 4, prenom: 'Ibrahim', nom: 'Kaboré', identifiant: 'i.kabore', role: 'etudiant', actif: true },
  { id: 5, prenom: 'Aminata', nom: 'Sanogo', identifiant: 'a.sanogo', role: 'etudiant', actif: true }
];

/**
 * Données de l'application, gardées dans le navigateur en attendant l'API.
 * - modules, comptes, téléchargements : conservés dans le navigateur (localStorage)
 * - archives et programmes ajoutés : gardés en mémoire seulement (les fichiers
 *   ne peuvent pas être enregistrés sans serveur), ils disparaissent au rechargement.
 * Quand l'API existera, seules les méthodes de ce service changeront.
 */
@Injectable({ providedIn: 'root' })
export class Donnees {
  readonly filieres: Filiere[] = [
    { nom: 'Génie Informatique', dossier: 'genie-informatique' },
    { nom: 'Réseaux et systèmes', dossier: 'reseaux-systemes' },
    { nom: 'Réseaux et télécommunications', dossier: 'reseaux-telecommunications' },
    { nom: 'Électricité industrielle', dossier: 'electricite-industrielle' },
    { nom: 'Électronique, électrotechnique et automatisme', dossier: 'electronique-electrotechnique-automatisme' }
  ];
  readonly niveaux = ['Licence 1', 'Licence 2', 'Licence 3'];
  readonly semestresParNiveau: Record<string, string[]> = {
    'Licence 1': ['Semestre 1', 'Semestre 2'],
    'Licence 2': ['Semestre 3', 'Semestre 4'],
    'Licence 3': ['Semestre 5', 'Semestre 6']
  };
  readonly types = ['Devoir', 'Test', 'Épreuve de session'];
  readonly annees = ['2024 - 2025', '2023 - 2024'];

  readonly modules = signal<Module[]>(this.lire('modules', MODULES_INIT));
  readonly comptes = signal<Compte[]>(this.lire('comptes', COMPTES_INIT));
  readonly archives = signal<Archive[]>(ARCHIVES_INIT);
  readonly programmes = signal<Record<string, string>>({});
  private readonly historique = signal<Record<string, Telechargement[]>>(this.lire('telechargements', {}));

  constructor(private auth: Authentification) {}

  // ---------- Utilitaires ----------
  private lire<T>(cle: string, defaut: T): T {
    try {
      const texte = localStorage.getItem('donnees.' + cle);
      return texte ? JSON.parse(texte) : defaut;
    } catch {
      return defaut;
    }
  }

  private ecrire(cle: string, valeur: unknown) {
    try {
      localStorage.setItem('donnees.' + cle, JSON.stringify(valeur));
    } catch {
      /* stockage plein ou bloqué : on ignore */
    }
  }

  private prochainId(liste: { id: number }[]): number {
    return liste.reduce((max, x) => Math.max(max, x.id), 0) + 1;
  }

  private aujourdhui(): string {
    return new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  semestresDe(niveau: string): string[] {
    return this.semestresParNiveau[niveau] ?? [];
  }

  // ---------- Modules ----------
  modulesDeFiliere(filiere: string, niveau = ''): string[] {
    return this.modules()
      .filter(m => m.filiere === filiere && (!niveau || m.niveau === niveau))
      .map(m => m.nom);
  }

  ajouterModule(m: Omit<Module, 'id'>) {
    const liste = [...this.modules(), { ...m, id: this.prochainId(this.modules()) }];
    this.modules.set(liste);
    this.ecrire('modules', liste);
  }

  supprimerModule(id: number) {
    const liste = this.modules().filter(m => m.id !== id);
    this.modules.set(liste);
    this.ecrire('modules', liste);
  }

  // ---------- Archives ----------
  ajouterArchive(a: Omit<Archive, 'id' | 'date'>) {
    this.archives.set([
      { ...a, id: this.prochainId(this.archives()), date: this.aujourdhui() },
      ...this.archives()
    ]);
  }

  // ---------- Programmes ----------
  private cleProgramme(dossier: string, semestre: string): string {
    return `${dossier}/${semestre.replace('Semestre ', '')}`;
  }

  urlProgramme(dossier: string, semestre: string): string {
    const ajoute = this.programmes()[this.cleProgramme(dossier, semestre)];
    return ajoute ?? `/programmes/${dossier}/semestre-${semestre.replace('Semestre ', '')}.jpg`;
  }

  ajouterProgramme(dossier: string, semestre: string, url: string) {
    this.programmes.set({ ...this.programmes(), [this.cleProgramme(dossier, semestre)]: url });
  }

  // ---------- Comptes ----------
  ajouterCompte(c: Omit<Compte, 'id' | 'actif'>): string {
    const existe = this.comptes().some(x => x.identifiant.toLowerCase() === c.identifiant.toLowerCase());
    if (existe) return 'Cet identifiant est déjà utilisé.';
    const liste = [...this.comptes(), { ...c, id: this.prochainId(this.comptes()), actif: true }];
    this.comptes.set(liste);
    this.ecrire('comptes', liste);
    return '';
  }

  changerRole(id: number, role: Role) {
    const liste = this.comptes().map(c => (c.id === id ? { ...c, role } : c));
    this.comptes.set(liste);
    this.ecrire('comptes', liste);
  }

  basculerActif(id: number) {
    const liste = this.comptes().map(c => (c.id === id ? { ...c, actif: !c.actif } : c));
    this.comptes.set(liste);
    this.ecrire('comptes', liste);
  }

  // ---------- Téléchargements de l'utilisateur connecté ----------
  private cleUtilisateur(): string {
    const u = this.auth.utilisateur();
    return u ? `${u.prenom} ${u.nom}` : '';
  }

  mesTelechargements(): Telechargement[] {
    return this.historique()[this.cleUtilisateur()] ?? [];
  }

  enregistrerTelechargement(titre: string, fichier: string) {
    const cle = this.cleUtilisateur();
    if (!cle) return;
    const deja = (this.historique()[cle] ?? []).filter(t => t.fichier !== fichier || t.titre !== titre);
    const tout = { ...this.historique(), [cle]: [{ titre, fichier, date: this.aujourdhui() }, ...deja] };
    this.historique.set(tout);
    this.ecrire('telechargements', tout);
  }

  viderTelechargements() {
    const tout = { ...this.historique(), [this.cleUtilisateur()]: [] };
    this.historique.set(tout);
    this.ecrire('telechargements', tout);
  }
}
