import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { ViewProductComponent } from '../../commons/view-product/view-product.component';

//JavaScript Functions
declare const custom:any;
declare const main:any;
declare const parallaxie: any;
declare const $;

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss']
})
export class DisplayProductsComponent implements OnInit {

  constructor(
    private shopsApiCalls: ShopApiCallsService,
    private productsApiCalls: ProductsApiCallsService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }
  featuredShops = [];
  industries = [];
  isProcessingShopInfo = false;
  hasTopTrendingProducts = false;
  isProcessingFeaturedShops: boolean;


    //Call JavaScript functions onload
    onload(){
      custom();
      main();
      parallaxie();
    }
  ngOnInit(): void {
    this.getIndustries()
    this.getFeaturedShops({});

    $('#flip').on("click",function(){
      $("#panel").slideToggle("slow");
    });

    $('.search_btn').on("click",function(){
      $("#search_body_collapse").slideToggle("slow");

    });
    this.onload();
  }

  ngAfterViewInit(): void {

    this.route.params.subscribe(param => {
      if(param['pageSec']){
      let section = document.querySelector('#silas');
      //const section = this.container.nativeElement.querySelector(`#${param.pageSec}`)
      //console.log(section)

      section?.scrollIntoView();
      }
    })

  }
openDialog(item) {
  this.dialog.open(ViewProductComponent, {

    data: {
      item: item,
    },
  });
}

getFeaturedShops({ }) {
  this.isProcessingFeaturedShops = true;
  this.shopsApiCalls.getFeaturedShops({}, (error, result) => {
    this.isProcessingFeaturedShops = false;
    if (result !== null) {
      this.featuredShops = result.results;
      //console.log("this.featuredShops-->"+ JSON.stringify(this.featuredShops));
    }
  });
}

getIndustries() {
  this.shopsApiCalls.getIndustries((error, result) => {
    this.industries = result;
    //console.log("this.industries "+ JSON.stringify(this.industries) );
  });
}
}
