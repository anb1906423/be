const PriceTable = require('../model/PriceTable')
const { BadRequestError } = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')

const handleNewPriceTable = async (req, res) => {
    const { nameCar, srcCar, version, price } = req.body
    // if (!name || !type || !src || !href || !price || !description) return res.status(400).json({ 'message': 'Tên, loại, nguồn ảnh, đường dẫn, giá và mô tả không được để trống!' })

    const foundPriceTable = await PriceTable.findOne({ nameCar: nameCar }).exec()
    if (foundPriceTable) {
        return res.status(422).send({ message: `Bảng ${nameCar} đã tồn tại!` })
    }

    try {
        const result = await PriceTable.create({
            "nameCar": nameCar,
            "srcCar": srcCar,
            "version": version,
            "price": price,
        })
        console.log(result);
        res.status(201).send({ message: `New pricetable ${nameCar} created successfully!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const getAllPriceTable = async (req, res) => {
    const priceTable = await PriceTable.find();
    if (!priceTable) return res.status(204).json({ 'message': 'No pricetable found' });
    res.json(priceTable);
}

const deletePriceTable = async (req, res) => {
    if (req?.body?.isDeleteAll == true) {
        const [error, data] = await handlePromise(
            PriceTable.deleteMany({})
        )
        if (error) {
            return next(new BadRequestError(500,
                'Đã xảy ra lỗi khi xóa tất cả bảng giá!'))
        }

        return res.send({
            message: `Đã xóa thành công tất cả(${data.deletedCount}) bảng giá!`,
        })
    }
    if (!req?.body?.id) return res.status(400).json({ "message": 'PriceTable id required' });
    const priceTable = await PriceTable.findOne({ _id: req.body.id }).exec();
    if (!priceTable) {
        return res.status(400).json({ 'message': `PriceTable ID ${req.body.id} not found` });
    }
    const result = await priceTable.deleteOne({ _id: req.body.id });
    res.json(result);
}

const updatePriceTable = async (req, res, next) => {
    // if (Object.keys(req.body).length === 0) {
    //     return next(new BadRequestError(400,
    //         'Dữ liệu không được để trống!'))
    // }

    const { id } = req.params
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    }

    const [error, document] = await handlePromise(
        PriceTable.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    )

    if (error) {
        return next(new BadRequestError(500,
            `Đã xảy ra lỗi khi cập nhật thông tin bảng giá id=${req.params.id}`))
    }

    if (!document) {
        return next(new NotFoundError(404,
            'Không tìm thấy bảng giá'))
    }

    return res.send({ message: 'Cập nhật thông tin bảng giá thành công!', })
}

module.exports = { handleNewPriceTable, getAllPriceTable, deletePriceTable, updatePriceTable }