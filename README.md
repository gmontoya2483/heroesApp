# HeroesApp

## Description

Proyecto HeroesApp del curso "Angular: Decero a experto (Edición 2021)".  
Esta aplicación muestra el manejo de Rutas hijas y LazyLoad y como utilizar [Angular Material](https://material.angular.io/).

## Temas Cubiertos en esta aplicación:
* Modularización de la aplicación
* Instalacion Angular Material  - [Angular Material](https://material.angular.io/)
* Módulo especializado para módulos de PrimeNG
* Rutas Hijas,
* Rutas Principales,
* LazyLoad
* Multiples estilos en la misma SPA.
* Angular Material
* Interfaces y tipado
* Pipes personalizados
* Variables de entorno
* Autocomplete de AngularMaterial
* Peticiones HTTP
* JSON-Server
* Angular Flex y Flexbox
*  CRUD
   *  Create
    * Read
    * Update
    * Delete
* Pipes puros e impuros
* Snacks
* Dialogs
* Inyección de servicios manualmente

## Development server
Ejecutar`ng serve` para el servidor de desarrollo. Navegar a  `http://localhost:4200/`. La aplicación será automaticamente recargada si se realizan cambios en el código fuente.

## Backend Server
Para simular el servidor backend se utiliza el paquete [JSON Server](https://www.npmjs.com/package/json-server).  

Para instalar el **JSON server** se debe ejecutar el siguiente comando:
```text
npm install -g json-server
```

La base de datos ``db.json`` debe tener la siguiente estructura:

```json5
{
  "usuarios": [
    {
      "id": 1,
      "usuario": "John Doe",
      "email": "john.due@gmail.com"
    }
  ],
  "heroes": [
    {
      "id": "dc-batman",
      "superhero": "Batman",
      "publisher": "DC Comics",
      "alter_ego": "Bruce Wayne",
      "first_appearance": "Detective Comics #27",
      "characters": "Bruce Wayne"
    }
  ]
}
```
Para ejecutar el servidor, dentro de la carpeta donde se encuentra el archivo ``db.json``, se debe ejecutar el siguiente comando:

```text
json-server --watch db.json
```


## Application en producción
[HeroesApp](https://heroesapp-gabriel.netlify.app/404)
