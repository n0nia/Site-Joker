const express = require('express');
var app = express();

const session = require('express-session')
const formidable = require('formidable');
const fs = require('fs');
const util = require('util');
const nodemailer = require("nodemailer");

const crypto = require('crypto');

// initializari socket.io
const http=require('http')
const socket = require('socket.io');
const server = new http.createServer(app);  
var  io= socket(server)
io = io.listen(server);//asculta pe acelasi port ca si serverul


var conexiune_index
io.on("connection", (socket) => {  
    console.log("Conectare!");
    conexiune_index=socket
    socket.on('disconnect', () => {conexiune_index=null;console.log('Deconectare')});
});


function getJson(numeFis){
    let textFis = fs.readFileSync(numeFis);//pun continutul fisierului useri.json in rawdata
    return JSON.parse(textFis);//obtin obiectul asociat json-ului
}

function saveJson(obJson, numeFis){
    let data = JSON.stringify(obJson);//transform in JSON
    fs.writeFileSync(numeFis, data);//scriu JSON-ul in fisier (inlocuind datele vechi)
}

serverPass="tralala";

app.set('view engine', 'ejs'); 

//setez o sesiune
app.use(session({
  secret: 'abcdefg',//folosit de express session pentru criptarea id-ului de sesiune
  resave: true,
  saveUninitialized: false
}));

//folosit de obicei pt a obtine date/resurse de pe server
// cand se face o cerere get catre pagina de index 
app.get('/', function(req, res) {

    /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index', {user: req.session.username});
});

app.get('/logout', function(req, res) {
    /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    req.session.destroy();
    res.render('html/logout');
});

//pentru a transmite date catre server
//aici se face login
app.post('/', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        
        jsfis=getJson('useri.json')
        var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');//creez un obiect de tip cifru cu algoritmul aes
        var encrParola= cifru.update(fields.parola, 'utf8', 'hex');//cifrez parola
        encrParola+=cifru.final('hex');//inchid cifrarea (altfel as fi putut adauga text nou cu update ca sa fie cifrat
        let user=jsfis.useri.find(function(x){//caut un user cu acelasi nume dat in formular si aceeasi cifrare a parolei
        //cauta userul cu parola si user-ul 
            return (x.username==fields.username&& x.parola == encrParola );
        });
        if(user){
        //if(fields.username=="user" && fields.parola=="parola123") {
            console.log(user);
            console.log(user.parola);
            console.log(encrParola);
            req.session.username=user;//setez userul ca proprietate a sesiunii
        }
        
        console.log(req.session.username);
        /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
        res.render('html/index',{user: req.session.username});

    });


});

app.get('/register_user', function(req, res) {
    res.render('html/register_user');//la cererea paginii /register redirectez catre pagina inregistrare_user
});

app.post('/register_user', (req, res) => {
    //var  dateForm = req.body;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        let rawdata = fs.readFileSync('useri.json');
        let jsfis = JSON.parse(rawdata);
        var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
        var encrParola= cifru.update(fields.parola, 'utf8', 'hex');
        encrParola+=cifru.final('hex');
        console.log(fields.parola+ " "+encrParola);
        jsfis.useri.push({id:jsfis.lastId, username:fields.username, nume:fields.nume, email: fields.email, parola: encrParola, dataInreg: new Date()});
        jsfis.lastId++;
        res.render('html/register_user', {user: req.session.username, rsstatus:"ok"});

        saveJson(jsfis,'useri.json')
        });
    
});

app.get('/games', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/Games');
});

app.get('/animations', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/Animations');
});

app.get('/heath-ledger', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/Heath-Ledger');
});

app.get('/history', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/History');
});

app.get('/joaquin-phoenix', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/Joaquin-Phoenix');
});

app.get('/movies', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/Movies');
});


app.get('/actors', function(req, res) {
    
    let rawdata = fs.readFileSync('actors.json');
    let jsfis = JSON.parse(rawdata);
    console.log(jsfis.actors);
    
    res.render('html/actors',{actors:jsfis.actors,user: req.session.username});
});

app.use('/css', express.static('css'));
app.use('/game', express.static('index'));
app.use('/poze', express.static('poze'));

app.use(function(req,res){
    res.status(404).render('html/404');
});

app.use(function(req,res,next){
    console.log("procesarea ignorata");
});


app.get('/buton', function(req, res) {
    res.render('html/buton', {user: req.session.username});
});
app.post('/buton', function(req, res) {
    console.log("apasat")
    if(conexiune_index){
        console.log(conexiune_index)
        conexiune_index.emit("buton", { refresh: true });
    }
    res.render('html/buton', {user: req.session.username});

});

app.listen(8080)
console.log('Serverul a pornit pe portul 8080'); 