'use strict';
const jwt = require('jsonwebtoken');
const JWTKEY = process.env.JWTKEY || 'vernalis';
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const randomstring = require('randomstring');
const blacklistedTokens = new Set();
const { v4: uuidv4 } = require('uuid');
const Razorpay = require('razorpay');
const paypal = require('@paypal/checkout-server-sdk');
const axios = require('axios');
const Home = require('../models/Home');
const CaseCategory = require('../models/CaseCategory');
const MostFeedback = require('../models/MostFeedback');
const CaseStudy = require('../models/CaseStudy');
const Smart360 = require('../models/Smart360');
const Career = require('../models/Career');
const Blog = require('../models/Blog');
const Download = require('../models/Download');
const Dynamicfaq = require('../models/Dynamicfaq');
const Dynamiccenter = require('../models/Dynamiccenter');
const About = require('../models/About');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const ContactPage = require('../models/ContactPage');
const Careerform = require('../models/Careerform');
const Testimonial = require('../models/Testimonial');
const DynamicService = require('../models/DynamicService');
const Team = require('../models/Team');
const HrExeForm = require('../models/HrExeForm');
const TalentAssement = require('../models/TalentAssement');
const SDevelopmentCenter = require('../models/SDevelopmentCenter');
const Application = require('../models/Application');
const Benchmark = require('../models/Benchmark');
const MainService = require('../models/MainService');
const TestimonialCategory = require('../models/TestimonialCategory');
const BlogCategory = require('../models/BlogCategory');

const ServicePage = require('../models/ServicePage');

const AssesmentApplication = require('../models/AssesmentApplication');

const AssesmentQuality = require('../models/AssesmentQuality');

const FeedbackApplication = require('../models/FeedbackApplication');

const FeedbackQuality = require('../models/FeedbackQuality');


const CareerConsultant = require('../models/CareerConsultant');

const CareerCompetencies = require('../models/CareerCompetencies');

const CareerProcess = require('../models/CareerProcess');

const DevelopmentCenterFaq = require('../models/DevelopmentCenterFaq');
const DevelopmentDifferentiators = require('../models/DevelopmentDifferentiators');
const DevelopmentCenterComponents = require('../models/DevelopmentCenterComponents');

const LeadershipExcellenceEdge = require('../models/LeadershipExcellenceEdge');

const LDevelopmentCenter = require('../models/LDevelopmentCenter');
const FutureLeadersProcess = require('../models/FutureLeadersProcess');
const FutureLeadersEdge = require('../models/FutureLeadersEdge');


const CompetenceBuildingFaq = require('../models/CompetenceBuildingFaq');
const CompetenceBuildingDifferentiators = require('../models/CompetenceBuildingDifferentiators');
const CompetenceBuildingComponent = require('../models/CompetenceBuildingComponent');

const LeadershipDevelopmentFaq = require('../models/LeadershipDevelopmentFaq');
const LeadershipDevelopmentDifferentiators = require('../models/LeadershipDevelopmentDifferentiators');
const LeadershipDevelopmentComponent = require('../models/LeadershipDevelopmentComponent');

const CXOFaq = require('../models/CXOFaq');
const PageTitle = require('../models/PageTitle');
const CXOExperience = require('../models/CXOExperience');

const LeadershipBenchmarkApplications = require('../models/LeadershipBenchmarkApplications');
const LeadershipBenchmarkQuality = require('../models/LeadershipBenchmarkQuality');

const HipRadicalPerf = require('../models/Service/HipRadicalPerf');
const Restructuring = require('../models/Service/Restructuring');
const EnergisingInnovation = require('../models/Service/EnergisingInnovation');
const Vision = require('../models/Service/Vision');
const FutureReadiness = require('../models/Service/FutureReadiness');
const StrategicHr = require('../models/Service/StrategicHr');
const CompetencyMapping = require('../models/Service/CompetencyMapping');
const Methodology = require('../models/Methodology');
const CompetencyBasedInterviewing = require('../models/Service/CompetencyBasedInterviewing');
const HiPerformanceConversations = require('../models/Service/HiPerformanceConversations');
const DevelopmentCenters = require('../models/Service/DevelopmentCenters');
const CompetenceBuilding = require('../models/Service/CompetenceBuilding');
const HRExcellence = require('../models/Service/HRExcellence');
const AssesmentCenters = require('../models/Service/AssesmentCenters');
const Hiperforg = require('../models/Service/Hiperforg');
const FeedbackCenters = require('../models/Service/FeedbackCenters');
const TalentAssessment = require('../models/Service/TalentAssessment');
const LeadershipExcellence = require('../models/Service/LeadershipExcellence');
const FutureLeaders = require('../models/Service/FutureLeaders');
const ExecutiveCoaching = require('../models/Service/ExecutiveCoaching');
const LeadershipDevelopment = require('../models/Service/LeadershipDevelopment');
const CXOSelections = require('../models/Service/CXOSelections');
const Leadershipbenchmarking = require('../models/Service/Leadershipbenchmarking');
const dealerpersonnelexcellence = require('../models/Service/dealerpersonnelexcellence');





