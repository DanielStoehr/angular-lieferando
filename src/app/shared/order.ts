import { Basket } from './basket';

export interface Order {
  basket: Basket[];
  status: string;
}
