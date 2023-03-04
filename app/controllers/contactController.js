const Contact = require('../model/Contact')
const { BadRequestError } = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')

const handleCreateContact = async (req, res) => {
    const { address, email, phoneNumber, linkToFace } = req.body

    const count = await Contact.countDocuments();
    if (count >= 1) return res.status(400).json({ "message": "Chỉ được có 1 nội dung liên hệ! " })

    try {
        const result = await Contact.create({
            "address": address,
            "email": email,
            "phoneNumber": phoneNumber,
            "linkToFace": linkToFace,
        })
        console.log(result);
        res.status(201).send({ message: `New contact ${address} created successfully!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const { address, email, phoneNumber, linkToFace } = req.body;

    try {
        const contact = await Contact.findByIdAndUpdate(
            id,
            { address, email, phoneNumber, linkToFace },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllContact = async (req, res) => {
    const contacts = await Contact.find();
    if (!contacts) return res.status(204).json({ 'message': 'No contact found' });
    res.json(contacts);
}

module.exports = {
    handleCreateContact,
    updateContact,
    getAllContact
}