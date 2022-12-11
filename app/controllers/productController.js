const Product = require('../model/Product')
const { BadRequestError } = require('../api-error')
const handlePromise = require('../helpers/promise.helper')

const getProduct = async (req, res) => {
    if (!req?.params?.name) return res.status(400).json({ "message": 'Product name required' });
    const product = await Product.findOne({ name: req.params.name }).exec();
    if (!product) {
        return res.status(204).json({ 'message': `User ID ${req.params.name} not found` });
    }
    res.json(product);
}

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    if (!products) return res.status(204).json({ 'message': 'No product found' });
    res.json(products);
}

const deleteProducts = async (req, res) => {
    if (req?.body?.isDeleteAll == true) {
        const [error, data] = await handlePromise(
            Product.deleteMany({})
        )
        if (error) {
            return next(new BadRequestError(500,
                'Đã xảy ra lỗi khi xóa tất cả xe!'))
        }

        return res.send({
            message: `Đã xóa thành công tất cả(${data.deletedCount}) xe!`,
        })
    }
    if (!req?.body?.id) return res.status(400).json({ "message": 'Product id required' });
    const product = await Product.findOne({ _id: req.body.id }).exec();
    if (!product) {
        return res.status(400).json({ 'message': `Product ID ${req.body.id} not found` });
    }
    const result = await product.deleteOne({ _id: req.body.id });
    res.json(result);
}


module.exports = { getProduct, getAllProducts, deleteProducts };