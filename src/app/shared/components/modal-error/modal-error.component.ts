import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent {
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  close() {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }

  closeOnBackdrop(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
