import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.scss'],
})
export class ModalSuccessComponent {
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
