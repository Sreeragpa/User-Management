import userModel from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        
        const users = await userModel.find();
        res.render('index.ejs', {
            users,
            userId: req.session.user._id,
            successMessage: req.flash('success'),
            errorMessage: req.flash('error'),
        });
    } catch (error) {
        req.flash('error', 'Unable to fetch users.');
        res.redirect('/');
    }
};

// controllers/user.controller.js

export const editUserPage = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            req.flash('error', 'User not found.');
            return res.redirect('/');
        }
        res.render('editUser', { user, successMessage: req.flash('success'), errorMessage: req.flash('error') });
    } catch (error) {
        req.flash('error', 'Error fetching user details.');
        res.redirect('/');
    }
};


export const updateUser = async (req, res) => {
    const { name, phone } = req.body;
    const userId = req.params.id;
    console.log(userId,"ISISISISISI",req.body);
    

    try {
        // Find and update the user
        const updatedUser = await userModel.findByIdAndUpdate(userId, { name, phone }, { new: true });

        if (!updatedUser) {
            req.flash('error', 'User not found.');
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Success response
        req.flash('success', 'User updated successfully.');
        res.json({ success: true, message: 'User updated successfully.', user: updatedUser });

    } catch (error) {
        console.error(error); // Log the error for debugging
        req.flash('error', 'Error updating user.');
        res.status(500).json({ success: false, message: 'Error updating user.' });
    }
};


export const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
    }
};
