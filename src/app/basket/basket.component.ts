import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/local-storage.service';
import { Basket } from '../shared/basket';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../shared/order';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket: Basket[] = [];
  minPrice = 10;
  deliveryPrice = 5;

  constructor(
    public storage: LocalStorageService,
    private store: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.storage.basket.subscribe((value) => {
      this.basket = value;
    });
  }

  calcTotal() {
    return this.basket.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.amount * currentValue.price;
    }, 0);
  }

  calcFinalTotal() {
    return this.calcTotal() + this.deliveryPrice;
  }

  formatToCurrency(num: number) {
    return (Math.round(num * 100) / 100).toFixed(2) + ' €';
  }

  sendOrder() {
    const basket = this.basket;
    const order: Order = { basket, status: 'open' };
    this.store
      .collection('orders')
      .add(order)
      .then(() => {
        this.storage.save([]);
        alert('Der Auftrag wurde nun in eine Bestellung umgewandelt!');
      });
  }
}
