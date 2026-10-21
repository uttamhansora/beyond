const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FutureReadiness = new Schema({
    name: String,
    main_title: String,
    description:String,
    slug:String,
    outcome_title:String,
    outcome_1_title:String,
    main_image:String,
    outcome_1_image:String,
    outcome_2_title:String,
    outcome_2_image:String,
    bg_image:String,
    outcome_3_title:String,
    outcome_3_image:String,
    outcome_4_title:String,
    outcome_4_image:String,
    deliverible_title:String,

    service_casestudy:{
        type:[String],
        ref:"ServiceCategory"
    },
    deliverables_1_title:String,
    deliverables_1_image:String,
    deliverables_1_description:String,

    deliverables_2_title:String,
    deliverables_2_image:String,
    deliverables_2_description:String,

    deliverables_3_title:String,
    deliverables_3_image:String,
    deliverables_3_description:String,

    objective_title:String,
    objective_description:String,
    object_finance_title:String,
    object_customer_title:String,
    object_managerial_title:String,
    object_employee_title:String,
    object_perdomin_title:String,
    clients:{
        type:[String],
        ref:"Client"
    }
    
}, {timestamps: true});

module.exports = mongoose.model('FutureReadiness', FutureReadiness);