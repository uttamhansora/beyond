const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Home = new Schema({
    video:String,
    title:String,
    small_title:String,
    
    small_description:String,
    link_1_title:String,
    link_1_link:String,
    link_2_title:String,
    link_2_link:String,
    
    title_1:String,
    image_1:String,
    description_1:String,
    
    title_2:String,
    image_2:String,
    description_2:String,
    
    title_3:String,
    image_3:String,
    description_3:String,
    
    diffrent_title:String,
    
    diffrent_title_1:String,
    diffrent_image_1:String,
    
    diffrent_title_2:String,
    diffrent_image_2:String,

    diffrent_title_3:String,
    diffrent_image_3:String,

    diffrent_title_4:String,
    diffrent_image_4:String,
    
    sec_1_heading: {
        type: String
    },
    sec_1_title: {
        type: String
    },
    sec_1_image: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Home', Home);