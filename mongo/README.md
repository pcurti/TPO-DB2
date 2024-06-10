# MongoDB
___
1. Importe el archivo **albumlist.csv** (o su versión RAW) a una colección. Este archivo
   cuenta con el top 500 de álbumes musicales de todos los tiempos según la revista
   Rolling Stones.
2. Cuente la cantidad de álbumes por año y ordénelos de manera descendente
   (mostrando los años con mayor cantidad de álbumes al principio).
3. A cada documento, agregarle un nuevo atributo llamado 'score' que sea **501-Number**.
4. Realice una consulta que muestre el 'score' de cada artista.
___

## Indice



[Dependencias](#Dependencias)

[Ejecucion del programa](#Ejecucion-del-programa)

[Endpoints](#Endpoints)

---
## Dependencias

- `node`: Node.js es un entorno de ejecución de JavaScript de código abierto, multiplataforma y de back-end que se ejecuta en el motor V8 y ejecuta código JavaScript fuera de un navegador web. El costo es gratuito.

- `express`: Express.js, o simplemente Express, es un marco de aplicación web de back-end para Node.js. Está diseñado para construir aplicaciones web y APIs. El costo es gratuito.

- `mongodb`: El controlador oficial de MongoDB para Node.js. Proporciona una API de alto nivel sobre mongodb-core que está destinada a los usuarios finales. La última versión es 6.7.0 y está licenciada bajo Apache-2.0. El costo es gratuito.

- `dotenv`: Dotenv es un módulo sin dependencias que carga variables de entorno desde un archivo `.env` en `process.env`. La última versión es 16.4.5 y está licenciada bajo BSD-3-Clause. El costo es gratuito.

- `csv-parser`: Una biblioteca para analizar datos CSV en Node.js. Es basado en streams, por lo que es capaz de analizar archivos grandes con bajo consumo de memoria. La última versión es 3.0.0 y está licenciada bajo MIT. El costo es gratuito.

## Ejecucion del programa

Una vez instalado node, moverse a la carpeta "mongo" y ejecutar los siguientes comando:
```bash 
docker-compose build

docker-compose up app
```


Opcionalmente se puede utilizar el script "run.sh" para esto primero debemos otorgar permisos de ejecucion al script
```bash
chmod +x run.sh

./run.sh
```
---

## Endpoints

### `/load-files`

Este endpoint se utiliza para importar el archivo `albumlist.csv` a una colección. Este archivo cuenta con el top 500 de álbumes musicales de todos los tiempos según la revista Rolling Stones.

### `/count-albums-by-year`

Este endpoint se utiliza para contar la cantidad de álbumes por año y los ordena de manera descendente, mostrando los años con mayor cantidad de álbumes al principio.

### `/add-score-attribute`

Este endpoint se utiliza para agregar un nuevo atributo llamado 'score' a cada documento. El 'score' es calculado como `501-Number`.

### `/query-artist-score`

Este endpoint se utiliza para mostrar el 'score' de cada artista. El 'score' de un artista es el promedio de los 'score' de sus álbumes.

### `/drop-collection`

Este endpoint se utiliza para eliminar la colección de la base de datos.

