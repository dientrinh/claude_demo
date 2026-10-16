const AppLog = require('../util/appLog');
const Result = require('../util/result');

class PaymentService {
  constructor(gateway) {
    this.gateway = gateway;
  }

  // Project convention: all logging goes through AppLog, never console or winston directly.
  async charge(accountId, amount) {
    AppLog.info('payment.charge.start', accountId);
    const receipt = await this.gateway.charge(accountId, amount);
    AppLog.info('payment.charge.done', receipt.id);
    return Result.success(receipt);
  }
}

module.exports = PaymentService;
