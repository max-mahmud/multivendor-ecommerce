const customerModel = require('../../models/customerMode')
const { responseReturn } = require('../../utiles/response')
const { createToken } = require('../../utiles/tokenCreate')
const cloudinary = require('cloudinary').v2
const formidable = require('formidable');
const bcrypt = require('bcrypt')

class customerAuthController {
    customer_register = async (req, res) => {
        const { name, email, password } = req.body

        try {
            const customer = await customerModel.findOne({ email })
            if (customer) {
                responseReturn(res, 404, { error: 'Email already exits' })
            } else {
                const createCustomer = await customerModel.create({
                    name: name.trim(),
                    email: email.trim(),
                    password: await bcrypt.hash(password, 10),
                })

                const token = await createToken({
                    id: createCustomer.id,
                    name: createCustomer.name,
                    email: createCustomer.email,
                })
                res.cookie('customerToken', token, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                })
                responseReturn(res, 201, { message: 'Register success', token })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    customer_login = async (req, res) => {
        const { email, password } = req.body
        try {
            const customer = await customerModel.findOne({ email }).select('+password')
            if (customer) {
                const match = await bcrypt.compare(password, customer.password)
                if (match) {
                    const token = await createToken({
                        id: customer.id,
                        name: customer.name,
                        email: customer.email,
                    })
                    res.cookie('customerToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    })
                    responseReturn(res, 201, { message: 'Login success', token })
                } else {
                    responseReturn(res, 404, { error: "Password wrong" })
                }
            } else {
                responseReturn(res, 404, { error: 'Email not found' })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    customer_logout = async (req, res) => {
        res.cookie('customerToken', "", {
            expires: new Date(Date.now())
        })
        responseReturn(res, 200, { message: 'Logout success' })
    }

    profile_info_add = async (req, res) => {
        const { name, website, occupation, bio, userId } = req.body;

        try {
            await customerModel.findByIdAndUpdate(userId, { name, website, occupation, bio })
            const profileData = await customerModel.findById(userId)
            responseReturn(res, 201, { message: 'Profile info add success', profileData })
        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }

    profile_image_upload = async (req, res) => {
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })
            const { image } = files
            let { userId } = fields
            userId = userId[0]
            try {
                const result = await cloudinary.uploader.upload(image[0].filepath, { folder: 'profile' })
                if (result) {
                    await customerModel.findByIdAndUpdate(userId, {
                        photo: result.url
                    })
                    const profileData = await customerModel.findById(userId)
                    responseReturn(res, 201, { message: 'image upload success', profileData })
                } else {
                    responseReturn(res, 404, { error: 'image upload failed' })
                }
            } catch (error) {
                //console.log(error)
                responseReturn(res, 500, { error: error.message })
            }
        })
    }

    get_profile_data = async (req, res) => {
        const { id } = req.params;
        try {
            const profileData = await customerModel.findById(id);
            if (!profileData) {
                return res.status(404).json({ error: 'Profile not found' });
            }

            responseReturn(res, 200, { profileData });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Server Error' });
        }
    };
    changePassword = async (req, res) => {
        const { oldPassword, newPassword, userId } = req.body;
        try {
            const user = await customerModel.findById(userId).select("+password")

            if (!user) {
                return res.status(404).json({ error: "User not found" })
            }

            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isPasswordMatch) {
                return res.status(400).json({ error: "Old password is incorrect" });
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedNewPassword;
            await user.save();

            res.status(200).json({ message: "Password updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}

module.exports = new customerAuthController()