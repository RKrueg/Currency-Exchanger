export default class ConversionService {  
  static getCurrency(usd) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, usd]);
        } else {
          reject([this, response, usd]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}