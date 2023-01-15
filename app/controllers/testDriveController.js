// const TestDrive = require('../model/TestDrive')
// const bcrypt = require('bcrypt')

// const handleRegisterTestDrive = async (req, res) => {

//     const { fullName, phoneNumber, model } = req.body
//     if (!fullName || !phoneNumber) return res.status(400).json({ 'message': 'Họ tên và số điện thoại không được để trống!' })

//     try {
//         const result = await TestDrive.create({
//             "fullName": fullName,
//             "phoneNumber": phoneNumber,
//             "modelInterest": model,
//         })

//         console.log(result);

//         res.status(201).send({ message: `New request ${fullName} created!` })
//     } catch (err) {
//         res.status(500).json({ 'message': err.message })
//     }
// }

// const getAllTestDriveRequest = async (req, res) => {
//     const driver = await TestDrive.find();
//     if (!driver) return res.status(204).json({ 'message': 'No request found' });
//     res.json(driver);
// }

// const deleteTestDriveRequest = async (req, res) => {
//     if (!req?.body?.id) return res.status(400).json({ "message": 'Request id required' });
//     const driver = await TestDrive.findOne({ _id: req.body.id }).exec();
//     if (!driver) {
//         return res.status(400).json({ 'message': `Request ID ${req.body.id} not found` });
//     }
//     const result = await driver.deleteOne({ _id: req.body.id });
//     res.json(result);
// }

// module.exports = { handleRegisterTestDrive, getAllTestDriveRequest, deleteTestDriveRequest }
