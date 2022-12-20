const ApiError = require('../api-error')
const User = require('../model/User')

//Cần bổ sung validate số ký tự mỗi input

const checkDuplicateUsernameOrEmail = async (req, res, next) => {

    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!(emailReg.test(req.body.email))) {
        return next(
            new ApiError(400, 'Email address is not valid!')
        )
    }

    const phoneNumberReg = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
    if (!(phoneNumberReg.test(req.body.phoneNumber))) {
        return next(
            new ApiError(400, 'Phonenumber is not valid!')
        )
    }

    // const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    // const passwordReg = /^[A-z][A-z0-9-_]{3,23}$/
    const passwordReg = /^[a-zA-Z0-9]+$/
    // if (!(passwordReg.test(req.body.pwd))) {
    //     return next(
    //         new ApiError(400, 'Password is not valid!')
    //     )
    // }

    try {
        const [userByEmail] = await Promise.all([
            User.findOne({
                email: req.body.email,
            }),
        ])

        const [userPhoneNumber] = await Promise.all([
            User.findOne({
                phoneNumber: req.body.phoneNumber,
            }),
        ])

        if (userByEmail) {
            return next(
                new ApiError(422, 'Địa chỉ email đã được sử dụng!')
            )
        }

        if (userPhoneNumber) {
            return next(
                new ApiError(422, 'Số điện thoại đã được sử dụng!')
            )
        }

        return next()
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, 'Server error')
        )
    }
}

module.exports = {
    checkDuplicateUsernameOrEmail,
}
