require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk'); // Require AWS SDK for S3

const app = express();
const PORT = process.env.PORT || 8086;

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

// Configure AWS SDK with your S3 credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();

// Set up Multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

app.listen(PORT, (err, data) => {
  if (err)
    console.log(`Server not connected :${err}`)
  else
    console.log(`Server is connected on ${PORT}`)
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`MongoDB Connected on MongoDB Cluster`)
  })
  .catch((err) => {
    console.log(`MongoDB Not Connected Problem: ${err}`)
  });

const myschema = new mongoose.Schema({
  name: String,
  branch: String,
  rno: Number,
  imagePath: String // Add a property for the image path
});

const mymodel = new mongoose.model('students', myschema);

app.get('/showdata', (req, res) => {
  mymodel.find({}).then((data) => {
    res.send(data);
  });
});

app.get('/showdata/:rno', (req, res) => {
  mymodel.findOne({rno:req.params.rno}).then((data) => {
    res.send(data);
  });
});

app.use(express.urlencoded({ extended: false }));

app.post('/submitdata', upload.single('image'), async (req, res) => {
    try {
      const { name, branch, rno } = req.body;
  
      // Upload the file to S3 bucket without specifying ACL
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${Date.now()}-${req.file.originalname}`,
        Body: req.file.buffer,
      };
  
      const uploadedObject = await s3.upload(params).promise();
  
      // Create a new document with the S3 image URL
      const newData = new mymodel({
        name,
        branch,
        rno,
        imagePath: uploadedObject.Location,
      });
  
      // Save the document to the database
      await newData.save();
  
      res.send(newData);
    } catch (error) {
      console.error('Error submitting data to MongoDB and S3:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.get('/reg', (req, res) => {
  res.sendFile(__dirname + '/Register.html');
});

app.get('/', (req, res) => {
  res.send(`This response from Express`);
});