const shiprocketBaseURL = 'https://apiv2.shiprocket.in/v1/external';

async function authenticateShiprocket(email, password) {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.token;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function createShipment(order,shiprocketToken) {
    try {
        const shiprocket = axios.create({
            baseURL: shiprocketBaseURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${shiprocketToken}`
            }
        });
        const response = await shiprocket.post('/orders/create/adhoc', order);
        return response.data;
    } catch (error) {
        console.error('Error creating shipment:', error.response ? error.response.data : error.message);
        throw error;
    }
}


const payPalClient = new paypal.core.PayPalHttpClient(new paypal.core.SandboxEnvironment(
  'AZhTMwX7pZQdl7neO6qIO6a2gjsvYyjK57UT9pZZKjo2J5AwcZmPD5LHTHkQXBa4QXIWbZthzadnws91',
  'EM4-OlUUPyQtfn5zIEXJlnzwwZ_F7Y7eXvf3CvD3KdSUEIG3QT-F3gpsyh1c4Eqo_jExhhy_7re5piCw'
));

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_ZbgRSZq38XO7o6',
  key_secret: 'wlKz8I0EfdGXe19vbptaicgu'
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'odemo134@gmail.com',
    pass: 'dejbxrnhuvsbcevc',
  },
});
function success(data, message, statusCode = 200, token) {
    return {
      success: true,
      statusCode: statusCode,
      message: message,
      token: token,
      data: data
    };
  
  }
  const errors = (message, statusCode = 500) => ({
    success: false,
    statusCode: statusCode,
    message: message
  
  
  });
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    // Check if the token is blacklisted
    if (blacklistedTokens.has(token)) {
      return res.sendStatus(403);
    }
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }


const storecontactapi = async (req,res)=>{
  try {
        const { category,name,email,phone,company,message } = req.body;
        const newContact = new Contact({ category,name,email,phone,company,message });
        await newContact.save();
        
    //      const emailContent = `
    //       <div style="background-color: #f9f9f9; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;">
    //         <div style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    //             <p style="color: #555555;">Thank you for reaching out. Here are the details we received from you:</p>
    //             <ul style="list-style-type: none; padding: 0; color: #555555;">
    //                 <li style="padding: 5px 0;"><strong>Email:</strong> ${email}</li>
    //                 <li style="padding: 5px 0;"><strong>Phone:</strong> ${phone}</li>
    //                 <li style="padding: 5px 0;"><strong>Message:</strong> ${message}</li>
    //                 <li style="padding: 5px 0;"><strong>Country:</strong> ${country}</li>
    //                 <li style="padding: 5px 0;"><strong>Help:</strong> ${help}</li>
    //             </ul>
                
    //         </div>
    //     </div>
    // `;
    //  await transporter.sendMail({
    //         from: 'odemo134@gmail.com',
    //         to: 'admin@supagrow.in',
    //         subject: `Contact Form Details ${name}`,
    //         html: emailContent
    //     });
        
        return res.status(200).json(success([], "Contact Stored successfully"));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const applycareerform = async (req, res) => {
    try {
    req.body.cv = req.file.path;
            let body = req.body;
            const team = new Careerform(req.body);
            let response = await Careerform(body);
            await team.save();
  
  return res.status(200).json(success([], "Career Form stored successfully"));
      
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
const storenewsapi = async (req,res)=>{
  try {
      const { email } = req.body;

      // Validate the email
      if (!email) {
          return res.status(400).json({ message: 'Invalid email address' });
      }

      // Check if the email already exists in the database
      const existingSubscription = await NewsLetter.findOne({ email });
      if (existingSubscription) {
          return res.status(409).json({ message: 'Email is already subscribed' });
      }

      // Create a new newsletter subscription
      const newSubscription = new NewsLetter({ email });
      await newSubscription.save();

      return res.status(200).json(success(newSubscription, "Subscribed successfully"));
  } catch (error) {
      res.status(500).json({ message: 'An error occurred while subscribing', error: error.message });
  }
}

const getblogs = async (req, res) => {
  try {
      const category=await BlogCategory.find({});
    const { category_id } = req.body; // Assuming you're getting category_id from the request query
    const latestblogs=await Blog.find({is_latest:true})
// Build the filter object
const filter = category_id ? { category_id } : {};

// Fetch the blogs data with the filter applied
const blogsdata = await Blog.find(filter);
const response={
    category:category,
    blogs:blogsdata,
    latestblogs:latestblogs
}
    res.json(success(response, 'Blogs Get SuccessFully.'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const blogdetails = async (req, res) => {
  try {
    // Fetch the primary blog data based on the slug
    const blogData = await Blog.findOne({ slug: req.body.slug });
    if (!blogData) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Fetch related blogs, excluding the current blog's ID
    const relatedBlogs = await Blog.find({
      _id: { $ne: blogData._id },
    })
    .limit(5); // Limit the number of related blogs

    // Send the response with both the main blog and related blogs
    res.json({
      success: true,
      message: "Blog Details Get Successfully",
      blogData,
      relatedBlogs,
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const dynamicservice = async (req, res) => {
  try {
      
// Fetch the blogs data with the filter applied
const blogsdata = await DynamicService.find({});

    res.json(success(blogsdata, 'Dynamic Service Get SuccessFully.'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const dynamicservicedetails = async (req, res) => {
  try {
    // Fetch the primary blog data based on the slug
    const blogData = await DynamicService.findOne({ slug: req.body.slug }).populate(['clients', 'testimonials']);
    const download = await Download.find({}).sort({ order: 1 });
    const faq = await Dynamicfaq.find({}).sort({ order: 1 });
    const dynamiccenter = await Dynamiccenter.find({}).sort({ order: 1 });
    if (!blogData) {
      return res.status(404).json({ message: "Dynamic Service not found" });
    }

    // Send the response with both the main blog and related blogs
    res.json({
      success: true,
      message: "Dynamic Service Details Get Successfully",
      data:blogData,
      downloads:download,
      faqs:faq,
      dynamiccenter:dynamiccenter
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getcontactpage = async (req, res) => {
  try {
    // Fetch the primary blog data based on the slug
    const blogData = await ContactPage.findOne({ "_id": "68c2c196c12a069c611f87fb" });
    if (!blogData) {
      return res.status(404).json({ message: "Contact Page not found" });
    }

    // Send the response with both the main blog and related blogs
    res.json({
      success: true,
      message: "Contact Page Get Successfully",
      blogData
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getcasestudies = async (req, res) => {
  try {

    // Get all categories
    const category = await CaseCategory.find({});

    // Get category_id from request
    const { category_id } = req.body;

    // Latest case studies
    const latestcasestudies = await CaseStudy.find({ is_latest: true });

    // Filter
    const filter = category_id ? { category_id } : {};

    // Case studies data
    const casestudies = await CaseStudy.find(filter);

    const response = {
      category: category,
      casestudies: casestudies,
      latestcasestudies: latestcasestudies
    };

    res.json(success(response, 'Case Studies Get SuccessFully.'));
    
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const casestudiesdetails = async (req, res) => {
  try {
    // Fetch the primary blog data based on the slug
    const blogData = await CaseStudy.findOne({ slug: req.body.slug });
    if (!blogData) {
      return res.status(404).json({ message: "Case Study not found" });
    }

    // Send the response with both the main blog and related blogs
    res.json({
      success: true,
      message: "Case Study Details Get Successfully",
      blogData
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const careerpage = async (req, res) => {
  try {
        

    // Fetch the required fields dynamically
    const careerpage=await ServicePage.findOne({"_id":"673afb3b0e75f391c9c2b802"});
    const blogsdata = await Career.find({}).sort({ _id: -1 });
    
    const process = await CareerProcess.find({});
    const competencies = await CareerCompetencies.find({}).sort({ _id: -1 });
    const consultant = await CareerConsultant.find({}).sort({ _id: -1 });
     const response={
        careers:blogsdata,
        careerpage:careerpage,
        process:process,
        competencies:competencies,
        consultant:consultant
        
    }
    res.json(success(response, 'Career Get SuccessFully.'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getclients = async (req, res) => {
  try {
         const page='client';
         // Map page name to corresponding fields
    const fieldsMap = {
        client: ['client_page_title', 'client_page_description','client_main_title'],
        download: ['download_page_title', 'download_page_description', 'download_page_section_title'],
        testimonial: ['testimonial_page_title', 'testimonial_page_description'],
        career: ['career_page_title', 'career_page_description', 'career_page_section_title']
    };

    const fields = fieldsMap[page];


    // Fetch the required fields dynamically
    const pageData = await PageTitle.findOne({}, fields.join(' ')); // Select specific fields
    const blogsdata = await Client.find({}).sort({ order: 1 });
    
    const response={
        clients:blogsdata,
        clientpage:pageData
    }
    res.json(success(response, 'Client Get SuccessFully.'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getteams = async (req, res) => {
  try {
       const page='team';
         // Map page name to corresponding fields
    const fieldsMap = {
        team: ['team_page_title', 'team_page_description'],
        download: ['download_page_title', 'download_page_description', 'download_page_section_title'],
        testimonial: ['testimonial_page_title', 'testimonial_page_description'],
        career: ['career_page_title', 'career_page_description', 'career_page_section_title']
    };

    const fields = fieldsMap[page];


    // Fetch the required fields dynamically
    const pageData = await PageTitle.findOne({}, fields.join(' ')); // Select specific fields
    const blogsdata = await Team.find({}).sort({ order: 1 });
     const response={
        page:pageData,
        teams:blogsdata
    }
    res.json(success(response, 'Team Get SuccessFully.'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getdownloads = async (req, res) => {
  try {
      const page='download';
         // Map page name to corresponding fields
    const fieldsMap = {
        team: ['team_page_title', 'team_page_description'],
        download: ['download_page_title', 'download_page_description', 'download_page_section_title'],
        testimonial: ['testimonial_page_title', 'testimonial_page_description'],
        career: ['career_page_title', 'career_page_description', 'career_page_section_title']
    };

    const fields = fieldsMap[page];


    // Fetch the required fields dynamically
    const pageData = await PageTitle.findOne({}, fields.join(' ')); // Select specific fields
    const blogsdata = await Download.find({}).sort({ order: 1 });
    const response={
        page:pageData,
        downloads:blogsdata
    }
    res.json(success(response, 'Download Get SuccessFully.'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const gethomepage = async (req, res) => {
  try {
      const blogsdata=await Home.findOne({"_id":'66fb7e2d419c8a43da4967cc'});
      const client=await Client.find({});
      const testimonial=await Testimonial.find({"format":"Youtube"});
      const blog = await Blog.find({ is_home_latest: true })
  .sort({ createdAt: -1 }) // newest first
  .limit(2);

      const response={
        homepage:blogsdata,
        client:client,
        testimonial:testimonial,
        blog:blog
      }
    res.json(success(response, 'Home Details Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getaboutpage = async (req, res) => {
  try {
      const blogsdata=await About.findOne({"_id":'66fb7e47419c8a43da4967cf'});
      const client=await Client.find({});
      const testimonial=await Testimonial.find({});

      const response={
        aboutpage:blogsdata,
        client:client,
        testimonial:testimonial
      }
    res.json(success(response, 'About Details Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const gettestimonials = async (req, res) => {
  try {
          const page='testimonial';
         // Map page name to corresponding fields
    const fieldsMap = {
        team: ['team_page_title', 'team_page_description'],
        download: ['download_page_title', 'download_page_description', 'download_page_section_title'],
        testimonial: ['testimonial_page_title', 'testimonial_page_description'],
        career: ['career_page_title', 'career_page_description', 'career_page_section_title']
    };

    const fields = fieldsMap[page];


    // Fetch the required fields dynamically
    const pageData = await PageTitle.findOne({}, fields.join(' ')); // Select specific fields
      const categories = await TestimonialCategory.find();

        const data = await Promise.all(
            categories.map(async (category) => {
                const testimonials = await Testimonial.find({ category_id: category._id });
                if (testimonials.length > 0) {
                    return {
                        ...category.toObject(),
                        testimonials,
                    };
                }
                return null;
            })
        );

        // Filter out null entries (categories without testimonials)
        const filteredData = data.filter((item) => item !== null);

 const response={
        page:pageData,
        testimonial:filteredData
    }
    res.json(success(response, 'Testimonials Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const hiperfomanceredic = async (req, res) => {
  try {
      const blogsdata=await HipRadicalPerf.findOne({"_id":'672c8e8eac74b0ae01e22327'}).populate('service_casestudy');
        const client=await Client.find({})
        const response={
            data:blogsdata,
            client:client
        }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const restructuring = async (req, res) => {
  try {
      const blogsdata=await Restructuring.findOne({"_id":'67319df9faa02cb3b60638fc'}).populate(['clients','service_casestudy']);

    res.json(success(blogsdata, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const energisinginnovation = async (req, res) => {
  try {
      const blogsdata=await EnergisingInnovation.findOne({"_id":'672c8e8dac74b0ae01e2231b'}).populate(['clients','service_casestudy']);

    res.json(success(blogsdata, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const vision = async (req, res) => {
  try {
      const blogsdata=await Vision.findOne({"_id":'672c8e8fac74b0ae01e22337'}).populate(['clients', 'testimonials','service_casestudy']);
      // const client=await Client.find({});
      // const testimonial=await Testimonial.find({"format":"Description"});
      const client=[];
      const testimonial=[];
      const response={
        service:blogsdata,
        clients:client,
         testimonial:testimonial
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const futurereadiness = async (req, res) => {
  try {
      const blogsdata=await FutureReadiness.findOne({"_id":'672c8e8eac74b0ae01e22323'}).populate(['clients','service_casestudy']);
      // const client=await Client.find({});
      const response={
        service:blogsdata,
        // clients:client
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const strategichr = async (req, res) => {
  try {
      const blogsdata=await StrategicHr.findOne({"_id":'6731a397faa02cb3b6063903'}).populate(['clients','service_casestudy']);
      // const client=await Client.find({});
      const response={
        service:blogsdata,
        // clients:client
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const competencymapping = async (req, res) => {
  try {
      const blogsdata=await CompetencyMapping.findOne({"_id":'672c8e8dac74b0ae01e22313'}).populate(['clients','service_casestudy']);
      // const client=await Client.find({});
      const method=await Methodology.find({});
      const response={
        service:blogsdata,
        // clients:client,
        methodology:method
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const competencybasedin = async (req, res) => {
  try {
      const blogsdata=await CompetencyBasedInterviewing.findOne({"_id":'672c8e8dac74b0ae01e22311'}).populate(['clients', 'testimonials','service_casestudy']);
      // const client=await Client.find({});
      // const testimonial=await Testimonial.find({});
      const response={
        service:blogsdata,
        // clients:client,
        // testimonial:testimonial,
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const hiperc = async (req, res) => {
  try {
      const blogsdata=await HiPerformanceConversations.findOne({"_id":'672c8e8eac74b0ae01e22325'}).populate(['clients', 'testimonials','service_casestudy']);
      // const client=await Client.find({});
      // const testimonial=await Testimonial.find({"format":"Description"});
      const response={
        service:blogsdata,
        // clients:client,
        // testimonial:testimonial
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const developmentcenters = async (req, res) => {
  try {
      const blogsdata=await DevelopmentCenters.findOne({"_id":'672c8e8dac74b0ae01e22319'}).populate(['clients', 'testimonials','service_casestudy']);
      // const client=await Client.find({});
      // const testimonial=await Testimonial.find({"format":"Description"});
      const faq=await DevelopmentCenterFaq.find({});
      const diffrences=await DevelopmentDifferentiators.find({});
      const components=await DevelopmentCenterComponents.find({});
      const response={
        service:blogsdata,
        // clients:client,
        // testimonial:testimonial,
        faq:faq,
        diffrences:diffrences,
        components:components
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const competencebuilding = async (req, res) => {
  try {
      const blogsdata=await CompetenceBuilding.findOne({"_id":'672c8e8dac74b0ae01e2230f'}).populate(['clients', 'testimonials','service_casestudy']);
      // const client=await Client.find({});
      // const testimonial=await Testimonial.find({"format":"Description"});
      const faq=await CompetenceBuildingFaq.find({});
      const diffrences=await CompetenceBuildingDifferentiators.find({});
      const components=await CompetenceBuildingComponent.find({});
      const response={
        service:blogsdata,
        // clients:client,
        // testimonial:testimonial,
        faq:faq,
        diffrences:diffrences,
        components:components
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const hrexcellence = async (req, res) => {
  try {
      const blogsdata=await HRExcellence.findOne({"_id":'672c8e8eac74b0ae01e22329'}).populate(['clients','service_casestudy']);
      const response={
        service:blogsdata
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const storehrexeform = async (req, res) => {
  try {
    const { name,email,company } = req.body;
    const newContact = new HrExeForm({ name,email,company });
    await newContact.save();
    res.json(success([], 'Form Submitted SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const assesmentcenters = async (req, res) => {
  try {
      const blogsdata=await AssesmentCenters.findOne({"_id":'672c8e8dac74b0ae01e2230d'}).populate(['clients','testimonials','service_casestudy']);

      const leaderdevelopment =await LDevelopmentCenter.find({});

      const application=await AssesmentApplication.find({});

      const quality=await AssesmentQuality.find({});

      const response={
        service:blogsdata,
        leaderdevelopment:leaderdevelopment,
        application:application,
        quality:quality
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const threesixtydegreefeedback = async (req, res) => {
  try {
      const blogsdata=await FeedbackCenters.findOne({"_id":'672c8e8eac74b0ae01e2231f'}).populate(['clients','testimonials','service_casestudy']);
      const leaderdevelopment =await LDevelopmentCenter.find({});
      const smart =await Smart360.find({});
      const most =await MostFeedback.find({});

      const application=await FeedbackApplication.find({});

      const quality=await FeedbackQuality.find({});

      const response={
        service:blogsdata,
        leaderdevelopment:leaderdevelopment,
        application:application,
        quality:quality,
        smart360:smart,
        mostfeedback:most,
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const talentassessment = async (req, res) => {
  try {
      const blogsdata=await TalentAssessment.findOne({"_id":'672c8e8fac74b0ae01e22335'}).populate(['clients','testimonials','service_casestudy']);
      const talent=await TalentAssement.find({});
      const developmentcenter=await SDevelopmentCenter.find({});
      const application =await Application.find({});
      const benchmark=await Benchmark.find({});
    //   const client=await Client.find({})
      // const testimonial=await Testimonial.find({});
      
      const response={
        service:blogsdata,
        talent:talent,
        developmentcenter:developmentcenter,
        application:application,
        benchmark:benchmark,
        // client:client,
        // testimonial:testimonial

      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};

const leadershipexcellence = async (req, res) => {
  try {
      const blogsdata=await LeadershipExcellence.findOne({"_id":'672c8e8eac74b0ae01e2232f'}).populate(['clients', 'testimonials','service_casestudy']);
      // const client=await Client.find({});
      // const testimonial=await Testimonial.find({"format":"Description"});
      const leaderdevelopment =await LDevelopmentCenter.find({});
      const edge=await LeadershipExcellenceEdge.find({});
      
      const response={
        service:blogsdata,
        // client:client,
        // testimonial:testimonial,
        leaderdevelopment:leaderdevelopment,
        edge:edge
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const futureleaders = async (req, res) => {
  try {
      const blogsdata=await FutureLeaders.findOne({"_id":'672c8e8eac74b0ae01e22321'}).populate(['clients','service_casestudy']);
      // const client=await Client.find({});
      const process=await FutureLeadersProcess.find({});
      const edge=await FutureLeadersEdge.find({});
      
      const response={
        service:blogsdata,
        // client:client,
        process:process,
        edge:edge
      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const executivecoaching = async (req, res) => {
  try {
      const blogsdata=await ExecutiveCoaching.findOne({"_id":'672c8e8dac74b0ae01e2231d'}).populate(['clients','service_casestudy']);
     
    res.json(success(blogsdata, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const leadershipdevelopment = async (req, res) => {
  try {
      const blogsdata=await LeadershipDevelopment.findOne({"_id":'672c8e8eac74b0ae01e2232d'}).populate(['clients', 'testimonials','service_casestudy']);
      // const client=await Client.find({});
      // const testimonial=await Testimonial.find({"format":"Description"});

      const faq=await LeadershipDevelopmentFaq.find({});

      const diffrent=await LeadershipDevelopmentDifferentiators.find({});

      const component=await LeadershipDevelopmentComponent.find({});


      const response={
        service:blogsdata,
        // client:client,
        // testimonial:testimonial,
        faq:faq,
        diffrent:diffrent,
        component:component

      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const cxoselections = async (req, res) => {
  try {
      const blogsdata=await CXOSelections.findOne({"_id":'672c8e8dac74b0ae01e22315'}).populate(['clients','service_casestudy']);
      // const client=await Client.find({});

      const experince=await CXOExperience.find({});

      const faq=await CXOFaq.find({});



      const response={
        service:blogsdata,
        // client:client,
        experince:experince,
        faq:faq

      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getserviceimages = async (req, res) => {
  try {

      const hi        = await HipRadicalPerf.findOne({ _id: '672c8e8eac74b0ae01e22327' });
const le        = await LeadershipExcellence.findOne({ _id: '672c8e8eac74b0ae01e2232f' });
const sh        = await StrategicHr.findOne({ _id: '6731a397faa02cb3b6063903' });
const rs        = await Restructuring.findOne({ _id: '67319df9faa02cb3b60638fc' });
const ei        = await EnergisingInnovation.findOne({ _id: '672c8e8dac74b0ae01e2231b' });
const vs        = await Vision.findOne({ _id: '672c8e8fac74b0ae01e22337' });
const fr        = await FutureReadiness.findOne({ _id: '672c8e8eac74b0ae01e22323' });
const cm        = await CompetencyMapping.findOne({ _id: '672c8e8dac74b0ae01e22313' });
const cbi       = await CompetencyBasedInterviewing.findOne({ _id: '672c8e8dac74b0ae01e22311' });
const hpc       = await HiPerformanceConversations.findOne({ _id: '672c8e8eac74b0ae01e22325' });
const dc        = await DevelopmentCenters.findOne({ _id: '672c8e8dac74b0ae01e22319' });
const cb        = await CompetenceBuilding.findOne({ _id: '672c8e8dac74b0ae01e2230f' });
const hre       = await HRExcellence.findOne({ _id: '672c8e8eac74b0ae01e22329' });
const ac        = await AssesmentCenters.findOne({ _id: '672c8e8dac74b0ae01e2230d' });
const fc        = await FeedbackCenters.findOne({ _id: '672c8e8eac74b0ae01e2231f' });
const ta        = await TalentAssessment.findOne({ _id: '672c8e8fac74b0ae01e22335' });
const fl        = await FutureLeaders.findOne({ _id: '672c8e8eac74b0ae01e22321' });
const ec        = await ExecutiveCoaching.findOne({ _id: '672c8e8dac74b0ae01e2231d' });
const ld        = await LeadershipDevelopment.findOne({ _id: '672c8e8eac74b0ae01e2232d' });
const cxo       = await CXOSelections.findOne({ _id: '672c8e8dac74b0ae01e22315' });
const lb        = await Leadershipbenchmarking.findOne({ _id: '672c8e8eac74b0ae01e2232b' });
const dpe       = await dealerpersonnelexcellence.findOne({ _id: '672c8e8dac74b0ae01e22317' });
const hf        = await Hiperforg.findOne({ _id: '673a3b4c67a8a749f8bad5fe' });

const response = {
  hi_prf_img: hi?.bg_image,
  leadership_ex: le?.bg_image,
  strategic_hr: sh?.bg_image,
  restructuring: rs?.bg_image,
  energising_innovation: ei?.bg_image,
  vision: vs?.bg_image,
  future_readiness: fr?.bg_image,
  competency_mapping: cm?.bg_image,
  competency_based_interviewing: cbi?.bg_image,
  hi_performance_conversations: hpc?.bg_image,
  development_centers: dc?.bg_image,
  competence_building: cb?.bg_image,
  hr_excellence: hre?.bg_image,
  assesment_centers: ac?.bg_image,
  feedback_centers: fc?.bg_image,
  talent_assessment: ta?.bg_image,
  future_leaders: fl?.bg_image,
  executive_coaching: ec?.bg_image,
  leadership_development: ld?.bg_image,
  cxo_selections: cxo?.bg_image,
  leadership_benchmarking: lb?.bg_image,
  dealer_personnel_excellence: dpe?.bg_image,
  hiperforg: hf?.bg_image
};

    res.json(success(response, 'Service Page Images Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getservicedes = async (req, res) => {
  try {

    const hi  = await HipRadicalPerf.findOne({ _id: '672c8e8eac74b0ae01e22327' });
    const le  = await LeadershipExcellence.findOne({ _id: '672c8e8eac74b0ae01e2232f' });
    const sh  = await StrategicHr.findOne({ _id: '6731a397faa02cb3b6063903' });
    const rs  = await Restructuring.findOne({ _id: '67319df9faa02cb3b60638fc' });
    const ei  = await EnergisingInnovation.findOne({ _id: '672c8e8dac74b0ae01e2231b' });
    const vs  = await Vision.findOne({ _id: '672c8e8fac74b0ae01e22337' });
    const fr  = await FutureReadiness.findOne({ _id: '672c8e8eac74b0ae01e22323' });
    const cm  = await CompetencyMapping.findOne({ _id: '672c8e8dac74b0ae01e22313' });
    const cbi = await CompetencyBasedInterviewing.findOne({ _id: '672c8e8dac74b0ae01e22311' });
    const hpc = await HiPerformanceConversations.findOne({ _id: '672c8e8eac74b0ae01e22325' });
    const dc  = await DevelopmentCenters.findOne({ _id: '672c8e8dac74b0ae01e22319' });
    const cb  = await CompetenceBuilding.findOne({ _id: '672c8e8dac74b0ae01e2230f' });
    const hre = await HRExcellence.findOne({ _id: '672c8e8eac74b0ae01e22329' });
    const ac  = await AssesmentCenters.findOne({ _id: '672c8e8dac74b0ae01e2230d' });
    const fc  = await FeedbackCenters.findOne({ _id: '672c8e8eac74b0ae01e2231f' });
    const ta  = await TalentAssessment.findOne({ _id: '672c8e8fac74b0ae01e22335' });
    const fl  = await FutureLeaders.findOne({ _id: '672c8e8eac74b0ae01e22321' });
    const ec  = await ExecutiveCoaching.findOne({ _id: '672c8e8dac74b0ae01e2231d' });
    const ld  = await LeadershipDevelopment.findOne({ _id: '672c8e8eac74b0ae01e2232d' });
    const cxo = await CXOSelections.findOne({ _id: '672c8e8dac74b0ae01e22315' });
    const lb  = await Leadershipbenchmarking.findOne({ _id: '672c8e8eac74b0ae01e2232b' });
    const dpe = await dealerpersonnelexcellence.findOne({ _id: '672c8e8dac74b0ae01e22317' });
    const hf  = await Hiperforg.findOne({ _id: '673a3b4c67a8a749f8bad5fe' });

    const response = {
      hi_prf_des: hi?.description,
      leadership_ex_des: le?.description,
      strategic_hr_des: sh?.description,
      restructuring_des: rs?.description,
      energising_innovation_des: ei?.description,
      vision_des: vs?.description,
      future_readiness_des: fr?.description,
      competency_mapping_des: cm?.description,
      competency_based_interviewing_des: cbi?.description,
      hi_performance_conversations_des: hpc?.description,
      development_centers_des: dc?.description,
      competence_building_des: cb?.description,
      hr_excellence_des: hre?.description,
      assesment_centers_des: ac?.description,
      feedback_centers_des: fc?.description,
      talent_assessment_des: ta?.description,
      future_leaders_des: fl?.description,
      executive_coaching_des: ec?.description,
      leadership_development_des: ld?.description,
      cxo_selections_des: cxo?.description,
      leadership_benchmarking_des: lb?.description,
      dealer_personnel_excellence_des: dpe?.description,
      hiperforg_des: hf?.description
    };

    res.json(
      success(response, 'Service Page Descriptions Get Successfully.')
    );

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const leadershipbenchmarking = async (req, res) => {
  try {
      const blogsdata=await Leadershipbenchmarking.findOne({"_id":'672c8e8eac74b0ae01e2232b'}).populate(['clients', 'testimonials','service_casestudy']);
      // const client=await Client.find({});
      // const testimonial=await Testimonial.find({"format":"Description"});
      const leaderdevelopment =await LDevelopmentCenter.find({});

      const application=await LeadershipBenchmarkApplications.find({});

      const quality=await LeadershipBenchmarkQuality.find({});



      const response={
        service:blogsdata,
        // client:client,
        leaderdevelopment:leaderdevelopment,
        // testimonial:testimonial,
        quality:quality,
        application:application

      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const dealerpersonnelexcellences = async (req, res) => {
  try {
      const blogsdata=await dealerpersonnelexcellence.findOne({"_id":'672c8e8dac74b0ae01e22317'}).populate(['clients', 'testimonials','service_casestudy']);
      // const client=await Client.find({});
      // const testimonial=await Testimonial.find({"format":"Description"});



      const response={
        service:blogsdata,
        // client:client,
        // testimonial:testimonial,

      }
    res.json(success(response, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const hiperforg = async (req, res) => {
  try {
      const blogsdata=await Hiperforg.findOne({"_id":'673a3b4c67a8a749f8bad5fe'}).populate(['clients','service_casestudy']);

    res.json(success(blogsdata, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};
const services = async (req, res) => {
  try {
      const blogsdata=await MainService.findOne({"_id":'673b35278b38d799f1ed7505'});

    res.json(success(blogsdata, 'Service Page Get SuccessFully.'));

  } catch (error) {
    res.status(400).send(error.message);
  }
};

const pagetitles = async (req, res) => {
  try {
    

    // Fetch the required fields dynamically
    const pageData = await PageTitle.findOne({"_id":"673a3e4167a8a749f8bad601"}); // Select specific fields

    if (!pageData) {
        return res.status(404).json({ success: false, message: 'No data found for the specified page.' });
    }
    res.json(success(pageData, 'Page Title And Images Get SuccessFully.'));

} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
}
};
  module.exports = {
    storecontactapi,gethomepage,getaboutpage,storenewsapi,getservicedes,getserviceimages,getblogs,getcontactpage,blogdetails,dynamicservice,dynamicservicedetails,getdownloads,getclients,getteams,applycareerform,gettestimonials
    ,hiperfomanceredic,restructuring,energisinginnovation,vision,futurereadiness,strategichr,competencymapping,competencybasedin,hiperc,developmentcenters,
    competencebuilding,hrexcellence,storehrexeform,assesmentcenters,threesixtydegreefeedback,talentassessment,leadershipexcellence,getcasestudies,casestudiesdetails,
    futureleaders,executivecoaching,leadershipdevelopment,cxoselections,leadershipbenchmarking,dealerpersonnelexcellences,hiperforg,pagetitles,careerpage,services
  }