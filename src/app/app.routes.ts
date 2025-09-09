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

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'news', component: NewsComponent },
  { path: 'medias', component: MediasComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'received', component: ReceivedComponent },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent },
      { path: 'articles', component: AdminArticlesComponent },
      { path: 'medias', component: AdminMediasComponent },
      { path: 'events', component: AdminEventsComponent },
      { path: 'feedback', component: AdminFeedbackComponent },
    ],
  },
];
