const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const { responseReturn } = require("../utiles/response");
const productModel = require("../models/productModel");
const bannerModel = require("../models/bannerModel");
const {
    mongo: { ObjectId },
} = require("mongoose");

class bannerController {
    banner_add = async (req, res) => {
        const form = new formidable.IncomingForm({ multiples: true })
        form.parse(req, async (err, field, files) => {
            let { productId, type } = field;
            const { banner } = files;
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true,
            });

            try {
                const { slug } = await productModel.findById(productId[0]);
                const result = await cloudinary.uploader.upload(banner[0].filepath, {
                    folder: "profile",
                });
                const productBanner = await bannerModel.create({
                    productId: productId[0],
                    banner: result.url,
                    type: type[0],
                    link: slug,
                });
                responseReturn(res, 201, { productBanner, message: "New Banner added successfully" });
            } catch (error) {
                responseReturn(res, 500, { error: error.message });
            }
        });
    };
    get_banner = async (req, res) => {
        const { productId } = req.params;
        try {
            const bigBanner = await bannerModel.findOne({ productId: new ObjectId(productId), type: "big" });
            const smallBanner = await bannerModel.findOne({ productId: new ObjectId(productId), type: "small" });
            responseReturn(res, 201, { bigBanner, smallBanner });
        } catch (error) {
            console.log(error);
        }
    };

    all_banner = async (req, res) => {
        try {
            const banners = await bannerModel.find({}).sort({ createAt: -1 })
            responseReturn(res, 201, { banners });
        } catch (error) {
            console.log(error);
        }
    };

    update_banner = async (req, res) => {
        const { bannerId } = req.params;

        const form = new formidable.IncomingForm({ multiples: true })
        form.parse(req, async (err, field, files) => {
            const { banner } = files;
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true,
            });

            try {
                let productBanner = await bannerModel.findById(bannerId);
                let temp = productBanner.banner.split("/");
                temp = temp[temp.length - 1].split(".")[0];
                const imageUrl = temp;
                await cloudinary.uploader.destroy(imageUrl);

                const result = await cloudinary.uploader.upload(banner[0].filepath, {
                    folder: "profile",
                });
                await bannerModel.findByIdAndUpdate(bannerId, {
                    banner: result.url,
                });
                productBanner = await bannerModel.findById(bannerId);
                responseReturn(res, 200, { productBanner, message: "Banner update success" });
            } catch (error) {
                responseReturn(res, 500, { error: error.message });
                console.log(error);
            }
        });
    };
}
module.exports = new bannerController();