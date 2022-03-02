const fs = require('fs');
// const validator = require('validator');

//membuat folder data jika belum ada
const dirPath = './data';

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const file = './data/contact.json';
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, '[]', 'utf-8');
}

const bacaFile = () => {
  const ambilfile = fs.readFileSync('data/contact.json', 'utf-8');
  const contact = JSON.parse(ambilfile);
  return contact;
}

// mencari data kontak yang sesuai dengan param yang dikirim
const detailkontak = (nohp) => {
  const ambilfile = bacaFile();
  const detail = ambilfile.find((detail) => detail.nohp === nohp);
  return detail;
}

//menimpa file contact.json dengan data yang baru
const simpanContact = (contact) => {
  fs.writeFileSync('data/contact.json', JSON.stringify(contact));
};


// menambahkan data kontak baru kedalam file contact.json
const tambahKontak = (contact) => {
  const contacts = bacaFile();
  contacts.push(contact);
  simpanContact(contacts);
}

// melihat data duplikat
const cekDuplikat = (nohp) => {
  const contact = bacaFile();
  return contact.find((contact) =>
    contact.nohp === nohp
  );

}

const hapusKontak = (contact) => {
  const contacts = bacaFile();
  const hapus = contacts.find(contacts.nohp === contact.nohp);

}


module.exports = {
  bacaFile,
  detailkontak,
  tambahKontak,
  hapusKontak,
  cekDuplikat
}