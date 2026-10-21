const express = require('express');
const session = require('express-session')
const path = require('path');
const hbs = require('hbs');
const csv = require('csv-parser');
var https = require("https");
const ExcelJS = require('exceljs');
var fs = require("fs");
const {verifyToken} =require(path.join(__dirname, '/middleware/auth.js'));
const xlsxPopulate = require('xlsx-populate');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const flash=require('connect-flash');
const multer = require('multer');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser'),toastr = require('express-toastr');
var busboy = require('connect-busboy');
const indexs = require('./routes/apiroutes')
const admin = require('./routes/admin')
const dynamicCrud = require('./routes/dynamicCrud')
const { userLogin,contactforms,users } = require(path.join(__dirname, 'src/controllers/userController'));
const { blog,blogs,blogcreate,storeblog,deleteblog} = require(path.join(__dirname, 'src/controllers/BlogController'));
const { smart360,smart360s,smart360create,storesmart360,deletesmart360} = require(path.join(__dirname, 'src/controllers/SmartController'));
const { casestudy,casestudys,casestudycreate,storecasestudy,deletecasestudy} = require(path.join(__dirname, 'src/controllers/CaseStudyController'));
const { talentassement,talentassements,talentassementcreate,storetalentassement,deletetalentassement} = require(path.join(__dirname, 'src/controllers/TalentController'));
const { methodology,methodologys,methodologycreate,storemethodology,deletemethodology} = require(path.join(__dirname, 'src/controllers/MethodologyController'));
const { blogcategory,blogcategorys,blogcategorycreate,storeblogcategory,deleteblogcategory} = require(path.join(__dirname, 'src/controllers/BlogCategoryController'));
const { casecategory,casecategorys,casecategorycreate,storecasecategory,deletecasecategory} = require(path.join(__dirname, 'src/controllers/CaseCategoryController'));
const { application,applications,applicationcreate,storeapplication,deleteapplication} = require(path.join(__dirname, 'src/controllers/ApplicationController'));
const { benchmark,benchmarks,benchmarkcreate,storebenchmark,deletebenchmark} = require(path.join(__dirname, 'src/controllers/BenchmarkController'));
const { mainservice,mainservicestore,service1, service1store, service2, service2store, service3, service3store, service4, service4store, service5, service5store, service6, service6store, service7, service7store, service8, service8store, service9, service9store, service10, service10store, service11, service11store, service12, service12store, service13, service13store, service14, service14store, service15, service15store, service16, service16store, service17, service17store, service18, service18store,service19, service19store,service20, service20store,service21, service21store,service22, service22store,service23, service23store
} = require(path.join(__dirname, 'src/controllers/ServiceAllController'));
const { career,careers,careercreate,storecareer,deletecareer,careerform,careerforms} = require(path.join(__dirname, 'src/controllers/CareerController'));
const { testimonialcategory,testimonialcategorys,testimonialcategorycreate,storetestimonialcategory,deletetestimonialcategory} = require(path.join(__dirname, 'src/controllers/TestimonialCategoryController'));
const { client,clients,clientcreate,storeclient,deleteclient} = require(path.join(__dirname, 'src/controllers/ClientController'));
const { download,downloads,downloadcreate,storedownload,deletedownload} = require(path.join(__dirname, 'src/controllers/DownloadController'));
const { dynamicservice,dynamicservices,dynamicservicecreate,storedynamicservice,deletedynamicservice} = require(path.join(__dirname, 'src/controllers/DynamicServiceController'));
const { securityservicepage,securityservicepages,securityservicecreate,storesecurityservicepage,deletesecurityservicepage,applicationservicepage,applicationservicepages,applicationservicecreate} = require(path.join(__dirname, 'src/controllers/SecurityServicePageController'));
const { team,teamcreate,storeteam,deleteteam,teams} = require(path.join(__dirname, 'src/controllers/TeamController'));
const { service,services,servicecreate,storeservice,deleteservice} = require(path.join(__dirname, 'src/controllers/ServiceController'));
const { servicecategory,servicecategorys,servicecategorycreate,storeservicecategory,deleteservicecategory} = require(path.join(__dirname, 'src/controllers/ServiceCategoryController'));
const { product,productcreate,storeproduct,attributecreate,attribute,deleteproduct,productsdata} = require(path.join(__dirname, 'src/controllers/ProductController'));
const { categoriescreate,categories} = require(path.join(__dirname, 'src/controllers/CategoryController'));
const { descriptioncreate,description} = require(path.join(__dirname, 'src/controllers/DescriptionController'));
const { homeSettings,homepagestore,aboutSettings,aboutpagestore,pagetitle,pagetitlestore,careerpage,careerpagestore,contactpage,contactpagestore} = require(path.join(__dirname, 'src/controllers/HomeController'));
const { generalsetting,generalsettingstore,contact,contactdata} = require(path.join(__dirname, 'src/controllers/GeneralSettingController'));
const { testimonial,testimonialcreate,storetestimonial,deletetestimonial,testimonials} = require(path.join(__dirname, 'src/controllers/TestimonialController'));
const { list, view, createOrUpdate, deleteEntry } = require(path.join(__dirname, 'src/controllers/sDevelopmentCenterController'));
const { llist, lview, lcreateOrUpdate, ldeleteEntry } = require(path.join(__dirname, 'src/controllers/lDevelopmentCenterController'));
const { applycareerform } = require(path.join(__dirname, 'src/controllers/ApiController'));
const {
    process,
    processCreate,
    faq,
    faqCreate,
    audience,
    audienceCreate,
    benefit,
    benefitCreate,
    offering,
    offeringcreate
} = require(path.join(__dirname, 'src/controllers/BaseController'));

