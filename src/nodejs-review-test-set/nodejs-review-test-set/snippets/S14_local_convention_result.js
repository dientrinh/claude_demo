const AppLog = require('../util/appLog');
const Result = require('../util/result');

class InventoryService {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async reserveStock(productId, quantity) {
    try {
      const remaining = await this.inventoryRepository.decrementStock(productId, quantity);
      return Result.success(remaining);
    } catch (err) {
      AppLog.error('inventory.reserve.failed', productId);
      return Result.failure('STOCK_RESERVE_FAILED');
    }
  }
}

module.exports = InventoryService;
