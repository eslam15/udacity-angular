import { Component, OnInit } from '@angular/core';
import { PaymentInterface } from 'src/app/interfaces/payment.interface';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  paymentDetails: PaymentInterface = { name: '', total: 0 };

  constructor() {}

  ngOnInit(): void {
    this.paymentDetails = JSON.parse(localStorage.getItem('paymentDetails')!);
  }

  clearPaymentDetails() {
    localStorage.setItem('paymentDetails', JSON.stringify({}));
  }
}
