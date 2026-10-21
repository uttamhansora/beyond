'use strict';

const AssesmentCenters = require('../models/Service/AssesmentCenters');
const CompetenceBuilding = require('../models/Service/CompetenceBuilding');
const CompetencyBasedInterviewing = require('../models/Service/CompetencyBasedInterviewing');
const CompetencyMapping = require('../models/Service/CompetencyMapping');
const CXOSelections = require('../models/Service/CXOSelections');
const dealerpersonnelexcellence = require('../models/Service/dealerpersonnelexcellence');
const DevelopmentCenters = require('../models/Service/DevelopmentCenters');
const EnergisingInnovation = require('../models/Service/EnergisingInnovation');
const ExecutiveCoaching = require('../models/Service/ExecutiveCoaching');
const FeedbackCenters = require('../models/Service/FeedbackCenters');
const FutureLeaders = require('../models/Service/FutureLeaders');
const FutureReadiness = require('../models/Service/FutureReadiness');
const HiPerformanceConversations = require('../models/Service/HiPerformanceConversations');
const HipRadicalPerf = require('../models/Service/HipRadicalPerf');
const HRExcellence = require('../models/Service/HRExcellence');
const Leadershipbenchmarking = require('../models/Service/Leadershipbenchmarking');
const LeadershipDevelopment = require('../models/Service/LeadershipDevelopment');
const LeadershipExcellence = require('../models/Service/LeadershipExcellence');
const Restructuring = require('../models/Service/Restructuring');
const StrategicHr = require('../models/Service/StrategicHr');
const TalentAssessment = require('../models/Service/TalentAssessment');
const Hiperforg = require('../models/Service/Hiperforg');
const Vision = require('../models/Service/Vision');
const MainService = require('../models/MainService');
const mongoose = require('mongoose');
const Client = require('../models/Client');
const Testimonial = require('../models/Testimonial');
const ServiceCategory = require('../models/ServiceCategory');


const getFilePath = (files, fieldName, ogval) => {
    const file = files.find(f => f.fieldname === fieldName);
    return file ? file.path : ogval.fieldname;
};


const service1 = async (req, res) => {
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
    const casestudy=await ServiceCategory.find({});
    let teamid = req.params.id;
    if (teamid) {
        let team = await AssesmentCenters.findById(teamid);
        res.render(`admin/service1`, { casestudy,team,testimonial,client });
    } else {
        res.render(`admin/service1`,{casestudy,testimonial,client});
    }

};
const service2 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await CompetenceBuilding.findById(teamid);
        res.render(`admin/service2`, { casestudy,testimonial,team,client });
    } else {
        res.render(`admin/service2`,{casestudy,testimonial,client});
    }

};
const service3 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
    const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await CompetencyBasedInterviewing.findById(teamid);
        res.render(`admin/service3`, { casestudy,testimonial,team, edge: [1, 2, 3, 4],client });
    } else {
        res.render(`admin/service3`, { casestudy,testimonial,edge: [1, 2, 3, 4],client });
    }

};
const service4 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await CompetencyMapping.findById(teamid);
        res.render(`admin/service4`, {casestudy, client,team, map: [1, 2, 3, 4], diff: [1, 2, 3] });
    } else {
        res.render(`admin/service4`, { casestudy,client,map: [1, 2, 3, 4], diff: [1, 2, 3] });
    }

};
const service5 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await CXOSelections.findById(teamid);
        res.render(`admin/service5`, { casestudy,client,team, hiring: [1, 2, 3, 4], variant: [1, 2, 3, 4], delive: [2, 3], contract: [2, 3, 4, 5], pricing: [1, 2, 3] });
    } else {
        res.render(`admin/service5`, { casestudy,client,team: {}, hiring: [1, 2, 3, 4], variant: [1, 2, 3, 4], delive: [2, 3], contract: [2, 3, 4, 5], pricing: [1, 2, 3] });
    }

};
const service6 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await dealerpersonnelexcellence.findById(teamid);
        res.render(`admin/service6`, { casestudy,testimonial,team,client });
    } else {
        res.render(`admin/service6`,{casestudy,testimonial,client});
    }

};

