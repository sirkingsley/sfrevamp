import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-pop-up',
  templateUrl: './cart-pop-up.component.html',
  styleUrls: ['./cart-pop-up.component.scss']
})
export class CartPopUpComponent implements OnInit {

  isAnimate: true;
   constructor(public dialog: MatDialog) {}
  close(){
      document.getElementsByClassName("animate__animated")[0].classList.remove("animate__slideInLeft")
      document.getElementsByClassName("animate__animated")[0].classList.add("animate__slideOutRight");
      setTimeout(()=>{this.dialog.closeAll();}, 1000);
  }


  ngOnInit(): void {
  }

}
