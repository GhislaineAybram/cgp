import { Routes } from '@angular/router';
import { LegalComponent } from './features/legal/legal.component';
import { ContactComponent } from './features/contact/contact.component';
import { PrivacyComponent } from './features/privacy/privacy.component';
import { HomepageComponent } from './features/homepage/homepage/homepage.component';
import { AdminComponent } from './features/admin/admin.component';
import { ReceivedComponent } from './features/received/received.component';
import { NewsComponent } from './features/news/news.component';
import { MediasComponent } from './features/medias/medias.component';
import { AdminArticlesComponent } from './features/admin/admin-articles/admin-articles.component';
import { AdminMediasComponent } from './features/admin/admin-medias/admin-medias.component';
import { AdminEventsComponent } from './features/admin/admin-events/admin-events.component';
import { AdminFeedbackComponent } from './features/admin/admin-feedback/admin-feedback.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { authGuard } from './core/guards/auth.gard';
import { AdminLoginComponent } from './features/admin/admin-login/admin-login.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Julien Poudras | CGP Indépendant Meudon (92) - Conseil en Gestion de Patrimoine' },
  { path: 'news', component: NewsComponent, title: 'Actualités Fiscales & Patrimoniales - Julien Poudras CGP' },
  { path: 'medias', component: MediasComponent, title: 'Vidéos & Ressources - Partenaires & Expertise Patrimoniale' },
  { path: 'legal', component: LegalComponent, title: 'Mentions Légales - Julien Poudras CGP' },
  { path: 'privacy', component: PrivacyComponent, title: 'Politique de Confidentialité - Protection des Données' },
  { path: 'contact', component: ContactComponent, title: 'Contactez votre Conseiller en Gestion de Patrimoine Julien Poudras' },
  { path: 'received', component: ReceivedComponent, title: 'Message reçu - Julien Poudras CGP vous recontacte' },
  { 
    path: 'admin/login',
    loadComponent: () => import('./features/admin/admin-login/admin-login.component')
      .then(m => m.AdminLoginComponent),
    title: 'Connexion Administration'
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: '', component: AdminComponent, title: 'Administration' },
      { path: 'articles', component: AdminArticlesComponent, title: 'Gestion des articles' },
      { path: 'medias', component: AdminMediasComponent, title: 'Gestion des médias' },
      { path: 'events', component: AdminEventsComponent, title: 'Gestion des événements' },
      { path: 'feedback', component: AdminFeedbackComponent, title: 'Gestion des témoignages clients' },
    ],
  },
  { path: '**', component: PageNotFoundComponent, title: 'Page non trouvée - Julien Poudras CGP' },
];
