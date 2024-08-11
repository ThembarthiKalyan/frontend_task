const bodyParser = require('body-parser');
const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const LeadModel = require('./models/leadModel');
const app=express();
app.use(cors());
app.use(bodyParser());

mongoose.connect('mongodb://0.0.0.0:27017/lead-task');

app.post('/create-lead', async(req, res)=>{
    try{
        const body = req.body ? req.body : '';
        let obj = {
            name: body.name,
            email: body.email,
            number: body.number,
            products: body.products
        }
    
        await LeadModel.create(obj);
        res.send({
            status: 'success',
            message: 'Lead created'
        });
    } catch (e) {
        res.send({
            status: 'failed',
            message: e.message
        });

    }

})

app.get('/all-lead', async(req, res)=>{
    try{
        const Lead = await LeadModel.find({}).lean();
        res.send({
            status: 'success',
            data: Lead
        })
    } catch (e) {
        res.send({
            status: 'failed',
            message: e.message
        });

    }
})

app.put("/edit/:id", async(req, res)=>{
    try{
        const _id =req.params.id
        const body = req.body;
        const lead = await LeadModel.findByIdAndUpdate(_id, body);
        res.send({status: 'success', message: 'Lead fields updated successfully'});

    } catch (e) {
        res.send({
            status: 'failed',
            message: e.message
        });

    }
})

app.delete("/delete/:id", async(req, res)=>{
    try{
        const _id =req.params.id
        const lead = await LeadModel.findByIdAndDelete(_id);
        res.send({status: 'success', message: 'Field deleted'});

    } catch (e) {
        res.send({
            status: 'failed',
            message: e.message
        });

    }
})

app.listen('3070', console.log("server running port 3070"));