const User = require(path.join(__dirname, 'src/models/User'));



const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
}); 
  
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype=='video/mp4'
        || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
// const storage = multer.memoryStorage();
const upload = multer({ storage: storage,limits: { fileSize: 1024 * 1024 * 100 }});

const authMiddleware = (req, res, next) => {

    // let token = req.session.userId;
        let token =1;
    if (token) {

        next();
    } else {
        res.redirect('/admin-login');
    }

};
router.use(authMiddleware);

const app = express();
app.use(busboy());
app.use(cookieParser('secret'));


app.use(toastr());
app.use(flash());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ limit: '100mb',extended: true }));


app.use(session({
    secret: 'beyondbackend', resave: true, maxAge: new Date(Date.now() + 3600000), //1 Hour
    expires: new Date(Date.now() + 3600000), saveUninitialized: true
}));
require('./db');
app.set('view engine', 'hbs');

const templatePath = path.join(__dirname, 'templates/views');
const templatePartials = path.join(__dirname, 'templates/partials');
hbs.registerPartials(templatePartials);
hbs.registerHelper('jsonString', function(array) {
    return JSON.stringify(array);
  });
  hbs.registerHelper('contains', function (array, value, options) {
    return (array.indexOf(value) !== -1) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('someFieldIsFile', function(fields) {
    return fields.some(field => field.type === 'File');
  });
app.use('*/css', express.static('public/assets/css'));
app.use('*/certificate', express.static('public/certificate'));
app.use('*/geeks', express.static('public/geeks'));
app.use('*/public/files', express.static('public/files'));
app.use('*/js', express.static('public/assets/js'));
app.use('*/img', express.static('public/assets/img'));
app.use('*/vendor', express.static('public/assets/vendor'));
app.use('*/fonts', express.static('public/assets/fonts'));

app.use('*/css', express.static('public/admin/assets/css'));
app.use('*/js', express.static('public/admin/assets/js'));
app.use('*/img', express.static('public/admin/assets/img'));
app.use('*/vendor', express.static('public/admin/assets/vendor'));
app.use('*/fonts', express.static('public/admin/assets/fonts'));

app.use('*/admin', express.static('public/admin'));

app.use(cors());
// app.use(bodyParser.json());
app.set('views', templatePath);
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

hbs.registerHelper('url', function(block) {
    return "http://localhost:5000/"; //just return global variable value
  });
 hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

hbs.registerHelper('getDynamicValue', (data, prefix, index, field) => {
    return data[`${prefix}_${index}_${field}`] || '';
  });

  hbs.registerHelper('getDynamicValues', (data, prefix, index) => {
    return data[`${prefix}_${index}`] || '';
  });

hbs.registerHelper("link", function(text, options) {
    var attributes = [];

    Object.keys(options.hash).forEach(key => {
        var escapedKey = hbs.Utils.escapeExpression(key);
        var escapedValue = hbs.Utils.escapeExpression(options.hash[key]);
        attributes.push(escapedKey + '="' + escapedValue + '"');
    });
    var escapedText = hbs.Utils.escapeExpression(text);
    
    var escapedOutput ="<a " + attributes.join(" ") + ">" + escapedText + "</a>";
    return new hbs.SafeString(escapedOutput);
});
hbs.registerHelper('contains', function (value, array) {
    return Array.isArray(array) && array.includes(value) ? 'selected' : '';
});     
hbs.registerHelper('isSelected', function(id, relatedProducts) {
    if (relatedProducts && relatedProducts.includes(id)) {
        return new hbs.SafeString('selected');
    } else {
        return '';
    }
});
hbs.registerHelper('encodeMyString',function(inputData){
    return new hbs.SafeString(inputData);
});
hbs.registerHelper('eq', function (a,b) {
	if(a==b){
	    return true;
	}
});
hbs.registerHelper('breaklines', function(text) {
    text = hbs.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new hbs.SafeString(text);
});

app.use(async function  (req, res, next)
{
    
    res.locals.toasts = req.toastr.render();
    next();
});

app.get('/admin-login', (req, res) => { res.render('admin/login',{error:flash('error')}) });
app.post('/admin-login-post', userLogin);
router.get('/dashboard', (req, res, next) => {
    res.render('admin/dashboard');

});
app.get('/users', users);
app.get('/contactpage', contactpage);
app.post('/storecontactpage',contactpagestore);
app.get('/product', product);
app.get('/products-data', productsdata);
app.get('/createproduct/:id?', productcreate);
app.post('/storeproduct',upload.any(), storeproduct);

app.post('/attributecreate',upload.single('attr_image'), attributecreate);
app.get('/deleteproduct/:id?', deleteproduct);

app.get('/categories', categories);
app.post('/categoriescreate', categoriescreate);

app.get('/description', description);
app.get('/attribute', attribute);
app.post('/descriptioncreate', descriptioncreate);

app.get('/generalsetting/:id?', generalsetting);
app.post('/generalsettingstore', generalsettingstore);
app.get('/careerform', careerform);
app.get('/careerforms', careerforms);

app.get('/blog', blog);
app.route('/blogs')
   .get(blogs)   // DataTable fetch
   .post(blogs);
app.get('/createblog/:id?', blogcreate);
app.post('/storeblog',upload.single("image"), storeblog);
app.get('/deleteblog/:id?', deleteblog);

app.get('/casestudy', casestudy);
app.get('/casestudys', casestudys);
app.get('/createcasestudy/:id?', casestudycreate);
app.post('/storecasestudy',upload.single("image"), storecasestudy);
app.get('/deletecasestudy/:id?', deletecasestudy);

app.get('/smart360', smart360);
app.get('/smart360s', smart360s);
app.get('/createsmart360/:id?', smart360create);
app.post('/storesmart360',upload.single("image"), storesmart360);
app.get('/deletesmart360/:id?', deletesmart360);





app.get('/methodology', methodology);
app.get('/methodologys', methodologys);
app.get('/createmethodology/:id?', methodologycreate);
app.post('/storemethodology', storemethodology);
app.get('/deletemethodology/:id?', deletemethodology);




app.get('/sdevelopmentCenter', list);  // List all entries
app.get('/sdevelopmentCenternew/:id?', view);  // View create/edit form
app.post('/sdevelopmentCenter', upload.single("image"), createOrUpdate); // Create or update entry
app.get('/sdevelopmentCenter/delete/:id', deleteEntry); // Delete entry

app.get('/ldevelopmentCenter', llist);  // List all entries
app.get('/ldevelopmentCenternew/:id?', lview);  // View create/edit form
app.post('/ldevelopmentCenter', upload.single("image"), lcreateOrUpdate); // Create or update entry
app.get('/ldevelopmentCenter/delete/:id', ldeleteEntry); // Delete entry

app.get('/application', application);
app.get('/applications', applications);
app.get('/createapplication/:id?', applicationcreate);
app.post('/storeapplication',storeapplication);
app.get('/deleteapplication/:id?', deleteapplication);

app.get('/benchmark', benchmark);
app.get('/benchmarks', benchmarks);
app.get('/createbenchmark/:id?', benchmarkcreate);
app.post('/storebenchmark',storebenchmark);
app.get('/deletebenchmark/:id?', deletebenchmark);

app.get('/talentassement', talentassement);
app.get('/talentassements', talentassements);
app.get('/createtalentassement/:id?', talentassementcreate);
app.post('/storetalentassement',upload.any(),storetalentassement);
app.get('/deletetalentassement/:id?', deletetalentassement);

app.get('/career', career);
app.get('/careers', careers);
app.get('/createcareer/:id?', careercreate);
app.post('/storecareer',storecareer);
app.get('/deletecareer/:id?', deletecareer);

app.get('/testimonialcategory', testimonialcategory);
app.get('/testimonialcategorys', testimonialcategorys);
app.get('/createtestimonialcategory/:id?', testimonialcategorycreate);
app.post('/storetestimonialcategory',storetestimonialcategory);
app.get('/deletetestimonialcategory/:id?', deletetestimonialcategory);

app.get('/blogcategory', blogcategory);
app.get('/blogcategorys', blogcategorys);
app.get('/createblogcategory/:id?', blogcategorycreate);
app.post('/storeblogcategory',storeblogcategory);
app.get('/deleteblogcategory/:id?', deleteblogcategory);

app.get('/casecategory', casecategory);
app.get('/casecategorys', casecategorys);
app.get('/createcasecategory/:id?', casecategorycreate);
app.post('/storecasecategory',storecasecategory);
app.get('/deletecasecategory/:id?', deletecasecategory);

app.get('/testimonial', testimonial);
app.get('/testimonials', testimonials);
app.get('/createtestimonial/:id?', testimonialcreate);
app.post('/storetestimonial',upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'client_logo', maxCount: 1 }
  ]), storetestimonial);
