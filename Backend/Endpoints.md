
# Endpoints 

Un endpoint es una ruta de un servidor web que se utiliza para realizar una solicitud. En este caso, los endpoints son las rutas que se utilizan para realizar las solicitudes a la API.

## Auth endpoints

### Login

- **Metodo**: `POST`
- **Ruta**: `/api/auth/login`
- **Descripción**: Inicia sesión en la aplicación.

```json
{
	"email": "your_email@domain.com", // Email válido.
	"password": "!abc1234ABC" // 8 caracteres, mayúsculas, minúsculas, números y caracteres especiales. 
}
```

- **Respuesta**: Mensaje y token de autenticación.

```json
{
	"message": "Login successfull",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTBiOWEzNGRmMGMwMmI0M2RjMGMwMTAiLCJpYXQiOjE2O"
}
```

### Register

- **Método**: `POST`
- **Ruta**: `/api/auth/register`
- **Descripción**: Registra un nuevo usuario en la aplicación.

```json
{
	"username": "John Doe", // Nombres y apellidos del usuario.
	"email": "your_email@domain.com",
	"password": "!abc1234ABC",
	"contacto": "+56912345678", // Número de contacto válido y con formato CL (+56xxxxxxxxx).
	"vehiculo": {
		"patente": "VZFP23", // Placa válida y con formato XXXX00 (4 letras y 2 números)
		"modelo": "Toyota Corolla",
		"year": 2019 // Año de fabricación del vehículo. (1950 <= año <= 2023)
	}
}
```

- **Respuesta**: Código de estado 200 y mensaje de confirmación.

```json
{
	"message": "Link de verificación enviado al correo electrónico",
}
```

### Logout

- **Método**: `GET`
- **Ruta**: `/api/auth/logout` 
- **Descripción**: Cierra la sesión del usuario actual.

- **Headers**: 

```json
{
	"Authorization": "Bearer <token>"
}
```

- **Respuesta**: Mensaje de confirmación.
```json
{
	"message": "Logout successfull"
}
```

### Recuperación de contraseña

- **Método**: `GET`
- **Ruta**: `/api/auth/forgot-password`
- **Descripción**: Redirecciona a un sistema embebido de EJS en el backend. Se solicitará el email de la cuenta a restablecer contraseña.
- **Respuesta**: Email con un one time link para restablecer contraseña.


## User endpoints

### Obtener información del usuario

- **Método**: `GET`
- **Ruta**: `/api/users/:id`
- **Descripción**: Obtiene la información del usuario (id). Requiere pertenencia o rol de administrador.
- **Headers**: 

```json
{
	"Authorization": "Bearer <token>"
}
```
- **Respuesta**: Información del usuario.

```json
{
	"_id": "60b9a34df0c02b43dc0c010a",
	"username": "John Doe",
	"email": "your_email@domain.com",
	"contacto": "+56912345678",
	"vehiculo": {
		"patente": "VZFP23",
		"modelo": "Toyota Corolla",
		"year": 2019
	},
}
```

### Obtener información de todos los usuarios

- **Método**: `GET`
- **Ruta**: `/api/users`
- **Descripción**: Obtiene la información de todos los usuarios. Requiere rol de administrador.

- **Headers**: 
```json
{
	"Authorization": "Bearer <token>"
}
```
- **Respuesta**: Información del usuario.

```json
{
	"_id": "60b9a34df0c02b43dc0c010a",
	"username": "John Doe",
	"email": "your_email@domain.com",
	"contacto": "+56912345678",
	"vehiculo": {
		"patente": "VZFP23",
		"modelo": "Toyota Corolla",
		"year": 2019
	},
},
{
	"_id": "60b9a34df0c02b43dc0c010a",
	"username": "Jane Doe",
	"email": "your_email@domain.com",
	"contacto": "+56912345678",
	"vehiculo": {
		"patente": "VZFP21",
		"modelo": "Toyota Corolla",
		"year": 2019
	},
}
```

### Actualizar información del usuario

- **Método**: `PUT`
- **Ruta**: `/api/users/:id`
- **Descripción**: Actualiza la información del usuario (id). Requiere pertenencia o rol de administrador.

- **Headers**: 
```json
{
	"Authorization": "Bearer <token>"
}
```

- **Body**:
Ejemplo de actualización de username y número de contacto
```json
{
	"username": "John Doe",
	"contacto": "+56912345678",
}
```

- **Respuesta**: Código de estado 200 y mensaje de confirmación.
```json
{
	"message": "User updated successfully"
}
```

### Eliminar usuario

- **Método**: `DELETE`
- **Ruta**: `/api/users/:id`
- **Descripción**: Elimina el usuario (id). Requiere pertenencia o rol de administrador.

- **Headers**: 
```json
{
	"Authorization": "Bearer <token>"
}
```
- **Respuesta**: Código de estado 200 y mensaje de confirmación.
```json
{
	"message": "account deleted successfully"
}
```

## Parking endpoints

### Obtener información de todos los estacionamientos activos

- **Método**: `GET`
- **Ruta**: `/api/parking/active`
- **Descripción**: Obtiene la información de todos los estacionamientos activos. Requiere rol de administrador.

- **Headers**: 
```json
{
	"Authorization": "Bearer <token>"
}
```
