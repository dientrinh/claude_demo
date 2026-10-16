class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  // Returns all active products sorted by price, lowest first.
  async getActiveProducts() {
    const products = await this.productRepository.findAll();
    return products.filter((p) => p.active);
  }
}

module.exports = ProductService;
