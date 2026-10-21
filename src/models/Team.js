const mongoose = require('mongoose');

const Schema = mongoose.Schema;




const Team = new Schema({
    f_name: String,
    l_name:String,
    bio:String,
    short_bio:String,
    image:String,
    position:String,
   
    work:[
        {
          _id: false,
          id: String,
          s_title: String,
          s_link: String,
          s_company_name:String,
          s_company_date: String,
        }
      ],
      education:[
        {
          _id: false,
          e_id: String,
          e_collage: String,
          e_degree: String,
        }
      ],
      expertise:[String],
      hobby:[String],
      order: { type: Number, default: 0 }
}, {timestamps: true});

module.exports = mongoose.model('Team', Team);