import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { OrderService } from "app/core/services/order.service";
import {OrderStatus} from "app/core/enums/orderStatus";
import Swal from "sweetalert2";
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {
  orders;
  OrderStatus = OrderStatus
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
    let order ={
      id : orderId,
      status: OrderStatus.Cancelado
    }
    Swal.fire({
      title: "Estas seguro que quieres cancelar tu pedido?",
      text: "Una vez cancelado no podras revertir está acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar pedido",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.orderService.editOrder(order).subscribe(
          ()=>{
            Swal.fire("Cancelado!", "Pedido cancelado.", "success");
            this.getBuyerOrders()
          }
        )
      }
    });

  }
}
