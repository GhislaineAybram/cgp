import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-pannel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-pannel.component.html',
  styleUrls: [],
})
export class AdminPannelComponent {
  @Input() activePage = '';
}
