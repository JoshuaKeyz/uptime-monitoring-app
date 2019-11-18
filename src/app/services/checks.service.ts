import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {
  
  constructor(private httpClient: HttpClient) { }
}