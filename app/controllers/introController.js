const Intro = require('../model/Intro')
const { BadRequestError } = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')

const handleCreateIntro = async (req, res) => {
    const { intro } = req.body

    const count = await Intro.countDocuments();
    if (count >= 1) return res.status(400).json({ "message": "Chỉ được tạo tối đa 1 đoạn giới thiệu! " })

    try {
        const result = await Intro.create({
            "intro": intro,
        })
        console.log(result);
        res.status(201).send({ message: `New intro ${intro} created successfully!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const updateIntro = async (req, res, next) => {
    try {
        const { intro } = req.body;
        const updatedIntro = await Intro.findOneAndUpdate(
            {},
            { $set: { intro } },
            { new: true }
        );
        if (!updatedIntro) {
            return res.status(404).json({ message: 'No intro found' });
        }
        return res.status(200).json({ intro: updatedIntro.intro });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getAllIntro = async (req, res) => {
    const intros = await Intro.find();
    if (!intros) return res.status(204).json({ 'message': 'No intro found' });
    res.json(intros);
}

module.exports = {
    handleCreateIntro,
    updateIntro,
    getAllIntro
}