// table.component.ts
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MOCK_APPLICANTS } from '../../../data/mock-data'
import { Applicant, Pagination } from '../../../interfaces/applicant.interface'
import { UniversalTableComponent } from '../universal-table/universal-table.component'

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [UniversalTableComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  applicants: Applicant[] = [];
  pagination: Pagination<Applicant> = {
    current_page: 1,
    data: [],
    last_page: 1,
    per_page: 10,
    total: 0
  };

  columns = [
    { key: 'Id_Archive', title: '№В архиве', sortable: true },
    { key: 'Id', title: '№Лич. дел.', sortable: true },
    { key: 'FIO', title: 'ФИО', sortable: true },
    { key: 'Telephone', title: 'Телефон', sortable: true },
    { key: 'Approval', title: 'Согласие', sortable: true }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const isSearch = this.route.snapshot.queryParams['search'];
    if (isSearch) {
      // Загружаем результаты поиска из localStorage
      const searchResults = localStorage.getItem('searchResults');
      if (searchResults) {
        const data = JSON.parse(searchResults) as Applicant[];
        this.loadSearchResults(data);
      } else {
        this.loadData(); // Если результатов нет, грузим обычные данные
      }
    } else {
      this.loadData();
    }
  }

  loadSearchResults(data: Applicant[]): void {
    this.applicants = data;
    this.pagination = {
      current_page: 1,
      data: data,
      last_page: 1,
      per_page: data.length,
      total: data.length
    };
  }

  loadData(page: number = 1): void {
    const start = (page - 1) * this.pagination.per_page;
    const end = start + this.pagination.per_page;
    const paginatedData = MOCK_APPLICANTS.slice(start, end);

    this.applicants = paginatedData;
    this.pagination = {
      current_page: page,
      data: paginatedData,
      last_page: Math.ceil(MOCK_APPLICANTS.length / this.pagination.per_page),
      per_page: this.pagination.per_page,
      total: MOCK_APPLICANTS.length
    };
  }

  onPageChange(page: number): void {
    this.loadData(page);
  }

  onSort(sort: { key: string; direction: 'asc' | 'desc' }): void {
    const sortedData = [...this.pagination.data].sort((a, b) => {
      const aValue = a[sort.key as keyof Applicant];
      const bValue = b[sort.key as keyof Applicant];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sort.direction === 'asc' ? -1 : 1;
      if (bValue == null) return sort.direction === 'asc' ? 1 : -1;

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    this.pagination.data = sortedData;
    this.applicants = sortedData;
  }

  trackByFn(index: number, item: Applicant): number {
    return item.Id;
  }
}