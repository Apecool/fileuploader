// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../config/multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Upload a single file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    req.user = { id: 1 }; // Use the ID of the test user

    if (!req.user) {
      return res.status(403).send('User not authenticated.');
    }

    const file = req.file;
    // Save file details to the database
    await prisma.file.create({
      data: {
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
        url: `/uploads/${file.filename}`,
        authorId: req.user.id,
      }
    });
    res.redirect('/files'); // Redirect to a page listing files
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/upload', (req, res) => {
  res.render('upload', { title: 'Upload File' });
})

// List files
router.get('/files', async (req, res) => {
  try {
    const files = await prisma.file.findMany();
    res.render('files', { files });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Download a file
router.get('/files/:id/download', async (req, res) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: Number(req.params.id) }
    });
    res.download(file.path, file.filename);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// View file details
router.get('/files/:id', async (req, res) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: Number(req.params.id) }
    });
    res.render('fileDetails', { file });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
