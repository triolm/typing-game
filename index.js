const app = require('express')();
const axios = require('axios');
const he = require("he")
const passages = []

const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', "ejs")

app.get('/generate', async (req, res) => {
    postres = await axios.post("http://api.vicgalle.net:5000/generate", {}, { params: { "context": "je suis" } });
    res.send(postres.data.prompt + postres.data.text);
})

app.get('/play', async (req, res) => {
    text = he.decode(passages[req.query.lang].data.text)
    res.render('play', { text, he })
})

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000, async () => {
    passages.fr = await axios.post("http://api.vicgalle.net:5000/generate", {}, { params: { "context": "je suis.", "token_max_length": 100 } });
    passages.en = await axios.post("http://api.vicgalle.net:5000/generate", {}, { params: { "context": "Hello", "token_max_length": 100 } });
    passages.c = await axios.post("http://api.vicgalle.net:5000/generate", {}, { params: { "context": "#include <stdio.h>", "token_max_length": 100 } });
    console.log("listening")
})