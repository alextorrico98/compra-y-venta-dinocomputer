const mongoose=require('mongoose');
const blacklistSchema= mongoose.Schema({
    token: {
        type: String,
        index: true,
    }  
});