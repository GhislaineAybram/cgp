import { Routes } from '@angular/router';
import { LegalComponent } from './features/legal/legal.component';
import { ContactComponent } from './features/contact/contact.component';
import { PrivacyComponent } from './features/privacy/privacy.component';
import { AboutComponent } from './features/homepage/about/about.component';
import { HomepageComponent } from './features/homepage/homepage/homepage.component';
import { AdminComponent } from './features/admin/admin.component';
import { ReceivedComponent } from './features/received/received.component';
import { TestimonialComponent } from './features/homepage/testimonial/testimonial.component';
import { PillarsComponent } from './features/homepage/pillars/pillars.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent},
    { path: '', component: HomepageComponent},
    { path: 'legal', component: LegalComponent},
    { path: 'privacy', component: PrivacyComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'testimonial', component: TestimonialComponent},
    { path: 'pillars', component: PillarsComponent},
    { path: 'received', component: ReceivedComponent},
    { path: 'admin', component: AdminComponent},
];
