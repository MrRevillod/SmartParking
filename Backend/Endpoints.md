
## Endpoints 

Un endpoint es una ruta de un servidor web que se utiliza para realizar una solicitud. En este caso, los endpoints son las rutas que se utilizan para realizar las solicitudes a la API.

### Auth endpoints

#### Login

- **Método**: `POST`
- **Ruta**: `/api/auth/login`
- **Descripción**: Inicia sesión en la aplicación.
- **Parámetros**: 
  - `email`: Correo electrónico del usuario.
  - `password`: Contraseña del usuario.

- **Respuesta**: Token de autenticación.

#### Register

- **Método**: `POST`
- **Ruta**: `/api/auth/register`
- **Descripción**: Registra un nuevo usuario en la aplicación.
- **Parámetros**: 
  - `username`: Nombres y apellidos del usuario. 
  - `email`: Correo electrónico del usuario.
  - `password`: Contraseña del usuario.
  - `contacto`: Número de contacto del usuario.
  - `vehiculo`:
    - `patente`: Placa del vehículo del usuario.
    - `modelo` : Modelo del vehículo del usuario.

- **Respuesta**: Código de estado 200 y mensaje de confirmación.

#### Logout

- **Método**: `GET`
- **Ruta**: `/api/auth/logout`
- **Descripción**: Cierra la sesión del usuario actual.
- **Headers**: 
  - `token`: Token de autenticación del usuario.

- **Respuesta**: Mensaje de confirmación.

#### Recuperación de contraseña

- **Método**: `GET`
- **Ruta**: `/api/auth/forgot-password`
- **Descripción**: Redirecciona a un sistema embebido de EJS en el backend. Se solicitará el email de la cuenta a restablecer contraseña.
- **Respuesta**: Email con un one time link para restablecer contraseña.


### User endpoints

#### Obtener información del usuario

- **Método**: `GET`
- **Ruta**: `/api/users/:id`
- **Descripción**: Obtiene la información del usuario (id). Requiere pertenencia o rol de administrador.

- **Headers**: 
  - `token`: Token de autenticación del usuario.
- **Respuesta**: Información del usuario.

#### Obtener información de todos los usuarios

- **Método**: `GET`
- **Ruta**: `/api/users`
- **Descripción**: Obtiene la información de todos los usuarios. Requiere rol de administrador.
- **Headers**: 
  - `token`: Token de autenticación del usuario.
- **Respuesta**: Información de todos los usuarios.


#### Actualizar información del usuario

- **Método**: `PUT`
- **Ruta**: `/api/users/:id`
- **Descripción**: Actualiza la información del usuario (id). Requiere pertenencia o rol de administrador.

- **Headers**: 
  - `token`: Token de autenticación del usuario.
- **Parámetros**:
    - `username`: Nombres y apellidos del usuario. 
    - `email`: Correo electrónico del usuario.
    - `password`: Contraseña del usuario.
    - `contacto`: Número de contacto del usuario.
    - `vehiculo`:
        - `patente`: Placa del vehículo del usuario.
        - `modelo` : Modelo del vehículo del usuario.

- **Respuesta**: Código de estado 200 y mensaje de confirmación.

#### Eliminar usuario

- **Método**: `DELETE`
- **Ruta**: `/api/users/:id`
- **Descripción**: Elimina el usuario (id). Requiere pertenencia o rol de administrador.

- **Headers**: 
  - `token`: Token de autenticación del usuario.
- **Respuesta**: Código de estado 200 y mensaje de confirmación.