app.get('/deletetestimonial/:id?', deletetestimonial);

app.get('/team', team);
app.route('/teams')
   .get(teams)   // DataTable fetch
   .post(teams);
app.get('/createteam/:id?', teamcreate);
app.post('/storeteam',upload.single("image"), storeteam);
app.get('/deleteteam/:id?', deleteteam);

app.get('/homesettings/:id?', homeSettings);
var multiplefileuploadhome=upload.fields([{name:'slide_image_1'},{name:'slide_image_2'},{name:'slide_image_3'},{name:'sec_1_image'},{name:'sec_2_image'},{name:'sec_3_image'},{name:'video'},{name:'image_1'},{name:'image_2'},{name:'image_3'},{name:'diffrent_image_1'},{name:'diffrent_image_2'},{name:'diffrent_image_3'},{name:'diffrent_image_4'}]);
app.post('/homepagestore',multiplefileuploadhome, homepagestore);

app.get('/aboutsettings/:id?', aboutSettings);
app.post('/aboutpagestore',upload.any(), aboutpagestore);

app.get('/pagetitle/:id?', pagetitle);
app.post('/pagetitlestore',upload.any(), pagetitlestore);

app.get('/careerpage/:id?', careerpage);
app.post('/careerpagestore', careerpagestore);

app.get('/service1/:id?', service1);
app.post('/service1store',upload.any(), service1store);

