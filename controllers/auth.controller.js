import bcrypt from 'bcrypt';
import userModel from '../models/user.model.js';

export const registerUser = async (req, res) => {
    const { name, email, password, phone, profession } = req.body;
    
    try {
        // Check if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            req.flash('error', 'User with this email already exists.');
            return res.redirect('/register');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user data
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            profession
        });

        await newUser.save();

        req.flash('success', 'Registration successful. You can now log in.');
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred during registration.');
        res.redirect('/register');
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            req.flash('error', 'No user found with this email.');
            return res.redirect('/login');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            req.flash('error', 'Incorrect password.');
            return res.redirect('/login');
        }

        req.session.user = user;
        req.flash('success', 'Login successful!');
        res.redirect('/');
    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred during login.');
        res.redirect('/login');
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/login');
        }

        res.redirect('/login');
    });
};
