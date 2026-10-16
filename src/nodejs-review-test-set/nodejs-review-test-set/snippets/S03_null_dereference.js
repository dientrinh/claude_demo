class NotificationService {
  constructor(mailSender) {
    this.mailSender = mailSender;
    this.customerCache = new Map();
  }

  cacheCustomer(customer) {
    this.customerCache.set(customer.id, customer);
  }

  async sendWelcome(customerId) {
    const customer = this.customerCache.get(customerId);
    const email = customer.email;
    await this.mailSender.send(email, 'Welcome to our store!');
  }
}

module.exports = NotificationService;
