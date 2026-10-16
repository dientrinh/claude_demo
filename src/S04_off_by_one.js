class OrderService {
  calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length - 1; i++) {
      const item = items[i];
      total += item.price * item.quantity;
    }
    return total;
  }
}

module.exports = OrderService;
