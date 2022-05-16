import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalStorageService } from '../shared/local-storage.service';
import { Basket } from '../shared/basket';
import { Food } from '../shared/food';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  foods: Food[] = [];

  constructor(
    private firestore: AngularFirestore,
    public storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.firestore
      .collection('foods')
      .valueChanges()
      .subscribe((results: any) => {
        this.foods = results;
      });
  }
}
