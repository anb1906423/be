const { ObjectId } = require("mongodb");

class ProductService {
	constructor(productId, client) {
		// this.productId = ObjectId.isValid(productId) ? new ObjectId(productId) : null;
		this.Product = client.db().collection("cars");
	}

	async deleteAllProducts() {
		const result = await this.Product.deleteMany({
			productId: this.productId,
		});
		return result.deletedCount;
	}
}

module.exports = ProductService;
