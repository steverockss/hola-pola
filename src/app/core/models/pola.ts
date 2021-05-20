export class Pola {
  name: string;
  estilo: string;
  alcohol: number;
  nivel_amargor: number;
  amargor: string;
  casa: string;
  maridaje: string;
  image: string;
  price:number;
  constructor(
    name: string,
    estilo: string,
    alcohol: number,
    nivel_amargor: number,
    amargor: string,
    casa: string,
    maridaje: string,
    image: string,
    price: number
  ) {
    this.name = name;
    this.estilo = estilo;
    this.alcohol = alcohol;
    this.nivel_amargor = nivel_amargor;
    this.amargor = amargor;
    this.casa = casa;
    this.maridaje = maridaje;
    this.image = image;
    this.price = price;
  }
}
