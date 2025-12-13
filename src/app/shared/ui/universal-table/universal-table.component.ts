// universal-table.component.ts
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { Applicant, Pagination } from '../../../interfaces/applicant.interface'
import { ApplicantModalComponent } from '../modal/modal.component'

interface ColumnDef {
  key: string;
  title: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-universal-table',
  standalone: true,
  imports: [CommonModule, ApplicantModalComponent],
  templateUrl: './universal-table.component.html',
  styleUrls: ['./universal-table.component.scss']
})
export class UniversalTableComponent<T extends Record<string, any> = any> implements OnInit, OnChanges {
  @Input() data: T[] = [];
  @Input() columns: ColumnDef[] = [];
  @Input() pagination!: Pagination<T>;

  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<{ key: string; direction: 'asc' | 'desc' }>();

  currentPage = 1;
  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  selectedApplicant: Applicant | null = null;

  ngOnInit(): void {
    if (this.pagination) {
      this.currentPage = this.pagination.current_page;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pagination'] && !changes['pagination'].firstChange) {
      this.currentPage = this.pagination.current_page;
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.pagination.last_page) {
      this.pageChange.emit(page);
    }
  }

  onSort(key: string): void {
    if (!this.sortKey || this.sortKey !== key) {
      this.sortKey = key;
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    this.sortChange.emit({ key, direction: this.sortDirection });
  }

  openDetails(applicant: T): void {
    this.selectedApplicant = applicant as unknown as Applicant;
  }

  closeModal(): void {
    this.selectedApplicant = null;
  }

  trackByFn(index: number, item: T): any {
    return item['Id'] ?? index;
  }

  protected getPagesArray(): number[] {
    const pages = [];
    const totalPages = this.pagination?.last_page || 1;

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}