app.get('/service2/:id?', service2);
app.post('/service2store',upload.any(), service2store);

app.get('/service3/:id?', service3);
app.post('/service3store',upload.any(), service3store);

app.get('/mainservice/:id?', mainservice);
app.post('/mainservicestore',upload.any(), mainservicestore);

app.get('/service4/:id?', service4);
app.post('/service4store',upload.any(), service4store);

app.get('/service5/:id?', service5);
app.post('/service5store',upload.any(), service5store);

app.get('/service6/:id?', service6);
app.post('/service6store',upload.any(), service6store);

app.get('/service7/:id?', service7);
app.post('/service7store',upload.any(), service7store);

app.get('/service8/:id?', service8);
app.post('/service8store',upload.any(), service8store);

app.get('/service9/:id?', service9);
app.post('/service9store',upload.any(), service9store);

app.get('/service10/:id?', service10);
app.post('/service10store',upload.any(), service10store);

app.get('/service11/:id?', service11);
app.post('/service11store',upload.any(), service11store);

app.get('/service12/:id?', service12);
app.post('/service12store',upload.any(), service12store);

app.get('/service13/:id?', service13);
app.post('/service13store',upload.any(), service13store);

app.get('/service14/:id?', service14);
app.post('/service14store',upload.any(), service14store);

