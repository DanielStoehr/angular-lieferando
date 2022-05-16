import { Injectable } from '@angular/core';
import { Basket } from './basket';
import { BehaviorSubject, Subject } from 'rxjs';
import { Food } from './food';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  basket = new BehaviorSubject<Basket[]>([]);

  constructor() {
    this.load();
  }

  load() {
    const basketAsText = localStorage.getItem('basket');
    if (basketAsText) {
      const basketAsObject = JSON.parse(basketAsText);
      this.basket.next(basketAsObject);
      console.log('storage loaded', basketAsObject);
    }
  }

  save(basket: Basket[]) {
    localStorage.setItem('basket', JSON.stringify(basket));
    this.basket.next(basket);
  }

  add(food: Food) {
    const currentBasket = this.basket.getValue();
    if (currentBasket.find((e) => e.name == food.name)) {
      return alert('Artikel ist bereits im Warenkorb!');
    }
    const newBasket: Basket[] = [
      ...currentBasket,
      { name: food.name, amount: 1, price: food.price },
    ];
    this.save(newBasket);
  }

  delete(index: number) {
    const basket = [...this.basket.getValue()];
    basket.splice(index, 1);
    this.save(basket);
  }

  increase(index: number) {
    const basket = this.basket.getValue();
    const newBasket = basket.map((value, idx) => {
      if (index == idx) {
        return { ...value, amount: value.amount + 1 };
      }
      return value;
    });
    this.save(newBasket);
  }

  decrease(index: number) {
    const basket = this.basket.getValue();
    if (basket[index].amount === 1) {
      return this.delete(index);
    }
    const newBasket = basket.map((value, idx) => {
      if (index == idx) {
        return { ...value, amount: value.amount - 1 };
      }
      return value;
    });
    this.save(newBasket);
  }
}
