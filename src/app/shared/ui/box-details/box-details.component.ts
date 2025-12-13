// box-details.component.ts
import { Component, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MOCK_BOXES } from '../../../data/mock-boxes'
import { Box } from '../../../interfaces/box.interface'

@Component({
  selector: 'app-box-details',
  standalone: true,
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.scss']
})
export class BoxDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  box: Box | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.box = MOCK_BOXES.find(b => b.id === id) || null;
  }

  goBack(): void {
    this.router.navigate(['/boxes']);
  }
}