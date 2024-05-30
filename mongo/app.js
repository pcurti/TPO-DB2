const express = require('express');
require('dotenv').config();

const app = express();
const { loadFiles, countAlbumsByYear, addScoreAttribute, queryArtistScore, dropCollection } = require('./handlers');

app.get('/load-files', loadFiles);
app.get('/count-albums-by-year', countAlbumsByYear);
app.get('/add-score-attribute', addScoreAttribute);
app.get('/query-artist-score', queryArtistScore);

app.get('/drop-collection', dropCollection);

app.get('/', (req, res) => {
    const endpoints = [
        { method: 'GET', path: '/load-files', description: 'Importa el archivo albumlist.csv a una colección.' },
        { method: 'GET', path: '/count-albums-by-year', description: 'Cuenta la cantidad de álbumes por año y los ordena de manera descendente.' },
        { method: 'GET', path: '/add-score-attribute', description: 'Agrega un nuevo atributo llamado "score" a cada documento.' },
        { method: 'GET', path: '/query-artist-score', description: 'Realiza una consulta que muestra el "score" de cada artista.' },
        { method: 'GET', path: '/drop-collection', description: 'Elimina la colección de álbumes.' }
    ];

    let responseHTML = '<h1>Endpoints disponibles:</h1>';
    responseHTML += '<ul>';
    endpoints.forEach(endpoint => {
        responseHTML += `<li><strong>${endpoint.method}</strong>: <a href="${endpoint.path}">${endpoint.path}</a> - ${endpoint.description}</li>`;
    });
    responseHTML += '</ul>';

    res.status(200).send(responseHTML);
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    console.log(`Try the following routes: /load-files, /count-albums-by-year, /add-score-attribute, /query-artist-score, /drop-collection`);
    console.log('Remember to import the albumlist.csv file first');
});