const service7 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await DevelopmentCenters.findById(teamid);
        res.render(`admin/service7`, { casestudy,testimonial,team,client });
    } else {
        res.render(`admin/service7`,{casestudy,testimonial,client});
    }

};
const service8 = async (req, res) => {

    let teamid = req.params.id;
    const casestudy=await ServiceCategory.find({});
    const client=await Client.find({});
    if (teamid) {
        let team = await EnergisingInnovation.findById(teamid);
        res.render(`admin/service8`, { casestudy,team,client });
    } else {
        res.render(`admin/service8`,{casestudy,client});
    }

};
const service9 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await ExecutiveCoaching.findById(teamid);
        res.render(`admin/service9`, {casestudy, team,client });
    } else {
        res.render(`admin/service9`,{casestudy,client});
    }

};
const service10 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const casestudy=await ServiceCategory.find({});
    const testimonial=await Testimonial.find({});

    if (teamid) {
        let team = await FeedbackCenters.findById(teamid);
        res.render(`admin/service10`, { casestudy,team,client,testimonial });
    } else {
        res.render(`admin/service10`,{casestudy,client,testimonial});
    }

};
const service11 = async (req, res) => {

    let teamid = req.params.id;

    const client=await Client.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await FutureLeaders.findById(teamid);
        res.render(`admin/service11`, { casestudy,team,client });
    } else {
        res.render(`admin/service11`,{casestudy,client});
    }

};
const service12 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await FutureReadiness.findById(teamid);
        res.render(`admin/service12`, { casestudy,team, outcome: [1, 2, 3, 4], delive: [1, 2, 3],client });
    } else {
        res.render(`admin/service12`, {casestudy, outcome: [1, 2, 3, 4], delive: [1, 2, 3],client });
    }

};
const service13 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await HiPerformanceConversations.findById(teamid);
        res.render(`admin/service13`, {casestudy, testimonial,team, advantage: [1, 2, 3, 4], vari: [1, 2, 3],client });
    } else {
        res.render(`admin/service13`, {casestudy, testimonial,advantage: [1, 2, 3, 4], vari: [1, 2, 3],client });
    }

};
const service14 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await HipRadicalPerf.findById(teamid);
        res.render(`admin/service14`, {casestudy, team,client });
    } else {
        res.render(`admin/service14`,{casestudy,client});
    }

};
const service15 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await HRExcellence.findById(teamid);
        res.render(`admin/service15`, { casestudy,team,client });
    } else {
        res.render(`admin/service15`,{casestudy,client});
    }

};
const service16 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await Leadershipbenchmarking.findById(teamid);
        res.render(`admin/service16`, { casestudy,testimonial,team,client });
    } else {
        res.render(`admin/service16`,{casestudy,testimonial,client});
    }

};
const service17 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await LeadershipDevelopment.findById(teamid);
        res.render(`admin/service17`, { casestudy,testimonial,team,client });
    } else {
        res.render(`admin/service17`,{casestudy,testimonial,client});
    }

};
const service18 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await LeadershipExcellence.findById(teamid);
        res.render(`admin/service18`, { casestudy,testimonial,team,client });
    } else {
        res.render(`admin/service18`,{casestudy,testimonial,client});
    }

};
const service19 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await Restructuring.findById(teamid);
        res.render(`admin/service19`, { casestudy,team,client });
    } else {
        res.render(`admin/service19`,{casestudy,client});
    }

};
const service20 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const casestudy=await ServiceCategory.find({});

    if (teamid) {
        let team = await StrategicHr.findById(teamid);
        res.render(`admin/service20`, {casestudy, team,client });
    } else {
        res.render(`admin/service20`,{casestudy,client});
    }

};
const service21 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
    const casestudy=await ServiceCategory.find({});

    if (teamid) {
        let team = await TalentAssessment.findById(teamid);
        res.render(`admin/service21`, { casestudy,testimonial,team,client });
    } else {
        res.render(`admin/service21`,{casestudy,testimonial,client});
    }

};
const service23 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await Hiperforg.findById(teamid);
        res.render(`admin/service23`, {casestudy,client, team });
    } else {
        res.render(`admin/service23`,{casestudy,client});
    }

};
const mainservice = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const casestudy=await ServiceCategory.find({});
    if (teamid) {
        let team = await MainService.findById(teamid);
        res.render(`admin/mainservice`, {casestudy, team });
    } else {
        res.render(`admin/mainservice`,{casestudy});
    }

};
const service22 = async (req, res) => {

    let teamid = req.params.id;
    const client=await Client.find({});
    const testimonial=await Testimonial.find({});
    const casestudy=await ServiceCategory.find({});

    if (teamid) {
        let vision = await Vision.findById(teamid);
        res.render(`admin/service22`, {casestudy, testimonial,client,vision, experienceNumbers: [1, 2, 3], edge: [1, 2, 3, 4], keystep: [1, 2, 3, 4, 5], outcome: [1, 2, 3], journey: [1, 2, 3, 4, 5, 6, 7, 8] });
    } else {
        res.render(`admin/service22`, {casestudy, testimonial,client,experienceNumbers: [1, 2, 3], edge: [1, 2, 3, 4], keystep: [1, 2, 3, 4, 5], outcome: [1, 2, 3], journey: [1, 2, 3, 4, 5, 6, 7, 8] });
    }

};



