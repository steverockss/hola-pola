import { Component, OnInit } from '@angular/core';
import {SellerService} from '../../core/services/seller.service'
import {Seller} from 'app/core/models/seller.model'
import {Router} from "@angular/router"
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  sellers: Seller[]
  constructor(private sellerService: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.sellerService.getSellers().subscribe(
      data =>{
        this.sellers = data;
        console.log(this.sellers)
      }
    )

  }

  selectedSeller(value){
    this.sellerService.selectedSellerDocumentNumber(value)
    this.router.navigate(['/products',value])
  }

}
