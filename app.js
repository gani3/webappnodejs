const express = require('express');
const expressLayout = require('express-ejs-layouts');
const {
  bacaFile,
  detailkontak
} = require('./utils/contact')
const app = express();
const port = 3000;

//menggunakan view express dan layouting ejs
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('assets'));

// koneksi server
app.listen(port, () => {
  console.log(`Untuk akses server bisa menggunakan http://localhost:${port}`);
});

// routing akses web
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Webapps Nodejs',
    judul: 'Halaman Home',
    layout: 'layout/main'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Webapps Nodejs',
    judul: 'Halaman About',
    layout: 'layout/main'
  });
});

app.get('/contact/list', (req, res) => {
  const bacafile = bacaFile();
  res.render('contact/list', {
    title: 'Webapps Nodejs',
    judul: 'Halaman contact',
    bacafile,
    layout: 'layout/main'
  });
})

app.get('/contact/list/:nama', (req, res) => {
  const detail = detailkontak(req.params.nama);
  res.render('contact/detail', {
    title: 'Webapps Nodejs',
    judul: 'Detail Kontak',
    detail,
    layout: 'layout/main'
  });
})

app.get('/contact/tambah', (req, res) => {
  res.render('contact/tambah', {
    title: 'Webapps Nodejs',
    judul: 'Tambah Kontak',
    layout: 'layout/main'
  });
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('file tidak ditemukan');
});