import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3939/api/inventory';

  getInventory() {
    return this.http.get(`${this.baseUrl}`, { withCredentials: true });
  }

  addItem(item: any) {
    return this.http.post(`${this.baseUrl}/add`, item, { withCredentials: true });
  }

  updateItem(id: string, item: any) {
    return this.http.put(`${this.baseUrl}/update/${id}`, item, { withCredentials: true });
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { withCredentials: true });
  }

  getItem(id: string){
    return this.http.get(`${this.baseUrl}/item/${id}`, { withCredentials: true });
  }

  filterItems(name: string, category: string, minPrice: number, maxPrice: number){
    const params: any = {};
    // const params: {name?: string, category?: string, maxPrice?: number, minPrice?: number} = {};
    if(name) params.name = name;
    if(category) params.category = category;
    if(maxPrice) params.maxPrice = maxPrice;
    if(minPrice) params.minPrice = minPrice;
    return this.http.get(`${this.baseUrl}/search`, { params, withCredentials: true });
  }

}
