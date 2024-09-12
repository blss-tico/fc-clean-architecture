//private _id: string;
//private _name: string;
//private _price: number;

export interface InputCreateProductDto {
  type: string;
  name: string;  
  price: number;
}

export interface OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}
