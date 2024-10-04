const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // Password validation rules
        const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordCheck.test(password)) {
            res.status(400);
            let errorMessage = 'Password must meet the following criteria:';
            if (password.length < 8) {
                errorMessage += '\n- At least 8 characters long';
            }
            if (!/(?=.*[a-z])/.test(password)) {
                errorMessage += '\n- One lowercase letter';
            }
            if (!/(?=.*[A-Z])/.test(password)) {
                errorMessage += '\n- One uppercase letter';
            }
            if (!/(?=.*\d)/.test(password)) {
                errorMessage += '\n- One number';
            }
            throw new Error(errorMessage);
        }

        // Email validation
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailCheck.test(email)) {
            res.status(400);
            throw new Error('Please provide a valid email address');
        }

        // Name validation
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            res.status(400);
            throw new Error('Please provide a valid name');
        }
        if (/[\d!@#$%^&*()_+={}\[\]:";'<>?,.\/\\|`~]/.test(name)) {
            res.status(400);
            throw new Error('Name cannot contain numbers or symbols');
        }

        const user = await userModel.findOne({ email });

        console.log("user", user);

        if (user) {
            throw new Error("User already exists.");
        }

        if (!email) {
            throw new Error("Please provide your email address.");
        }
        if (!password) {
            throw new Error("Please provide your password.");
        }
        if (!name) {
            throw new Error("Please provide your name.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something is wrong");
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
