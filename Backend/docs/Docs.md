
## Estructura de Carpetas del Proyecto

Este proyecto de sigue una estructura de carpetas al estilo Modelo vista controlador (MVC) para facilitar el desarrollo y organización del código.

### Directorios

#### `models/`

- **Propósito**: Este directorio es donde se almacenan los modelos de datos de la aplicación, que definen la estructura de los datos y las operaciones relacionadas con la base de datos MongoDB.
- **Ejemplo de archivo**: `models/user.model.js`

#### `controllers/`

- **Propósito**: En este directorio se encuentran los controladores que actúan como intermediarios entre las rutas y los modelos. Controlan la lógica de la aplicación y gestionan las solicitudes y respuestas.
- **Ejemplo de archivo**: `controllers/user.controller.js`

#### `views/`

- **Propósito**: Aquí se guardan las vistas de la aplicación, que son las plantillas utilizadas para generar las respuestas HTML o renderizar datos en el navegador.
- **Ejemplo de archivo**: `views/file.ejs`

#### `routes/`

- **Propósito**: En este directorio se definen las rutas de la aplicación, estas rutas controlan y direccionan a los middlewares y posteriormente a los controllers.
- **Ejemplo de archivo**: `routes/user.js`

#### `public/`

- **Propósito**: Se utiliza para almacenar recursos estáticos como archivos CSS, imágenes o archivos JavaScript que se servirán al navegador.
- **Ejemplo de archivo**: `public/styles.css`

#### `config/`

- **Propósito**: Aquí se encuentran los archivos de configuración de la aplicación, como la configuración de express, entorno o la configuración de la base de datos.
- **Ejemplo de archivo**: `config/enviroment.js`

#### `utils/`

- **Propósito**: Este directorio almacena utilidades o funciones reutilizables que pueden ser utilizadas en toda la aplicación.
- **Ejemplo de archivo**: `utils/file.util.js`

#### `middlewares/`

- **Propósito**: Aquí se guardan los middlewares de Express.js que se utilizan para realizar tareas específicas antes o después de que se manejen las solicitudes.
- **Ejemplo de archivo**: `middlewares/auth.mw.js`

#### `rules/`

- **Propósito**: En este directorio se encuentran las reglas de validación de la aplicación, que se utilizan para validar los datos de entrada.
- **Ejemplo de archivo**: `rules/user.rules.js`
