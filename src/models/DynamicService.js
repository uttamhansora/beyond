const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DynamicService = new Schema({
    title:String,
    slug:String,
    category:String,
    bg_image:String,
    section_1_title:String,
    section_1_pdf:String,
    section_2_title:String,
    section_2_image:String,
    section_2_description:String,
    section_2_pdf:String,
    client_title:String,
    
        outcome_title:String,
        outcome_title_1:String,
        outcome_image_1:String,
        outcome_description_1:String,
        
        outcome_title_2:String,
        outcome_image_2:String,
        outcome_description_2:String,
        
        outcome_title_3:String,
        outcome_image_3:String,
        outcome_description_3:String,
        
        methodology_title_1:String,
        methodology_image_1:String,
        methodology_description_1:String,
        
        journey_title:String,

        journey_title_1:String,
        journey_image_1:String,
        
        journey_title_2:String,
        journey_image_2:String,
        
        journey_title_3:String,
        journey_image_3:String,
        
        journey_title_4:String,
        journey_image_4:String,
        
        journey_title_5:String,
        journey_image_5:String,
        
        journey_title_6:String,
        journey_image_6:String,
        
        journey_title_7:String,
        journey_image_7:String,
        
        journey_title_8:String,
        journey_image_8:String,
        
        experince_title:String,

        experince_title_1:String,
        experince_image_1:String,
        experince_description_1:String,
        
        experince_title_2:String,
        experince_image_2:String,
        experince_description_2:String,
        
        experince_title_3:String,
        experince_image_3:String,
        experince_description_3:String,
    
    edge_title:String,
    main_image:String,
    image:String,
    
    edge_1_count:String,
    edge_1_unit:String,
    edge_2_unit:String,
    edge_3_unit:String,
    edge_1_title:String,
    edge_2_count:String,
    edge_2_title:String,
    edge_3_count:String,
    edge_3_title:String,
    
    section_3_title_1:String,
    section_3_image_1:String,
    section_3_description_1:String,
    
    section_3_title_2:String,
    section_3_image_2:String,
    section_3_description_2:String,
    
    section_3_title_3:String,
    section_3_image_3:String,
    section_3_description_3:String,
    
    section_4_title:String,
    section_4_description:String,
    
    benchmark_title:String,
    benchmark_1_title:String,
    benchmark_1_image:String,
    benchmark_1_description:String,
    benchmark_2_title:String,
    benchmark_2_image:String,
    benchmark_2_description:String,
    benchmark_3_title:String,
    benchmark_3_image:String,
    benchmark_3_description:String,
    benchmark_4_title:String,
    benchmark_4_image:String,
    benchmark_4_description:String,
    
    download_title:String,
    variant_title:String,
    variant_1_title:String,
    variant_1_description:String,
    variant_1_full_description:String,
    variant_2_title:String,
    variant_2_description:String,
    variant_2_full_description:String,
    variant_3_title:String,
    variant_3_description:String,
    variant_3_full_description:String,
    variant_4_title:String,
    variant_4_description:String,
    variant_4_full_description:String,
    
    deliverable_title:String,
    deliverable_1_title:String,
    deliverable_1_image:String,
    deliverable_1_description:String,
    deliverable_2_title:String,
    deliverable_2_image:String,
    deliverable_2_description:String,
    deliverable_3_title:String,
    deliverable_3_image:String,
    deliverable_3_description:String,
    faq_title:String,
    clients:{
        type:[String],
        ref:"Client"
    },
    testimonials:{
        type:[String],
        ref:"Testimonial"
    },
    cta_title:String,
    cta_description:String,
    cta_button_name:String,
    cta_button_link:String,
    
}, {timestamps: true});

module.exports = mongoose.model('DynamicService', DynamicService);