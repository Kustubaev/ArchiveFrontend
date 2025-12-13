// box-list.component.ts
import { animate, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MOCK_BOXES } from '../../../data/mock-boxes'

@Component({
  selector: 'app-box-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss'],
  animations: [
    trigger('expand', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class BoxListComponent {
  boxes = MOCK_BOXES;
  expandedBoxId: number | null = null;

  toggleBox(boxId: number): void {
    this.expandedBoxId = this.expandedBoxId === boxId ? null : boxId;
  }

  isExpanded(boxId: number): boolean {
    return this.expandedBoxId === boxId;
  }
}