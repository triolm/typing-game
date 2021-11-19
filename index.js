const app = require('express')();
const axios = require('axios');

const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', "ejs")

app.get('/generate', async (req, res) => {
    postres = await axios.post("http://api.vicgalle.net:5000/generate", {}, { params: { "context": "je suis" } });
    res.send(postres.data.prompt + postres.data.text);
})

app.get('/', async (req, res) => {
    postres = await axios.post("http://api.vicgalle.net:5000/generate");
    text = postres.data.text
    res.render('index', { text })
})

app.listen(3000, () => {
    console.log("listening")
})