import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PredictService } from 'src/services/predict.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sentimental-analyzer';
  isPositive = false;
  isNegative = false;
  isNeutral = false;
  isSearch = false;
  value = 0.6;

  searchForm = new FormGroup({
    searchInput: new FormControl(''),
  });

  constructor(
    private predictionService: PredictService,
    private snackBar: MatSnackBar
  ) {}

  onSearchClick() {
    this.isPositive = false;
    this.isNegative = false;
    this.isNeutral = false;
    const input_data = this.searchForm.controls.searchInput.value;
    this.searchForm.controls.searchInput.setValue(null);
    // request to end point
    this.isSearch = true;
    if (input_data) {
      this.predictionService.getPrediction(input_data).subscribe((data) => {
        console.log(data);
        if (data.prediction === 'negative') {
          this.isNegative = true;
        } else if (data.prediction === 'positive') {
          this.isPositive = true;
        } else {
          this.isNeutral = true;
        }
      });
    } else {
      this.snackBar.open("It's an empty search!", 'Close');
    }
  }
}
