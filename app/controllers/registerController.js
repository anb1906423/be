const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleRegister = async (req, res) => {
    var roles = 0
    User.count({}, function(error, countUser) {
        if (countUser == 0) {
            roles = 1;
        }
    });
    const { fullName, phoneNumber, email, pwd, model, isCash } = req.body
    if (!fullName || !phoneNumber || !email ) return res.status(400).json({ 'message': 'Họ và tên, số điện thoại, email và password không được để trống!' })

    // if (req.body?.pwd.length < 8) {
    //     return res.send({ message: 'Mật khẩu phải có ít nhất 8 ký tự!', status: 400 });
    // }

    const foundEmail = await User.findOne({ email: email }).exec();
    if (foundEmail) {
        return res.send({ message: 'Địa chỉ email đã được sử dụng!', status: 400 })
    }

    const foundPhoneNumber = await User.findOne({ phoneNumber: phoneNumber }).exec();
    if (foundPhoneNumber) {
        return res.send({ message: 'Số điện thoại đã được sử dụng!', status: 400 })
    }

    try {
        // const hashedPwd = await bcrypt.hash(pwd, 8)

        const result = await User.create({
            "fullName": fullName,
            "phoneNumber": phoneNumber,
            "email": email,
            "password": pwd,
            "modelInterest": model,
            "isCash": isCash,
            "roles": roles
        })

        console.log(result);

        res.status(201).send({ message: `New user ${fullName} created!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handleRegister }
