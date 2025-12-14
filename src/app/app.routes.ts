import { Routes } from '@angular/router'
import { BoxListComponent } from './shared/ui/box-list/box-list.component'
import { SearchComponent } from './shared/ui/search/search.component'
import { TableComponent } from './shared/ui/table/table.component'

export const routes: Routes = [
  { path: '', component: TableComponent },
	{ path: 'search', component: SearchComponent },
  { path: 'table', component: TableComponent },
  { path: 'boxes', component: BoxListComponent },
  { path: '**', redirectTo: '/' }
];
