import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest } from "ngx-paypal";
declare var $: any;

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  public payPalConfig: any;
  public showPaypalButtons: any;

  paymentValue: any
  eurPaymentValue:string = '0.00'

  paymentErrorMessage = ''
  paymentSuccessMessage = ''

  constructor() { }

 ngOnInit() {}

  pay() {
    this.showPaypalButtons = true;
  }

  back(){
    this.showPaypalButtons = false;
  }

  onClearModalData(){
    this.eurPaymentValue = ''
    this.paymentValue = 0
    this.paymentErrorMessage = ''
    this.paymentSuccessMessage = ''
  }

  onChangePaymentValue(){
    this.eurPaymentValue = ((this.paymentValue / 4.95).toFixed(2)).toString() 
    this.payPalConfig = {
      currency: "EUR",
      clientId: "AVhHIwu1OhSHeAxnJrD_9g2KcwFe7bzjoqlE3TUc_suXZsm2OMy_gcK2gqLPLVNXK3Ji_UEkC45WkFUO",
      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: this.eurPaymentValue,
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: this.eurPaymentValue
                  }
                }
              },
              items: [
                {
                  name: "Enterprise Subscription",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "EUR",
                    value: this.eurPaymentValue
                  }
                }
              ]
            }
          ]
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data:any, actions:any) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: (data: any) => {
        this.paymentSuccessMessage = "Felicitări, tocmai ai efectuat tranzacția cu succes! Îți mulțumim pentru sprijinul acordat!"
        setTimeout(()=> {
          this.onClearModalData()
          $('#paymentModal').modal('hide');
        }, 3000)
        // console.log(
        //   "onClientAuthorization - you should probably inform your server about completed transaction at this point",
        //   data
        // );
      },
      onCancel: (data:any, actions:any) => {
        this.paymentErrorMessage = "Ne pare râu, dar tranzacția a fost anulată!"
        // console.log("OnCancel", data, actions);
      },
      onError: (err: any) => {
        this.paymentErrorMessage = "Ne pare râu, dar a apărut o eroare!"
        // console.log("OnError", err);
      },
      onClick: (data: any, actions: any) => {
        // console.log("onClick", data, actions);
      }
    };
  }
}
