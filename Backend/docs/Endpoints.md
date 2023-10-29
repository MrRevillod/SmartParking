# Endpoints

Un endpoint es una ruta de un servidor web que se utiliza para realizar una solicitud. En este caso, los endpoints son las rutas que se utilizan para realizar las solicitudes a la API.

## Auth endpoints

### Iniciar sesión

-   **Metodo**: `POST`
-   **Ruta común**: `/api/auth/login`
-   **Ruta administador**: `/api/auth/admin-login`
-   **Descripción**: Inicia sesión en la aplicación. El usuario debe estar validado para iniciar sesión.

```json
{
    "email": "your_email@domain.com", 
    "password": "asc9283MSHB&" 
}
```

-   **Respuesta**: Mensaje y token de autenticación.

```json
{
    "message": "OK",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTBiOWEzNGRmMGMwMmI0M2RjMGMwMTAiLCJpYXQiOjE2O"
}
```

### Registro en la aplicación

-   **Método**: `POST`
-   **Ruta**: `/api/auth/register`
-   **Descripción**: Registra un nuevo usuario en la aplicación.

```json
{
	"username": "John Doe",
	"email": "your_email@domain.com",
	"password": "!abc1234ABC",
	"contact": "+56912345678",
	"vehicles": {
		"patente": "VZFP23",
		"model": "Toyota Corolla",
		"year": 2019 
	}
}
```

-   **Respuesta**: Código de estado 200 y mensaje de confirmación.

```json
{
    "message": "Link de verificación enviado al correo electrónico"
}
```

### Verificar sesión

-   **Método**: `POST`
-   **Ruta**: `/api/auth/confirm-session`
-   **Descripción**: Verifica si el usuario tiene una sesión válida/activa.

-**Headers**:

```json
{
    "Authorization": "Bearer <token>"
}
```

-   **Respuesta**: Mensaje de confirmación y código de estado.

```json
{
    "message": "OK"
}
```

### Cerar sesión

- **Método**: `POST`
- **Ruta**: `/api/auth/logout` 
- **Descripción**: Cierra la sesión del usuario actual.

-   **Headers**:

```json
{
    "Authorization": "Bearer <token>"
}
```

-   **Respuesta**: Mensaje de confirmación.

```json
{
    "message": "OK"
}
```

### Recuperación de contraseña

-   **Método**: `GET`
-   **Ruta**: `/api/auth/forgot-password`
-   **Descripción**: Redirecciona a un sistema embebido de EJS en el backend. Se solicitará el email de la cuenta a restablecer contraseña.
-   **Respuesta**: Email con un one time link para restablecer contraseña.

## User endpoints

### Obtener información del usuario

-   **Método**: `GET`
-   **Ruta**: `/api/users/:id`
-   **Descripción**: Obtiene la información del usuario (id). Requiere pertenencia o rol de administrador.
-   **Headers**:

```json
{
    "Authorization": "Bearer <token>"
}
```

-   **Respuesta**: Información del usuario.

```json
{
	"_id": "651b09dabbabb01fc6975195", // ID del usuario.
	"username": "John Doe",
	"email": "johndoe@alu.uct.cl",
	"password": "$2a$08$ZQzT93",
	"role": "USER_ROLE",
	"validated": true,
	"profilePicture": "http://localhost:3000/images/default.jpg",
	"contact": "+56933484506",
	"active": false,
	"parking": "",
	"vehicles": [
		{
		"_id": "651b09dabbabb01fc6975196",
		"patente": "ANXM77",
		"model": "Toyota Corolla",
		"year": "2019",
		}
  	],
}

```

### Obtener información de todos los usuarios

-   **Método**: `GET`
-   **Ruta**: `/api/users`
-   **Descripción**: Obtiene la información de todos los usuarios. Requiere rol de administrador.

-   **Headers**:

```json
{
    "Authorization": "Bearer <token>"
}
```

-   **Respuesta**: Información del usuario.

```json

{
	"_id": "651b09dabbabb01fc6975195", // ID del usuario.
	"username": "John Doe",
	"email": "johndoe@alu.uct.cl",
	"password": "$2a$08$ZQzT93",
	"role": "USER_ROLE",
	"validated": true,
	"profilePicture": "http://localhost:3000/images/default.jpg",
	"contact": "+56933484506",
	"active": false,
	"parking": "",
	"vehicles": [
		{
		"_id": "651b09dabbabb01fc6975196",
		"patente": "ANXM77",
		"model": "Toyota Corolla",
		"year": "2019",
		}
  	],
},
{
	"_id": "651b09dabbabb01fc6975195", // ID del usuario.
	"username": "Jane Doe",
	"email": "janedoe@alu.uct.cl",
	"password": "$2a$08$ZQzT93",
	"role": "TEMP_ROLE",
	"validated": true,
	"profilePicture": "http://localhost:3000/images/default.jpg",
	"contact": "+56912345678",
	"active": false,
	"parking": "",
	"vehicles": [
		{
		"_id": "651b09dabbabb01fc69012",
		"patente": "KBGF77",
		"model": "Toyota Corolla",
		"year": "2019",
		}
  	],
},

```

### Actualizar información del usuario

-   **Método**: `PUT`
-   **Ruta**: `/api/users/:id`
-   **Descripción**: Actualiza la información del usuario (id). Requiere pertenencia o rol de administrador.

-   **Headers**:

```json
{
    "Authorization": "Bearer <token>"
}
```

-   **Body**:
    Ejemplo de actualización de username y número de contacto

```json
{
    "username": "John Doe",
    "contacto": "+56912345678"
}
```

-   **Respuesta**: Código de estado 200 y mensaje de confirmación.

```json
{
    "message": "User updated successfully"
}
```

### Actualizar imagen de perfil

- **Método**: `PUT`
- **Ruta**: `/api/users/update-image/:id`
- **Descripción**: Actualiza la imagen de perfil del usuario (id). Requiere pertenencia o rol de administrador.

- **Headers**:
```json
{
    'Content-Type': 'multipart/form-data',
},
```
- **Ejemplo:
```javascript
const updateImage = async (url, image) => {

    const body = new FormData()
    body.append('image', image)

    const response = await fetch(url, {
        body,
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })

    return await response.json()
}
```

### Actualizar imagen de perfil

- **Método**: `DELETE`
- **Ruta**: `/api/users/:id`
- **Descripción**: Elimina el usuario (id). Requiere pertenencia o rol de administrador.

- **Headers**: 
```json
{
    "Authorization": "Bearer <token>"
}
```

-   **Respuesta**: Código de estado 200 y mensaje de confirmación.

```json
{
    "message": "account deleted successfully"
}
```

## Parking endpoints

### Obtener información de todos los estacionamientos activos

-   **Método**: `GET`
-   **Ruta**: `/api/parking/active`
-   **Descripción**: Obtiene la información de todos los estacionamientos activos. Requiere rol de administrador.

-   **Headers**:

```json
{
    "Authorization": "Bearer <token>"
}
```
