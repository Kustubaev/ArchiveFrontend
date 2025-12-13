// modal.component.ts
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Applicant } from '../../../interfaces/applicant.interface'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ApplicantModalComponent {
  @Input() applicant: Applicant | null = null;
  @Output() close = new EventEmitter<void>();

    constructor() {}

  ngOnInit(): void {
    document.body.classList.add('modal-open'); // ✅ Блокировка прокрутки
  }

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open'); // ✅ Снятие блокировки
  }
  
  onClose(): void {
    this.close.emit();
  }
}