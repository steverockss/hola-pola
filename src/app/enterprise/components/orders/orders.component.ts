import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { OrderService } from "app/core/services/order.service";
import { OrderStatus } from "app/core/enums/orderStatus";
import Swal from "sweetalert2";
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {
  orders;
  OrderStatus = OrderStatus;
  page = 1;
  pageSize = 4;
  collectionSize = 10;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getBuyerOrders();
  }
  getBuyerOrders() {
    this.orderService.getOrder().subscribe((data) => {
      this.orders = data;
    });
  }
  cancelOrder(orderId) {
    let order = {
      id: orderId,
      status: OrderStatus.Cancelado,
    };
    Swal.fire({
      title: "Estas seguro que quieres cancelar tu pedido?",
      text: "Una vez cancelado no podras revertir está acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar pedido",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.editOrder(order).subscribe(() => {
          Swal.fire("Cancelado!", "Pedido cancelado.", "success");
          this.getBuyerOrders();
        });
      }
    });
  }
  async updateOrderState(actualOrder) {
    let status = ""
    let totalCost = actualOrder.totalCost;
    let shippingCost = actualOrder.shippingCost;
    switch (actualOrder.status) {
      case OrderStatus.Creado: {
        status = OrderStatus.Aprobado;
        const { value: formValues } = await Swal.fire({
          html:
          '<div><label class="px-2">Costo de envio </label><input type="number" id="swal-input1" value="'+actualOrder.shippingCost+'" required class="swal2-input"></div>' +
          '<div><label class="px-2">Costo total </label><input type="number" id="swal-input2" value="'+actualOrder.totalCost+'" required class="swal2-input"></div>'+
          '<input type="hidden" id="shipping" value="'+actualOrder.shippingCost+'"></input>'+
          '<input type="hidden" id="total" value="'+actualOrder.totalCost+'"></input>',
          focusConfirm: false,
          onOpen: () => {
            const input = Swal.getInput
          },
          inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!'
            }
          },
          preConfirm: () => {
            if ((<HTMLInputElement>document.getElementById("swal-input1")).value) {
              if((<HTMLInputElement>document.getElementById("swal-input2")).value){
                var finalTotal = parseFloat((<HTMLInputElement>document.getElementById("swal-input2")).value);
                var finalShippingCost = parseFloat((<HTMLInputElement>document.getElementById("swal-input1")).value);
                var total = parseFloat((<HTMLInputElement>document.getElementById("total")).value);
                var shippingCost = parseFloat((<HTMLInputElement>document.getElementById("shipping")).value);
                var topValue = total+(finalShippingCost-shippingCost);
                if(finalTotal> topValue){
                  Swal.showValidationMessage('El total debe ser menor o igual a '+(total-shippingCost)+' + costo de envío')
                }
                return [
                  finalShippingCost,
                  finalTotal,
                ];
              }
              else{
                Swal.showValidationMessage('Debe especificarse el costo total')   
              }
           } else {
            Swal.showValidationMessage('Debe especificarse el costo final de envío')   
           }
          },
        });
        totalCost = formValues[1];
        shippingCost = formValues[0];    
        break;
      }
      case OrderStatus.Aprobado: {
        status = OrderStatus.Enviando;
        break;
      }
      case OrderStatus.Enviando :{
        status = OrderStatus.Finalizado;
        break;
      }
      default: {
        break;
      }
    }
    let order = {
      id: actualOrder.id,
      status: status,
      totalCost: totalCost,
      shippingCost: shippingCost
    };
    Swal.fire({
      title: "Estas seguro que quieres actualizar el estado del pedido?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar estado del pedido",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.editOrder(order).subscribe(() => {
          Swal.fire("Actualizado!", "Pedido actualizado.", "success");
          this.getBuyerOrders();
        });
      }
    });
  }
}
