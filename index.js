const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/routes');
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());

//ROUTES
app.use('/api/', routes);

app.get('/', (req, res)=>{
    res.send('<h1>Reto MySql y Express (Academia Geek)</h1>');
});

app.set('port', process.env.PORT || 7076);

app.listen(app.get('port'), ()=>{
    console.log(`Aplicación corriendo en el puerto ${app.get('port')}`);
});