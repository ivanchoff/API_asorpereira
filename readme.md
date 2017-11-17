# API del Sistema de información de Asorpereira

La asociación de recicladores de Pereira requiere de un sistema de información
mediante el cual poder sistematizar la información que manejan, realizar reportes
y visualizar informacion que les ayude en el proceso de administración. por este
motivo nos solidarizamos con la asociación para brindar una solucion a dicho
requerimiento de que se propone solucionar este problema mediante una aplicación
cliente servidor con modelo vista presentador separada en dos repositorios el *back-end*
y el *front-end* asi que este repo trata del *Back-end* el cual consiste de una
API REST

## Comandos

`yarn build` Para transpilar el código con babel
`yarn serve` Para correr el código

## Usando la api desde la línea de comandos

Para este fin, se utilizara la aplicación `curl` para hacer las peticiones y `prettyjson`
para formatear las respuestas json

- Para crear un usuario:

    $ curl -H "Content-Type: application/json" -X POST -d '{"cc": 123123, "name": "Pepe Grillo"}' localhost:3000/user | prettyjson

- Para modificar un usuario:

    $ curl -H "Content-Type: application/json" -X PUT -d '{"name": "alsuga"}' localhost:3000/user/:id | prettyjson

- Para ver todos los usuarios o uno individual

    $ curl localhost:3000/user/ | prettyjson
    $ curl localhost:3000/user/:id | prettyjson

- Para eliminar un usuaro

    $ curl -X DELETE localhost:3000/user/:id | prettyjson


## API
Esta api usara mongoDB como sistema de base de datos y manejará (por ahora) lo
siguiente:

1. *Usuarios involucrados en la factura*:
   - recicladores con vehiculo motorizado (se les compra material)
   - recicladores sin vehiculo motorizado (se les compra material)
   - aforados (entidades que donan material)
   - mayoristas comercializadores (intermediarios a los que se les vende material)
   - mayoristas industriales (industria a la que se le vende material)

2. *Facturas*: de compra y venta

3. *Precios*: de acuerdo al tipo de usuario.


## [Modelo de la Base de Datos](./doc/model.md)


## Tecnologias a usar
- NodeJS
- restify (o expressJS)
- mongoDB
- mongoose
- JWT
- Docker


## Docker

#### Prerequisitos

Descargar e instalar **docker**
- [For Mac](https://download.docker.com/mac/stable/Docker.dmg)
- [For Windows](https://download.docker.com/win/stable/InstallDocker.msi)
- [For Linux](https://docs.docker.com/engine/getstarted/step_one/#docker-for-linux)

Descargar e instalar **docker-compose**
- [Instrucciones](https://docs.docker.com/compose/install/)

#### Camino feliz

Simplemente corre:
```
cd docker/local
bash docker.sh up
```

A continuación se explica en detalle la configuración de docker.

#### Script bash y variables de entorno

Ir desde consola al folder `docker/local`:
```
cd docker/local
```

En `docker/local` hay un script en bash en el archivo `docker.sh` que se puede correr así:
```
./docker.sh parametros
# Or
bash docker.sh parametros  // Si tienes una shell diferente de bash como oh my zsh
```

Hay dos archivos con variables de entorno a tener en cuenta:
- `docker/local/.env` # Variables de entorno necesarias para correr el script de bash
- `docker/local/node/.env` # Variables de entorno del servicio de node

Los archivos con variables de entorno `.env` están ignorados y se crean automáticamente al apartir de los archivos `.env.example`.

#### Comandos

**Notas:**
- Parametros entre {} son opcionales.
- Nombres de servicios disponibles: `node | mongodb`

A continuación se describen cada uno de los parametros:

**Uso: docker.sh [up|start|restart|stop|rm|sh|bash|logs|ps]**
* `up {service}` --> Construir y correr servicios.
* `start {service}` --> Iniciar servicios.
* `restart {service}` --> Reiniciar servicios.
* `stop {service}` --> Parar servicios.
* `rm {service}` --> Eliminar servicios.
* `sh service` --> Conectar a la shell del servicio "service"
* `bash service` --> Conectar a la shell bash del servicio "service"
* `logs {n_last_lines}` --> Mostar logs del servicio "service"
* `help` --> Mostrar menú de optiones