app.get('/service15/:id?', service15);
app.post('/service15store',upload.any(), service15store);

app.get('/service16/:id?', service16);
app.post('/service16store',upload.any(), service16store);

app.get('/service17/:id?', service17);
app.post('/service17store',upload.any(), service17store);

app.get('/service18/:id?', service18);
app.post('/service18store',upload.any(), service18store);

app.get('/service19/:id?', service19);
app.post('/service19store',upload.any(), service19store);

app.get('/service20/:id?', service20);
app.post('/service20store',upload.any(), service20store);

app.get('/service21/:id?', service21);
app.post('/service21store',upload.any(), service21store);

app.get('/service22/:id?', service22);
app.post('/storevision',upload.any(), service22store);

app.get('/service23/:id?', service23);
app.post('/service23store',upload.any(), service23store);

app.get('/client', client);
app.route('/clients')
   .get(clients)   // DataTable fetch
   .post(clients);
app.get('/createclient/:id?', clientcreate);
app.post('/storeclient',upload.single("image"), storeclient);
app.get('/deleteclient/:id?', deleteclient);

app.get('/download', download);
app.route('/downloads')
   .get(downloads)   // DataTable fetch
   .post(downloads);
app.get('/createdownload/:id?', downloadcreate);
app.post('/storedownload',upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'download_file', maxCount: 1 }
  ]), storedownload);
app.get('/deletedownload/:id?', deletedownload);

app.get('/dynamicservice', dynamicservice);
app.get('/dynamicservices',dynamicservices)
app.get('/createdynamicservice/:id?', dynamicservicecreate);
app.post('/storedynamicservice',upload.any(), storedynamicservice);
app.get('/deletedynamicservice/:id?', deletedynamicservice);

app.get('/securityservicepage', securityservicepage);
app.get('/securityservicepages', securityservicepages);
app.get('/createsecurityservicepage/:id?', securityservicecreate);
app.post('/storesecurityservicepage', upload.any(), storesecurityservicepage);
app.get('/deletesecurityservicepage/:id?', deletesecurityservicepage);

app.get('/applicationservicepage', applicationservicepage);
app.get('/applicationservicepages', applicationservicepages);
app.get('/createapplicationservicepage/:id?', applicationservicecreate);
app.post('/storeapplicationservicepage', upload.any(), storesecurityservicepage);
app.get('/deleteapplicationservicepage/:id?', deletesecurityservicepage);

app.get('/service', service);
app.get('/services', services);
app.get('/createservice/:id?', servicecreate);
app.post('/storeservice',upload.single("image"), storeservice);
app.get('/deleteservice/:id?', deleteservice);

app.get('/servicecategory', servicecategory);
app.get('/servicecategorys', servicecategorys);
app.get('/createservicecategory/:id?', servicecategorycreate);
app.post('/storeservicecategory',upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]), storeservicecategory);
app.get('/deleteservicecategory/:id?', deleteservicecategory);



app.get('/process', process); // Endpoint for retrieving processes
app.post('/process/create',upload.single('image'), processCreate); // Endpoint for creating processes

app.get('/faq', faq); // Endpoint for retrieving FAQs
app.post('/faq/create', faqCreate); // Endpoint for creating FAQs

app.get('/audience', audience); // Endpoint for retrieving audiences
app.post('/audience/create',upload.single('image'), audienceCreate); // Endpoint for creating audiences

app.get('/benefit', benefit); // Endpoint for retrieving benefits
app.post('/benefit/create',upload.single('image'), benefitCreate); // Endpoint for creating benefits

app.get('/testimonial', testimonial);
app.post('/testimonial/create',upload.single('image'),testimonialcreate);

app.get('/offering', offering);
app.post('/offering/create',offeringcreate);


app.get('/contact', contact);
app.get('/contactdata', contactdata);

app.use('', router);
app.post('/api/applycareerform',upload.single("cv"),applycareerform);
// app.post('/api/updateprofile',verifyToken,updateprofile);
// app.post('/api/updateprofileimage',verifyToken,upload.single('profile'),updateprofileimage);
// app.post('/api/submitassignment',upload.single("assignment"),verifyToken,submitassignment);
app.use('/api',indexs);
app.use('',admin);
app.use('/dynamic',dynamicCrud);
app.listen('8005', () => { console.log('Started..') });