const app = require('express').Router();
const path = require('path');
const multer = require('multer');
const {verifyToken} =require('../middleware/auth.js');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'public/files'),
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
        },
    }),
    limits: { fileSize: 1024 * 1024 * 100 },
});

const {
    apisecurityservicepages,
    apisecurityservicepage,
    apiapplicationservicepages,
    apiapplicationservicepage,
    apisecurityservicepagebyid,
    apicreatesecurityservicepage,
    apiupdatesecurityservicepage,
    apideletesecurityservicepage,
} = require('../src/controllers/SecurityServicePageController');
const {
   gethomepage,getaboutpage,getblogs,blogdetails,getservicedes,getserviceimages,dynamicservice,dynamicservicedetails,careerpage,getcontactpage,getdownloads,getclients,getteams,storecontactapi,gettestimonials,
   hiperfomanceredic,restructuring,energisinginnovation,vision,futurereadiness,strategichr,competencymapping,competencybasedin,hiperforg,
   hiperc,developmentcenters,competencebuilding,hrexcellence,storehrexeform,assesmentcenters,threesixtydegreefeedback,talentassessment,getcasestudies,casestudiesdetails,
   leadershipexcellence,futureleaders,executivecoaching,leadershipdevelopment,cxoselections,leadershipbenchmarking,dealerpersonnelexcellences,pagetitles,services
} = require('../src/controllers/ApiController');

app.get('/gethomepage',gethomepage);
app.post('/getblogs',getblogs);
app.post('/blogdetails',blogdetails);

app.post('/getcasestudies',getcasestudies);
app.get('/getcontactpage',getcontactpage);
app.post('/casestudiesdetails',casestudiesdetails);

app.get('/dynamicservice',dynamicservice);
app.get('/securityservicepages', apisecurityservicepages);
app.get('/applicationservicepages', apiapplicationservicepages);
app.get('/applicationservicepage/:slug', apiapplicationservicepage);
app.get('/securityservicepage/id/:id', apisecurityservicepagebyid);
app.get('/securityservicepage/:slug', apisecurityservicepage);
app.post('/securityservicepage', upload.any(), apicreatesecurityservicepage);
app.put('/securityservicepage/:id', upload.any(), apiupdatesecurityservicepage);
app.delete('/securityservicepage/:id', apideletesecurityservicepage);
app.get('/getservicedes',getservicedes);
app.get('/getserviceimages',getserviceimages);
app.post('/dynamicservicedetails',dynamicservicedetails);


app.get('/careerpage',careerpage);
app.get('/getclients',getclients);
app.get('/getdownloads',getdownloads);
app.get('/getaboutpage',getaboutpage);
app.get('/getteams',getteams);
app.get('/gettestimonials',gettestimonials);

app.post('/storecontactapi',storecontactapi);



app.get('/radical_perf',hiperfomanceredic);
app.get('/restructuring',restructuring);
app.get('/energising_innovation',energisinginnovation);
app.get('/visioning',vision);
app.get('/future_readiness',futurereadiness);
app.get('/strategic-hr',strategichr);
app.get('/competency_mapping',competencymapping);


app.get('/competency_based_interviewing',competencybasedin);
app.get('/hi-perf_conversations',hiperc);   
app.get('/development_centers',developmentcenters);
app.get('/competence_building',competencebuilding);
app.get('/hr_excellence',hrexcellence);
app.post('/storehrexeform',storehrexeform);
app.get('/assesment_centers',assesmentcenters);
app.get('/threesixty_degree_feedback',threesixtydegreefeedback);
app.get('/talent_assessment',talentassessment);

app.get('/leadership-excellence',leadershipexcellence);
app.get('/future_leaders',futureleaders);
app.get('/executive_coaching',executivecoaching);
app.get('/leadership_development',leadershipdevelopment);
app.get('/cxo_selections',cxoselections);
app.get('/leadership_benchmarking',leadershipbenchmarking);
app.get('/dealer_personnel_excellence',dealerpersonnelexcellences);
app.get('/hi-performance-organizations',hiperforg);
app.get('/services',services);

app.get('/pagetitles',pagetitles);


module.exports = app;