const express = require('express');
const expressLayout = require('express-ejs-layouts');
const {
  bacaFile,
  detailkontak,
  tambahKontak,
  hapusKontak,
  cekDuplikat
} = require('./utils/contact')
const app = express();
const {
  body,
  validationResult,
  check
} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const port = 8080;

//menggunakan view express dan layouting ejs
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('assets'));


// konfigurasi flash
app.use(cookieParser('secret'));

app.use(session({
  cookie: {
    maxAge: 6000
  },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
// melakukan parsing data agar bisa di baca di body
app.use(express.urlencoded({
  extended: true
}));
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
    layout: 'layout/main',
    msg: req.flash('msg')
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
  const errors = [];
  res.render('contact/tambah', {
    title: 'Webapps Nodejs',
    judul: 'Tambah Kontak',
    errors: errors,
    layout: 'layout/main'
  });
});

app.post('/contact/tambah', [
    body('nohp').custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error('Sudah terdaftar');
      }
      return true;
    }),
    check('email', 'Email Tidak Valid').isEmail(),
    check('nohp', 'Nomor Hp Tidak Valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('contact/tambah', {
        title: 'Webapps Nodejs',
        judul: 'Tambah Kontak',
        errors: errors.array(),
        layout: 'layout/main',
      });
    }
    tambahKontak(req.body);
    req.flash('msg', 'Data kontak telah di tambahkan')
    res.redirect('/contact/list');
  });


app.use('/', (req, res) => {
  res.status(404);
  res.send('file tidak ditemukan');
});