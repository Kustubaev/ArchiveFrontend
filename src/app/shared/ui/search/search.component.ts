// search.component.ts
import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { MOCK_APPLICANTS } from '../../../data/mock-data'
import { normalizePhone } from '../../../utils/normalize-phone'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private router = inject(Router);
  query = '';

  onSearch(): void {
    if (!this.query.trim()) return;
    const inputString = this.query.trim();
    const normalizedQuery = normalizePhone(this.query);

    const results = MOCK_APPLICANTS.filter(item =>
      item.FIO.toLowerCase().includes(inputString.toLowerCase()) ||
      item.Id.toString() === inputString ||
      (normalizedQuery ? normalizePhone(item.Telephone).includes(normalizedQuery) : false)
    );
    // Передаём результаты в таблицу через localStorage или queryParams
    localStorage.setItem('searchResults', JSON.stringify(results));
    this.router.navigate(['/table'], { queryParams: { search: true } });
  }
}