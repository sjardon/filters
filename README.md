
# Filter

Filtrado de cualquier tipo de fuente de datos con cualquier tipo de estructura.

Para correr el ejemplo: 
```
npm install
node index.js
```

## Utilización de los filtros:

Para poder usar los filtros hay que tener en cuenta: Qué valor quiero evaluar, cómo lo quiero evaluar, con que valor quiero evaluarlo.

Para elegir el valor a evaluar:

En _FilterProduct_ hay una propiedad llamada _fields_ que es un objeto de json. El nombre de cada elemento es el 'alias' por el que vamos a identificar al campo. El valor de cada elemento es un array que indica la ruta al campo a evaluar. El siguiente ejemplo hace referencia al elemento _product.retailers.retailer.stock-count_ y a _product.manufacturer_.

```js
static fields = {
    stock: ['retailers','retailer','stock-count'],
    manufacturer: ['manufacturer']
}
```

Después podemos utilizar ese alias en la configuración de cada retailer.

Para definir el filtro para un elemento utilizamos como nombre de la propiedad el alias de dicho campo. El valor de cada elemento es un array con el o los filtros a utilizar. Cada filtro es un objeto con las propiedades _operation_ (La función del validador a utilizar) y _parameters_ (Un array con los parametros de dicha función). El siguiente ejemplo nos indica que el campo _manufacturer_ tiene que ser igual a alguno de los valores indicados en _parameters_.

```js
filters:{
    manufacturer:[{
        operation: 'equal',
        parameters:['Acer','Asus','Dell','Google','HP']
    }]
}
```

Si el campo a evaluar es un objeto o un array podemos hacerlo de la siguiente manera:


```js
filters:{
    retailer:[{
        operation: 'hasObject',
        parameters: [
            {
                id: [{
                    operation: 'equal',
                    parameters:['60422']
                }],
                'stock-count': [{
                    operation: 'bigger',
                    parameters: ['0']
                }]
            }
        ]
    }]
}
```

En este caso va a validar que el objeto retailer (Que puede ser un objeto o un array de objetos) contenga un objeto (_hasObject_) como el que se envía como parámetro. Dicho objeto va a tener que contener el campo _id_ (Igual, osea _equal_, a 60422) y _stock-count_ (Mayor, osea _bigger_, a 0).
