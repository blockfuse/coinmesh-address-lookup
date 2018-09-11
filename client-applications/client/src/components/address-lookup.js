import { HttpWrapper } from '../services/http-wrapper';
import { bindable } from 'aurelia-templating';

export class AddressLookup {
  static inject = [HttpWrapper];
  wallet;

  @bindable address = '';
  @bindable showDonate = false;
  balance;

  constructor(wallet) {
    this.wallet = wallet;
  }

  attached() {
    if (this.address) {
      this.doLookup();
    }
  }

  doLookup() {
    this.wallet.post('addresses/getreceivedbyaddress', {
      address: this.address
    }).then(res => {
      console.log(res)
      this.balance = JSON.parse(res.result);
    }).catch(e => {
      console.error(e);
    });
  }
}
