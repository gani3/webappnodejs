const express = require('express');
const expressLayout = require('express-ejs-layouts');
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

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Webapps Nodejs',
    judul: 'Halaman contact',
    layout: 'layout/main'
  });
})

app.use('/', (req, res) => {
  res.status(404);
  res.send('file tidak ditemukan');
});