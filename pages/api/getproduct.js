import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async(req, res) => {
    if (req.method === "GET") {
        const itemSlug = req.query.slug;
        console.log("Slug =>",itemSlug)
        try {
            const product = await Product.findOne({slug: itemSlug});
            console.log("Product =>", product);
            res.status(200).json({success: true, product: product});
        } catch (error) {
            res.status(500).json({success: false, message: "Internal Sever Error"})
        }
        
        
    }
}

export default connectDb(handler);