<div align="center" style="margin: 2rem;">
    <h1>Smart Parking</h1>
</div>

<div align="center">
  <img src="./Backend/public/images/logo-white.png" alt="Descripción de la imagen" width="200">
</div>

<div align="center" style="margin: 2rem;">
    <h2>Sistema de administración de estacionamientos</h2>
</div>

## Desarrollo

### Frontend

Este proyecto está desarrollado con librerías como [React](https://es.reactjs.org/), [React Query](https://tanstack.com/query/v3/), [React Router](https://reactrouter.com/web/guides/quick-start), [React Hook Form](https://react-hook-form.com/). El enfoque de esta web consiste en la creación de un sistema de administración simple y fácil de usar, con un diseño minimalista y agradable a la vista. 

### Backend

En cuanto al backend, se ha utilizado [NodeJS](https://nodejs.org/es/) con [Express](https://expressjs.com/es/), [MongoDB](https://www.mongodb.com/es) como base de datos y [Mongoose](https://mongoosejs.com/) como ORM. El backend se ha desarrollado con el objetivo de que sea escalable y fácil de mantener, por lo que se ha utilizado una el patrón de diseño [MVC](https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador) para la estructura del proyecto.

Un desafío importante en el desarrollo fue la implementación de un sistema de reservas de estacionamientos en tiempo real, para ello se utilizó [Socket.io](https://socket.io/), una librería que permite la comunicación bidireccional en tiempo real entre el cliente y el servidor.

## Producción y Despliegue

Para este proceso se ha optado por un vps basado en un sistema operativo Ubuntu. Además se ha utilizado [Docker](https://www.docker.com/) para gestionar de forma más ordenada las partes y dependencias de nuestra aplicación.

### URL pública

La aplicación se divide en dos partes:

Un sitio web de administración y gestión el cual es accesible desde [SmartParking Dashboard](http://190.114.253.237:8000/login)

Un sitio web para los usuarios móviles, este es accesible desde [SmartParking Mobile](http://190.114.253.237:3000/api/mobile). Este sitio es una simulación de la aplicación móvil, por lo que se recomienda acceder desde un dispositivo móvil.

## Documentación y endpoints

Un rest endpoint es una URL que identifica un recurso. Cuando se accede a un rest endpoint, el servidor devolverá una representación del recurso solicitado. En este caso, el servidor devuelve un JSON con la información solicitada. La documentación web sobre los endpoints se encuentra en [SmartParking Docs](http://190.114.253.237:3000/api/docs/)

### Acceso y salida de invitados mediante códigos QR

Para el acceso y salida de invitados se ha implementado un sistema de códigos QR, los cuales están presentes en las entradas y salidas de los estacionamientos y redirigen a un sistema embedido para registrar una entrada o salida del recinto. 

<img src="./Backend/public/images/Qrs.png" alt="Descripción de la imagen" width="800">