const renderService = async () => {
    try {
        // Loop through each service and save it dynamically
        for (let service of services) {
            const newService = new Service({
                serviceId: service.serviceId,
                serviceType: service.serviceType,
                serviceName: service.serviceName,
                data: {} // Add dynamic data here if needed
            });

            await newService.save();
        }
        console.log('Services saved successfully!');
    } catch (error) {
        console.error('Error saving services:', error);
    }
};







// Store Code Started From Here 













const service1store = async (req, res) => {


    try {
        if (req.body.id) {
            const team = await AssesmentCenters.findById(req.body.id);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            req.body.br_pdf = getFilePath(req.files, 'br_pdf', team);
            let body = req.body;
            await team.updateOne(body);
            res.redirect('/dashboard');
        } else {
            let body = req.body;
            const team = new AssesmentCenters(req.body);
            let response = await AssesmentCenters(body);
            await team.save();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

};

const service2store = async (req, res) => {



    try {

        const team = await CompetenceBuilding.findOne({ "_id": "672c8e8dac74b0ae01e2230f" });
        req.body.section_1_image = getFilePath(req.files, 'section_1_image', team);
        req.body.section_2_image = getFilePath(req.files, 'section_2_image', team);
        req.body.br_pdf = getFilePath(req.files, 'br_pdf', team);
        req.body.bg_image = getFilePath(req.files, 'bg_image', team);

        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }

};

const service3store = async (req, res) => {
    try {
        const team = await CompetencyBasedInterviewing.findOne({ "_id": "672c8e8dac74b0ae01e22311" });
        req.body.edge_1_image = getFilePath(req.files, 'edge_1_image', team);
        req.body.edge_2_image = getFilePath(req.files, 'edge_2_image', team);
        req.body.edge_3_image = getFilePath(req.files, 'edge_3_image', team);
        req.body.edge_4_image = getFilePath(req.files, 'edge_4_image', team);
        req.body.profiency_image = getFilePath(req.files, 'profiency_image', team);
        req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        req.body.br_pdf = getFilePath(req.files, 'br_pdf', team);
        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(400).send(error.message);
    }

};

const service4store = async (req, res) => {
    try {
        const team = await CompetencyMapping.findOne({ "_id": "672c8e8dac74b0ae01e22313" });
        req.body.diffrence_image_1 = getFilePath(req.files, 'diffrence_image_1', team);
        req.body.diffrence_image_2 = getFilePath(req.files, 'diffrence_image_2', team);
        req.body.diffrence_image_3 = getFilePath(req.files, 'diffrence_image_3', team);
        req.body.mapping_section_image = getFilePath(req.files, 'mapping_section_image', team);
        req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        req.body.br_pdf = getFilePath(req.files, 'br_pdf', team);
        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }

};

const service5store = async (req, res) => {
    try {
        const team = await CXOSelections.findOne({ "_id": "672c8e8dac74b0ae01e22315" });
        req.body.section_1_image = getFilePath(req.files, 'section_1_image', team);
        req.body.section_2_image = getFilePath(req.files, 'section_2_image', team);
        req.body.section_3_image = getFilePath(req.files, 'section_3_image', team);
        req.body.benchmark_1_image = getFilePath(req.files, 'benchmark_1_image', team);
        req.body.benchmark_2_image = getFilePath(req.files, 'benchmark_2_image', team);
        req.body.benchmark_3_image = getFilePath(req.files, 'benchmark_3_image', team);
        req.body.benchmark_4_image = getFilePath(req.files, 'benchmark_4_image', team);
        req.body.contract_1_image = getFilePath(req.files, 'contract_1_image', team);
        req.body.contract_2_image = getFilePath(req.files, 'contract_2_image', team);
        req.body.contract_3_image = getFilePath(req.files, 'contract_3_image', team);
        req.body.contract_4_image = getFilePath(req.files, 'contract_4_image', team);
        req.body.contract_5_image = getFilePath(req.files, 'contract_5_image', team);
        req.body.deliverable_1_image = getFilePath(req.files, 'deliverable_1_image', team);
        req.body.deliverable_2_image = getFilePath(req.files, 'deliverable_2_image', team);
        req.body.deliverable_3_image = getFilePath(req.files, 'deliverable_3_image', team);
        req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }


};

const service6store = async (req, res) => {
    try {

        const team = await dealerpersonnelexcellence.findOne({ "_id": "672c8e8dac74b0ae01e22317" });
        req.body.icon_1_image = getFilePath(req.files, 'icon_1_image', team);
        req.body.icon_2_image = getFilePath(req.files, 'icon_2_image', team);
        req.body.icon_3_image = getFilePath(req.files, 'icon_3_image', team);
        req.body.icon_4_image = getFilePath(req.files, 'icon_4_image', team);
        req.body.overview_image = getFilePath(req.files, 'overview_image', team);
        req.body.component_1_image = getFilePath(req.files, 'component_1_image', team);
        req.body.component_2_image = getFilePath(req.files, 'component_2_image', team);
        req.body.component_3_image = getFilePath(req.files, 'component_3_image', team);
        req.body.component_4_image = getFilePath(req.files, 'component_4_image', team);
        req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        req.body.br_pdf = getFilePath(req.files, 'br_pdf', team);
        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }



};

const service7store = async (req, res) => {



    try {

        const team = await DevelopmentCenters.findOne({ "_id": "672c8e8dac74b0ae01e22319" });
        req.body.section_1_image = getFilePath(req.files, 'section_1_image', team);
        req.body.section_2_image = getFilePath(req.files, 'section_2_image', team);
        req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        req.body.br_pdf = getFilePath(req.files, 'br_pdf', team);
        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }


};


const service8store = async (req, res) => {
    try {
        if (req.body.id) {
            const team = await EnergisingInnovation.findById(req.body.id);
            req.body.ns_image = getFilePath(req.files, 'ns_image', team);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            let body = req.body;
            await team.updateOne(body);
            res.redirect('/dashboard');
        } else {
            let body = req.body;
            const team = new EnergisingInnovation(req.body);
            let response = await EnergisingInnovation(body);
            await team.save();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }


};

const service9store = async (req, res) => {
    try {
        if (req.body.id) {
            const team = await ExecutiveCoaching.findById(req.body.id);
            req.body.ns_image = getFilePath(req.files, 'ns_image', team);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            let body = req.body;
            await team.updateOne(body);
            res.redirect('/dashboard');
        } else {
            let body = req.body;
            const team = new ExecutiveCoaching(req.body);
            let response = await ExecutiveCoaching(body);
            await team.save();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }


};

const service10store = async (req, res) => {

    try {
        if (req.body.id) {
            const team = await FeedbackCenters.findById(req.body.id);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            req.body.offer_1_image = getFilePath(req.files, 'offer_1_image', team);
            req.body.offer_2_image = getFilePath(req.files, 'offer_2_image', team);
            req.body.offer_3_image = getFilePath(req.files, 'offer_3_image', team);
            let body = req.body;
            await team.updateOne(body);
            res.redirect('/dashboard');
        } else {
            let body = req.body;
            const team = new FeedbackCenters(req.body);
            let response = await FeedbackCenters(body);
            await team.save();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }


};
const mainservicestore = async (req, res) => {

    try {
        if (req.body.id) {
            const team = await MainService.findById(req.body.id);
            req.body.image_1 = getFilePath(req.files, 'image_1', team);
            req.body.image_2 = getFilePath(req.files, 'image_2', team);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            let body = req.body;
            await team.updateOne(body);
            res.redirect('/dashboard');
        } else {
            let body = req.body;
            const team = new MainService(req.body);
            let response = await MainService(body);
            await team.save();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }


};

const service11store = async (req, res) => {

    try {

        const team = await FutureLeaders.findOne({ "_id": "672c8e8eac74b0ae01e22321" });
        req.body.section_1_image = getFilePath(req.files, 'section_1_image', team);
        req.body.identify_1_image = getFilePath(req.files, 'identify_1_image', team);
        req.body.identify_2_image = getFilePath(req.files, 'identify_2_image', team);
        req.body.identify_3_image = getFilePath(req.files, 'identify_3_image', team);
req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }

};

const service12store = async (req, res) => {


    try {

        const team = await FutureReadiness.findOne({ "_id": "672c8e8eac74b0ae01e22323" });

        req.body.outcome_1_image = getFilePath(req.files, 'outcome_1_image', team);
        req.body.outcome_2_image = getFilePath(req.files, 'outcome_2_image', team);
        req.body.outcome_3_image = getFilePath(req.files, 'outcome_3_image', team);
        req.body.outcome_4_image = getFilePath(req.files, 'outcome_4_image', team);
req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        req.body.deliverables_1_image = getFilePath(req.files, 'deliverables_1_image', team);
        req.body.deliverables_2_image = getFilePath(req.files, 'deliverables_2_image', team);
        req.body.deliverables_3_image = getFilePath(req.files, 'deliverables_3_image', team);

        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }

};

const service13store = async (req, res) => {



    try {

        const team = await HiPerformanceConversations.findOne({ "_id": "672c8e8eac74b0ae01e22325" });
        req.body.advantage_image_1 = getFilePath(req.files, 'advantage_image_1', team);
        req.body.br_pdf = getFilePath(req.files, 'br_pdf', team);
        req.body.advantage_image_2 = getFilePath(req.files, 'advantage_image_2', team);
        req.body.advantage_image_3 = getFilePath(req.files, 'advantage_image_3', team);
        req.body.advantage_image_4 = getFilePath(req.files, 'advantage_image_4', team);
        req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }

};

const service14store = async (req, res) => {
    try {
        if (req.body.id) {
            const team = await HipRadicalPerf.findById(req.body.id);
            req.body.ns_image = getFilePath(req.files, 'ns_image', team);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            let body = req.body;
            await team.updateOne(body);
            res.redirect('/dashboard');
        } else {
            let body = req.body;
            const team = new HipRadicalPerf(req.body);
            let response = await HipRadicalPerf(body);
            await team.save();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const service15store = async (req, res) => {



    try {

        const team = await HRExcellence.findOne({ "_id": "672c8e8eac74b0ae01e22329" });
        req.body.section_1_image = getFilePath(req.files, 'section_1_image', team);
req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }

};

const service16store = async (req, res) => {


    try {

        const team = await Leadershipbenchmarking.findOne({ "_id": "672c8e8eac74b0ae01e2232b" });
        req.body.section_1_image = getFilePath(req.files, 'section_1_image', team);
        req.body.offer_1_image = getFilePath(req.files, 'offer_1_image', team);
        req.body.br_pdf = getFilePath(req.files, 'br_pdf', team);
        req.body.offer_2_image = getFilePath(req.files, 'offer_2_image', team);
        req.body.offer_3_image = getFilePath(req.files, 'offer_3_image', team);
        req.body.quaity_image = getFilePath(req.files, 'quaity_image', team);
        req.body.deliverables_1_image = getFilePath(req.files, 'deliverables_1_image', team);
        req.body.deliverables_2_image = getFilePath(req.files, 'deliverables_2_image', team);
        req.body.deliverables_3_image = getFilePath(req.files, 'deliverables_3_image', team);

        req.body.offer_2_download_file = getFilePath(req.files, 'offer_2_download_file', team);
        req.body.offer_1_download_file = getFilePath(req.files, 'offer_1_download_file', team);
        req.body.offer_3_download_file = getFilePath(req.files, 'offer_3_download_file', team);
req.body.bg_image = getFilePath(req.files, 'bg_image', team);

        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }

};


const service17store = async (req, res) => {
    try {

        const team = await LeadershipDevelopment.findOne({ "_id": "672c8e8eac74b0ae01e2232d" });
        req.body.section_1_image = getFilePath(req.files, 'section_1_image', team);
        req.body.section_2_image = getFilePath(req.files, 'section_2_image', team);
        req.body.bg_image = getFilePath(req.files, 'bg_image', team);

        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }


};

const service18store = async (req, res) => {
    try {
        if (req.body.id) {
            const team = await LeadershipExcellence.findById(req.body.id);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            let body = req.body;
            await team.updateOne(body);
            res.redirect('/dashboard');
        } else {
            let body = req.body;
            const team = new LeadershipExcellence(req.body);
            let response = await LeadershipExcellence(body);
            await team.save();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }


};

const service19store = async (req, res) => {

    try {
        if (req.body.id) {
            const team = await Restructuring.findById(req.body.id);
            req.body.ns_image = getFilePath(req.files, 'ns_image', team);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            let body = req.body;
            await team.updateOne(body);
            res.redirect('/dashboard');
        } else {
            let body = req.body;
            const team = new Restructuring(req.body);
            let response = await Restructuring(body);
            await team.save();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }


};
const service23store = async (req, res) => {

    try {
        if (req.body.id) {
            const team = await Hiperforg.findById(req.body.id);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            let body = req.body;
            await team.updateOne(body);
            res.redirect('/dashboard');
        } else {
            let body = req.body;
            const team = new Hiperforg(req.body);
            let response = await Hiperforg(body);
            await team.save();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }


};

const service20store = async (req, res) => {

    try {
        if (req.body.id) {
            const team = await StrategicHr.findById(req.body.id);
            req.body.bg_image = getFilePath(req.files, 'bg_image', team);
            let body = req.body;
            await team.updateOne(body);
            res.redirect('/dashboard');
        } else {
            let body = req.body;
            const team = new StrategicHr(req.body);
            let response = await StrategicHr(body);
            await team.save();
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

};

const service21store = async (req, res) => {
    try {

        const team = await TalentAssessment.findOne({ "_id": "672c8e8fac74b0ae01e22335" });
        req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        req.body.br_pdf = getFilePath(req.files, 'br_pdf', team);
        req.body.section_1_image = getFilePath(req.files, 'section_1_image', team);
        req.body.section_2_image = getFilePath(req.files, 'section_2_image', team);
        req.body.deliverable_image_1 = getFilePath(req.files, 'deliverable_image_1', team);
        req.body.deliverable_image_2 = getFilePath(req.files, 'deliverable_image_2', team);
        req.body.deliverable_image_3 = getFilePath(req.files, 'deliverable_image_3', team);

        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }

};

const service22store = async (req, res) => {
    try {

        const team = await Vision.findOne({ "_id": "672c8e8fac74b0ae01e22337" });
        req.body.bg_image = getFilePath(req.files, 'bg_image', team);
        req.body.stock_performance_image = getFilePath(req.files, 'stock_performance_image', team);
        req.body.profitability_image = getFilePath(req.files, 'profitability_image', team);
        req.body.vision_image = getFilePath(req.files, 'vision_image', team);
        req.body.experince_1_image = getFilePath(req.files, 'experince_1_image', team);
        req.body.experince_2_image = getFilePath(req.files, 'experince_2_image', team);
        req.body.experince_3_image = getFilePath(req.files, 'experince_3_image', team);

        req.body.outcome_1_image = getFilePath(req.files, 'outcome_1_image', team);
        req.body.outcome_2_image = getFilePath(req.files, 'outcome_2_image', team);
        req.body.outcome_3_image = getFilePath(req.files, 'outcome_3_image', team);

        req.body.edge_1_image = getFilePath(req.files, 'edge_1_image', team);
        req.body.edge_2_image = getFilePath(req.files, 'edge_2_image', team);
        req.body.edge_3_image = getFilePath(req.files, 'edge_3_image', team);
        req.body.edge_4_image = getFilePath(req.files, 'edge_4_image', team);
        console.log(req.body.edge_4_image);
        req.body.journey_1_image = getFilePath(req.files, 'journey_1_image', team);
        req.body.journey_2_image = getFilePath(req.files, 'journey_2_image', team);
        req.body.journey_3_image = getFilePath(req.files, 'journey_3_image', team);
        req.body.journey_4_image = getFilePath(req.files, 'journey_4_image', team);
        req.body.journey_5_image = getFilePath(req.files, 'journey_5_image', team);
        req.body.journey_6_image = getFilePath(req.files, 'journey_6_image', team);
        req.body.journey_7_image = getFilePath(req.files, 'journey_7_image', team);
        req.body.journey_8_image = getFilePath(req.files, 'journey_8_image', team);
        let body = req.body;
        await team.updateOne(body);
        res.redirect('/dashboard');

    } catch (error) {
        res.status(400).send(error.message);
    }

};

module.exports = {
    mainservice,mainservicestore,service1, service1store, service2, service2store, service3, service3store, service4, service4store, service5, service5store, service6, service6store, service7, service7store, service8, service8store, service9, service9store, service10, service10store, service11, service11store, service12, service12store, service13, service13store, service14, service14store, service15, service15store, service16, service16store, service17, service17store, service18, service18store, service19, service19store, service20, service20store, service21, service21store, service22, service22store,service23, service23store


}