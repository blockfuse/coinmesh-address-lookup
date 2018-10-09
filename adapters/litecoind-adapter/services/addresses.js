const { JsonRpcRequest, jsonRpcClient } = require('../services/json-rpc');

class AddressesService {
  listReceivedByAddress(minConfirmations = 0, includeEmpty = true, includeWatchOnly = true) {
    let request = {
      method: 'listreceivedbyaddress',
      params: [
        minConfirmations, includeEmpty, includeWatchOnly
      ],
      id: 'listreceivedbyaddress'
    };

    return jsonRpcClient.post(request);
  }

  getNewAddress(accountName = '') {
    let request = {
      method: 'getnewaddress',
      params: [accountName],
      id: 'getnewaddress'
    };

    return jsonRpcClient.post(request);
  }

  importAddress(address, label = 'Watched Addresses', reScan = false) {
	  console.log('-'.repeat(100))
	  console.log('RESCANNING?');
	  console.log(reScan);
    let request = {
      method: 'importaddress',
      params: [
        address, label, false
      ],
      id: 'importaddress'
    };

    return jsonRpcClient.post(request);
  }

  async getReceivedByAddress(address, minConfirmations = 0) {
    try {
      const addresses = await this.listReceivedByAddress();
console.log('='.repeat(100));
console.log(addresses)
      await this.importAddress(address, address);
    } catch (e) {
console.log(e);
     throw new Error(e.message); 
    }

    let request = {
      method: 'getreceivedbyaddress',
      params: [
        address, minConfirmations
      ],
      id: 'getreceivedbyaddress'
    };

    return jsonRpcClient.post(request);
  }

  sendToAddress(targetAddress, amount) {
    let request = {
      method: 'sendtoaddress',
      params: [targetAddress, amount],
      id: 'sendtoaddress'
    };

    return jsonRpcClient.post(request);
  }
}

module.exports = AddressesService;
