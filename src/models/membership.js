const mongoose = require('mongoose');
const { Schema } = mongoose;

const membershipSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        membershipDuration:{
            type:String,
            enum: ['monthly', 'quarterly',  'yearly'],
            required: true,

        },
        membershipPlan:{
            type:String,
            enum: ['single', 'couple','group'],
            // required:true
        },
        membershipStatus:{
            type:String,
            enum: ['active', 'inactive'],
            default:'active'
        },
        membershipStartDate:{
            type:Date,
            required:true,
        },
        membershipEndDate:{
            type:Date,
            required:true,
        }
    },{timestamps:true}
);

const Membership = mongoose.model("Membership", membershipSchema);

module.exports = Membership;