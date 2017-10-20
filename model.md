# modelo de la base de datos

## Usuarios
en esta colección se guardan **todos** los usuarios de la aplicación, por ahora
por simplicidad puede tomar la siguiente forma:

``` javascript
{
    id: string,
    name: string,
    type: string,
    mail: string,
    telephone: string,
    direction: string
}

```

## Facturas
en esta coleccion se guardan **todas** las facturas de la asociacion, pueden ser
facturas de venta, facturas de compra etc.

``` javascript
{
    id: int,
    date: Date(),
    type: "compra" | "venta",
    user: "user id"
    items: [
        {
            material: string,
            quantity: float,
            unit_price: float,
            totalItem: float
        }
    ]
    total: float
}
```

ejemplo

``` javascript
{
    id: 0001,
    usuario: "pepito perez",
    type: "compra",
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
}
```
## Rutas
existen microrutas con las cuales la asociacion presta el servicio, estas deben
estar georeferenciadas y pueden contar con la siguiente info.

``` javascript
{
    id: string | int,
    path: geoJSON | shape,
    name: string,
}
```

con estas simples tres colecciones creo que podemos empezar y obviamente hay campos
que luego se agregaran. la idea es poder responder preguntas como:

- cuanto material se ha comprado o vendido al reciclador o empresa x?
- cual ha sido la ganancia o perdidad de la asociacion (balance de masas)?
- cuanto porcentaje de material x se mueve en la ruta y?
- cuantos usuarios del tipo x tiene la asociacion?
- ...
