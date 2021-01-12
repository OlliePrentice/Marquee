import {connectToDatabase} from "../../../lib/mongodb";

module.exports = async (req, res) => {
    const { db } = await connectToDatabase();

    const category =  JSON.parse(req.query.category)

    const subCategories = await db
        .collection("categories")
        .find({category: new RegExp('^\/' + category.name + '\/')})
        .toArray();

    res.status(200).json({ subCategories })
}
