const Product = require('../model/Product')

const handleNewProduct = async (req, res) => {
    const { name, type, src, href, price, newProduct, description, long,
        wide, high, weight, fuelTankVolume, colorList, wheelbaseLength,
        engineName, capacity, speedUp, fuelConsumption, maxSpeed
    } = req.body
    // if (!name || !type || !src || !href || !price || !description) return res.status(400).json({ 'message': 'Tên, loại, nguồn ảnh, đường dẫn, giá và mô tả không được để trống!' })

    const foundProduct = await Product.findOne({ name: name }).exec()
    if (foundProduct) {
        return res.status(422).send({ message: `Xe ${name} đã tồn tại!` })
    }

    try {
        const result = await Product.create({
            "name": name,
            "type": type,
            "src": src,
            "href": href,
            "price": price,
            "newProduct": newProduct,
            "description": description,
            "long": long,
            "wide": wide,
            "high": high,
            "weight": weight,
            "fuelTankVolume": fuelTankVolume,
            "colorList": colorList,
            "wheelbaseLength": wheelbaseLength,
            "engineName": engineName,
            "capacity": capacity,
            "speedUp": speedUp,
            "fuelConsumption": fuelConsumption,
            "maxSpeed": maxSpeed,
        })
        console.log(result);
        res.status(201).send({ message: `New product ${name} created successfully!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handleNewProduct }