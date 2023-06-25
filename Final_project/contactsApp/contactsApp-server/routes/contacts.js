var express = require('express');
var mongo = require('mongodb');
const { request } = require('../app');
var router = express.Router();

//MongoURL
const url = 'mongodb://localhost:27017';


router.get('/', async(req, res) => {

    try {
        const dbConnect = await mongo.MongoClient.connect(url);
        const contactsDb = dbConnect.db('contactsDb');
        const contacts = contactsDb.collection('contacts');
        const contactsList = await contacts.find().toArray();
        res.json(contactsList)
    
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.options('/', function(req, res) {

})

router.post('/', async (req, res) => {    

    const dbConnect = await mongo.MongoClient.connect(url);
    const contactsDb = dbConnect.db('contactsDb');
    const contacts = contactsDb.collection('contacts');
    const contactsList = await contacts.find().toArray();


    const newContactInfo = req.body;
    newContactInfo.id = parseInt((contactsList.length) + 1);   

    console.log(newContactInfo.id)

    const newContact = await contacts.insertOne(newContactInfo);


    res.send(newContact);

})

router.patch('/:id', async (req, res) => {
    const contactId = parseInt(req.params.id);
    const updatedContactInfo = req.body;

    const dbConnect = await mongo.MongoClient.connect(url);
    const contactsDb = dbConnect.db('contactsDb');
    const contacts = contactsDb.collection('contacts');

    const updatedContact = await contacts.findOneAndUpdate(
        { id: contactId },
        { $set: updatedContactInfo },
        { returnOriginal: false }
      );

    // Checking if the Patch is done.

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found and not updated' });
    }

    res.json(updatedContact);
})


router.delete('/:id', async(req, res)=>{
    
    let contactId = parseInt(req.params.id);

    const dbConnect = await mongo.MongoClient.connect(url);
    const contactsDb = dbConnect.db('contactsDb');
    const contacts = contactsDb.collection('contacts');

    const deleteContact = contacts.deleteOne({id : contactId});


    if (!deleteContact) {
        return res.status(404).json({ message: 'Contact not found and not updated' });
      }
  
      res.json({message : 'Contact deleted successfully.'});

})

router.get('/export', async(req, res, next) => {

    const dbConnect = await mongo.MongoClient.connect(url);
    const contactsDb = dbConnect.db('contactsDb');
    const contacts = contactsDb.collection('contacts');
    let contactList = await contacts.find().toArray();

    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(contactList));

});


module.exports = router;





