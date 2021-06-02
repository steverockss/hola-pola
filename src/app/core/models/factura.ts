import { PolaItem } from "./polaItem";
export class Factura {
  codigo: number;
  nombre: string;
  cedula: number;
  telefono: number;
  direccion: string;
  ciudad: string;
  polas: PolaItem[];
  fecha: string;

  constructor(
    codigo: number,
    nombre: string,
    cedula: number,
    telefono: number,
    direccion: string,
    ciudad: string,
    polas: PolaItem[],
    fecha: string
  ) {
      this.codigo = codigo,
      this.nombre = nombre,
      this.cedula = cedula,
      this.telefono = telefono,
      this.direccion = direccion,
      this.ciudad = ciudad,
      this.polas = polas,
      this.fecha = fecha

  }
}
