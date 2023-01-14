export default class ConversionService {  
  static getCurrency(userAmount) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/CNH`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, userAmount]);
        } else {
          reject([this, response, userAmount]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}