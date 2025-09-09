import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-pannel',
  imports: [RouterLink],
  templateUrl: './admin-pannel.component.html',
  styleUrl: './admin-pannel.component.scss',
})
export class AdminPannelComponent {
  @Input() activePage = '';
}
