import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface PredictionDTO {
  prediction: string;
}

@Injectable({
  providedIn: 'root',
})
export class PredictService {
  constructor(private http: HttpClient) {}

  getPrediction(data: string): Observable<PredictionDTO> {
    const url = 'http://127.0.0.1:5000/predict';
    const body_data = {
      data,
    };
    return this.http.post<PredictionDTO>(url, body_data);
  }
}
