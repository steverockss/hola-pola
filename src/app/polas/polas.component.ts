import { Component, OnInit } from "@angular/core";
import { Pola } from "app/core/models/pola";
import { PolaItem } from "app/core/models/polaItem";
import swal from "sweetalert2";
@Component({
  selector: "app-polas",
  templateUrl: "./polas.component.html",
  styleUrls: ["./polas.component.css"],
})
export class PolasComponent implements OnInit {
  polas: Pola[];
  constructor( ) {}

  ngOnInit(): void {
    sessionStorage.setItem("cart", JSON.stringify(this.polas));
    this.listPolas();
    
  }

  listPolas() {

    this.polas = [
      {
        name: "Carmela",
        estilo: "Brown Ale",
        alcohol: 5,
        nivel_amargor: 30,
        amargor: "Medio",
        casa: "Chelarte",
        maridaje: "Carnes rojas y postres con caramelo",
        image: "./assets/img/polas/carmela-chelarte.png",
      },
      {
        name: "Agua Lunar",
        estilo: "Cream Ale",
        alcohol: 5,
        nivel_amargor: 4.8,
        amargor: "Bajo",
        casa: "Wicca",
        maridaje: "Platos asiáticos",
        image: "./assets/img/polas/Wicca-agualunar.png",
      },
      {
        name: "Pamela",
        estilo: "Summer Ale",
        alcohol: 4.8,
        nivel_amargor: 27,
        amargor: "Bajo",
        casa: "Chelarte",
        maridaje: "Pastas y pescados",
        image: "./assets/img/polas/Pamela_chelarte.png",
      },
      {
        name: "Raquel",
        estilo: "Pale Ale",
        alcohol: 5,
        nivel_amargor: 33,
        amargor: "Medio",
        casa: "Chelarte",
        maridaje: "Hamburguesa y carnes a la parrila",
        image: "./assets/img/polas/raquel-chelarte.png",
      },
      {
        name: "Locura colectiva",
        estilo: "Ale",
        alcohol: 5,
        nivel_amargor: 4.8,
        amargor: "Medio",
        casa: "Wicca",
        maridaje: "Queso Azul",
        image: "./assets/img/polas/wicca-locura-colectiva.png",
      },
      {
        name: "Naari",
        estilo: "Pale Ale",
        alcohol: 6.1,
        nivel_amargor: 27,
        amargor: "Bajo",
        casa: "Chelarte",
        maridaje: "Comida picante",
        image: "./assets/img/polas/naari-chelarte.png",
      },
      {
        name: "Sangre de mis enemigos ",
        estilo: "Red Ale",
        alcohol: 5,
        nivel_amargor: 33,
        amargor: "Medio",
        casa: "Wicca",
        maridaje: "Queso Azul",
        image: "./assets/img/polas/Wicca-sangre.png",
      },
      {
        name: "La Roja",
        estilo: "IPA",
        alcohol: 5.5,
        nivel_amargor: 57.5,
        amargor: "Medio",
        casa: "La Roja",
        maridaje: "Crema catalana y queso suave",
        image: "./assets/img/polas/LaRoja.png",
      },
      {
        name: "La Noctambula",
        estilo: "Stout",
        alcohol: 5,
        nivel_amargor: 32,
        amargor: "Bajo-Medio",
        casa: "Hakuna",
        maridaje: "Postres de chocolate",
        image: "./assets/img/polas/Noctámbula_Hakuna.png",
      },
      {
        name: "Apache",
        estilo: "Stout",
        alcohol: 5,
        nivel_amargor: 60,
        amargor: "Alto",
        casa: "Apache",
        maridaje: "Estofados",
        image: "./assets/img/polas/Apache-stout.png",
      },
      {
        name: "Finca",
        estilo: "IPA",
        alcohol: 4.8,
        nivel_amargor: 50,
        amargor: "Alto",
        casa: "Kalima",
        maridaje: "Pasas y pescados",
        image: "./assets/img/polas/Kalimaok.png",
      },
      {
        name: "Apache",
        estilo: "IPA",
        alcohol: 5,
        nivel_amargor: 27,
        amargor: "Bajo",
        casa: "Apache",
        maridaje: "Queso azul",
        image: "./assets/img/polas/apache.png",
      },
      {
        name: "Ancas de Rana",
        estilo: "IPA",
        alcohol: 6,
        nivel_amargor: 49,
        amargor: "Bajo",
        casa: "Wicca",
        maridaje: "Ceviches",
        image: "./assets/img/polas/Wicca-ancas.png",
      },
      {
        name: "Zenaida",
        estilo: "Oat meal Stout",
        alcohol: 5,
        nivel_amargor: 32,
        amargor: "Bajo-Medio",
        casa: "Chelarte",
        maridaje: "Cordero y postres de chocolate y/o frutos rojos.",
        image: "./assets/img/polas/zenaida-chelarte.png",
      },
      {
        name: "La Trocha",
        estilo: "IPA",
        alcohol: 5.6,
        nivel_amargor: 57.5,
        amargor: "Medio",
        casa: "La trocha",
        maridaje: "Crema catalana y queso suave",
        image: "./assets/img/polas/LaTrocha.png",
      },
      {
        name: "India",
        estilo: "IPA",
        alcohol: 6.5,
        nivel_amargor: 66,
        amargor: "Medio",
        casa: "Hakuna",
        maridaje: "Queso tipo Gorgonzola",
        image: "./assets/img/polas/India_Hakuna_png.png",
      },
      {
        name: "Débora",
        estilo: "Double IPA",
        alcohol: 8,
        nivel_amargor: 102,
        amargor: "Medio",
        casa: "Chelarte",
        maridaje: "Tocineta y carnes curadas",
        image: "./assets/img/polas/debora-chelarte.png",
      },
    ];
  }
  addToCart(pola: Pola) {
    console.log(pola);
    let polaI = new PolaItem(pola, 1, 2000);
    let cart = sessionStorage.getItem('cart')
    if(cart === 'undefined'){
      let  polas_carrito : PolaItem[] = []
      polas_carrito.push(polaI)
      sessionStorage.setItem("cart", JSON.stringify(polas_carrito));
    }else{
    let  polas_carrito = JSON.parse(sessionStorage.getItem('cart'))
    polas_carrito.push(polaI)
    sessionStorage.setItem("cart", JSON.stringify(polas_carrito));
    }
    swal.fire({
      title: `Producto agregado al carrito de compras.`,
      width: 600,
      padding: `3em`,
      imageUrl: `https://icons-for-free.com/iconfiles/png/512/cart+checked+ecommerce+online+shopping+shopping+cart+icon-1320165952137863404.png`,
      imageWidth: 200,
      imageHeight: 200,
      timer: 5000,
      backdrop: `
        rgba(0,0,123,0.4)
        no-repeat
        `,
    });
  }
}
