const AppLog = require('../util/appLog');

class EmailRetryService {
  constructor(mailSender) {
    this.mailSender = mailSender;
  }

  // Retries sending the email up to 3 times before giving up.
  async sendWithRetry(to, body) {
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        await this.mailSender.send(to, body);
        return true;
      } catch (err) {
        AppLog.warn('mail.retry', attempt);
      }
    }
    return false;
  }
}

module.exports = EmailRetryService;
