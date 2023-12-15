const mongoose = require('mongoose')
const transectionSchema = new mongoose.Schema({
    
    userid:{
        type:String,
        require:true
    },
    amount: {
        type: Number,
        required: [true, 'amount is required']
    },
    type: {
        type: String,
        require: [true, 'type is required']
    },
    category: {
        type: String,
        require: [true, 'category is required']
    },
    refrence: {
        type: String
    },
    description: {
        type: String,
        require: [true, 'description is required']
    },
    date: {
        type: Date,
        require: [true, "data is required"],
    },

},
    { timestamps: true }
)
const transectionModel = mongoose.model("transections", transectionSchema)
module.exports = transectionModel;
