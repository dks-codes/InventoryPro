import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import ApiResponse, { Item } from '../types/item.type';
import { environment } from '../../environments/environment';
import ApiResponseItem from '../types/item.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  httpClient = inject(HttpClient);

  private API_url = "http://localhost:3939/api/inventory";
  getItemsFromApi(){
    return this.httpClient.get<ApiResponse>(this.API_url);
  }

  getItem(id:string){
    return this.httpClient.get<ApiResponseItem>(this.API_url + '/item/' + id);
  }
  constructor() { }

  updateItem(id:String, item: Item){
    return this.httpClient.put<Item>(this.API_url + '/update/' + id, item);
  }

  addItem(item: Item){
    return this.httpClient.post<Item>(this.API_url + '/add', item)
  }

  deleteItemApi(id: String){
    return this.httpClient.delete<Item>(this.API_url + '/delete/' + id)
  }
  

  filterItems(name?:String, category?:String, minPrice?: Number, maxPrice?: Number): Observable<Item[]>{
    const params: any = {};
    if (name) params.name = name;
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    return this.httpClient.get<Item[]>(`${this.API_url}/search`, { params });
  }
}
