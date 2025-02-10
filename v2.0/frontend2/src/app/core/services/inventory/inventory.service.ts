import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface InventoryItem {
  _id?: string;
  itemName: string;
  category: 'furniture' | 'fashion' | 'electronics' | 'groceries';
  quantity: number;
  price: number;
  userId: string;
  dynamicFields?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = `${environment.apiUrl}/inventory`;

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.apiUrl}`);
  }

  getItem(id: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${id}`);
  }

  createItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(`${this.apiUrl}/create`, item);
  }

  updateItem(id: string, item: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/update/${id}`, item);
  }

  deleteItem(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/delete/${id}`);
  }

  searchItems(searchParams: any): Observable<InventoryItem[]> {
    const queryParams = new URLSearchParams();
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key]) {
        queryParams.append(key, searchParams[key]);
      }
    });

    return this.http.get<InventoryItem[]>(`${this.apiUrl}/search?${queryParams.toString()}`);
  }
}