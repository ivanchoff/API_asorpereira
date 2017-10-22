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


## API
Esta api usara mongoDB como sistema de base de datos y manejará (por ahora) lo
siguiente:

1. *Usuarios*:
   existen diferentes tipos de usuarios en la asociación, dado que la asociación
   compra y vende material reciclable y es una entidad de servicios publicos estos
   se clasifican en:
   - *residenciales* : son basicamente las casas, esta info la usan para
   saber cuantos usuarios residenciales atiende la asociación y la zona de influencia
   - *comerciales*
   - *industriales*
   - *recicladores*
   - *intermediarios*
   - *asesores*
   - *confidencial*

   todos estos usuarios tienen información básica de contacto (nombre, direccion,
   telefono, correo, etc)

2. *Facturas*:
    en estos documentos se registra el material comprado, vendido o recogido
    asi que las facturas pueden ser de:
    - *compra*: cuando se le compra a un reciclador o a un intermediario
    - *venta*: cuando se le vende a un intermediario o a un confidencial
    - *recogido*: cuando la asociacion le recoge el reciclaje a las instituciones
    (en este caso solo lo recoge no lo compra)
    cada factura tiene la informacion del peso del material (plastico, carton etc)
    y del usuario y dependiendo del tipo de usuario el precio de dicho material.

3. *Rutas*
   los poligonos de las rutas que tiene la asociacion con el reciclador responsable
   de la ruta, la frecuencia de visita etc.

## Modelo de la Base de Datos
se usará una colección (DATA )y dentro de la colección estará un documento para
usuarios que contenga todos los usuarios, otro documento Facturas y otro documento
rutas y para optimizar las consultas se definiran muy bien los esquemas con mongoose

### Ejemplo de la coleccion DATA

``` javascript
{
    {
        usuarios:[
            {
                name:"pepito perez"
                id: 1088298623
                tipo:"reciclador"
            },
            {
                name:"armando casas"
                id: 10974632
                tipo:"asesor"
                rol:"admin"
            }]
    }
    {
        facturas:[
            {
                serial: 0001,
                usuario: "pepito perez",
                tipo: "compra",
                fecha: date(),
                items: [
                    {
                        material: "plastico"
                        cantidad: 5 //en kilos por ejemplo
                        precio_unidad: 1000
                        totalItem: 5000
                    },
                    {
                        material: "carton"
                        cantidad: 2
                        precio_unidad: 200
                        totalItem: 400
                    }
                ],
                total: 5400
            },
            {
                serial: 0012,
                usuario: "Intermediario HP",
                tipo: "Venta",
                fecha: date(),
                items: [
                    {
                        material: "plastico"
                        cantidad: 250
                        precio_unidad: 1000
                        totalItem: 250000
                    },
                    {
                        material: "carton"
                        cantidad: 300
                        precio_unidad: 100
                        totalItem: 30000
                    }
                ],
                total: 5400
            },
            {
                serial: 0002,
                usuario: "unidad residencial mamatoco",
                tipo: "recoleccion",
                fecha: date(),
                items: [
                    {
                        material: "vidrio"
                        cantidad: 5
                    },
                    {
                        material: "hierro"
                        cantidad: 12
                    }
                ]
            }
        ]
    }
    {
        rutas:[
            {
                path: "como se representen los puntos del poligono de la ruta1 (no se aun)",
                responsable: "pepito perez",
                comuna: "UTP",
                frecuencia: ["miercoles","sabado"]
            },
            {
                path: "poligono de la ruta2",
                responsable: "pepito perez oso",
                comuna: "13",
                frecuencia: ["lunes","jueves"]
            }
        ]
    }
}
```

## Tecnologias a usar
- NodeJS
- restify (o expressJS)
- mongoDB
- mongoose
- JWT
