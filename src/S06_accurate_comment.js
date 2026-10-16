class ProductQueryService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Returns all active products sorted by price, lowest first.
   */
  async getActiveProductsByPrice() {
    const products = await this.productRepository.findAll();
    return products
      .filter((p) => p.active)
      .sort((a, b) => a.price - b.price);
  }
}

module.exports = ProductQueryService;
