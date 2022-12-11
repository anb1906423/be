const User = require('../model/User')
const { ApiError } = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')

exports.getAllUser = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No user found' });
    res.json(users);
}

exports.getUser = async (req, res) => {
    if (!req?.params?.fullName) return res.status(400).json({ "message": 'Fullname user required' });
    const user = await User.findOne({ fullName: req.params.fullName }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User fullName ${req.params.fullName} not found` });
    }
    res.json(user);
}

exports.update = async (req, res, next) => {
    // if (Object.keys(req.body).length === 0) {
    //     return next(new ApiError(400,
    //         'Dữ liệu không được để trống!'))
    // }

    const { id, consulted } = req.params
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    }

    const [error, document] = await handlePromise(
        User.findOneAndUpdate(condition, req.body, {
            new: true,
            $set: {
                consulted: req.body.consulted
            }
        })
    )

    if (error) {
        return next(new ApiError(500,
            `Đã xảy ra lỗi khi cập nhật user có id=${req.params.id}`))
    }

    // z

    return res.send({ message: 'Cập nhật user thành công!', })
}

exports.deleteUser = async (req, res) => {
    if (req?.body?.isDeleteAll == true) {
        const [error, data] = await handlePromise(
            User.deleteMany({})
        )
        if (error) {
            return next(new BadRequestError(500,
                'Đã xảy ra lỗi khi xóa tất cả user!'))
        }

        return res.send({
            message: `Đã xóa thành công tất cả(${data.deletedCount}) user!`,
        })
    }
    if (!req?.body?.id) return res.status(400).json({ "message": 'User id required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(400).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}