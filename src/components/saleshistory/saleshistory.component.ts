import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMPONENTS } from '../../utils/angular-material/angular-material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { formatPrice } from '../../utils/formatMoney/format-price.service';
import { LayoutDashboardComponent } from '../dashboard/layout-options.component';


interface ISalesHistory {
  store_name: string;
  total_billed: number | string;
  quantity_sold: number;
  product_name: string;
  product_image: string;
  user_name: string;
  user_image: string;
}

@Component({
  selector: 'app-saleshistory',
  standalone: true,
  imports: [CommonModule, LayoutDashboardComponent, ...MATERIAL_COMPONENTS],
  templateUrl: './saleshistory.component.html',
  styleUrls: ['./saleshistory.component.scss'],
})
export class SaleshistoryComponent implements OnInit {
  salesHistory: ISalesHistory[] = [];

  constructor(private readonly httpClient: HttpClient) {}

  storeId = localStorage.getItem('store_id');

  ngOnInit(): void {
    this.httpClient
      .get<ISalesHistory[]>(
        `${environment.apiProd}/${environment.salesAll}/${this.storeId}`
      )
      .subscribe((response) => {
        this.salesHistory = response.map((sale) => ({
          ...sale,
          total_billed: formatPrice(sale.total_billed as number),
        }));
      });
  }
}
