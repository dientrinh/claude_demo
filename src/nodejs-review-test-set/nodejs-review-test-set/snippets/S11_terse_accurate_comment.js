const VAT_RATE = 0.1;

class TaxService {
  // calc
  calculateVat(netAmount) {
    return Math.round(netAmount * VAT_RATE * 100) / 100;
  }
}

module.exports = TaxService;
