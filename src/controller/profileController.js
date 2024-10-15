const Membership = require("../models/membership");
const User = require("../models/user");



const membership = async (req, res) => {
    const data = req.body; 
    console.log("Received data:", data); 

    try {
        // Find the user by ID and populate the membership details
        const user = await User.findById(data.userId).populate('membershipDetails');
        console.log("User with populated membership:", user);

        if (user) {
            const membershipData = {
                userId: data.userId,
                membershipPlan: data.membershipPlan,
                membershipDuration: data.membershipDuration,
                membershipStartDate: data.startDate,
                membershipEndDate: data.endDate,
            };

            let membership = await Membership.findOne({ userId: data.userId });

            if (membership) {
                // Update membership
                membership.membershipPlan = data.membershipPlan;
                membership.membershipDuration = data.membershipDuration;
                membership.membershipStartDate = data.startDate;
                membership.membershipEndDate = data.endDate;
                await membership.save();
            } else {
                // Create a new membership
                membership = new Membership(membershipData);
                await membership.save();
            }

            // Link the new/updated membership to the user
            user.membershipDetails = membership._id;
            await user.save();

            // Fetch the user with updated populated membership details
            const updatedUser = await User.findById(data.userId).populate('membershipDetails');

            res.status(200).json({
                message: "Membership updated successfully",
                user: updatedUser,
                success: true,
            });
        } else {
            res.status(404).json({ message: "User not found", success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};




module.exports = membership