# Expreciones regulares

Una expreción regular es una cadena de caracteres que representa el formato y los valores que debe poseer un dato requerido.

## Nombre de usuario

- Longitud: mínimo 8 caracteres
- Se espera nombre - apellido paterno - apellido materno

## Correo electronico

```javascript
   ([a-zA-Z0-9_.+-]+)@[a-zA-Z0-9_.+-]+\.[a-zA-Z0-9_.+-]
```

## Contraseña

- Longitud: mínimo 8 caracteres
- Al menos un número, minúscula, mayúscula y carácter especial

```javascript
   /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*])/
```

## Número de contacto

- Longitud: 12 caracteres

```javascript
   /^\+569\d{8}$/
```

## Patente

- Longitud: 6 caracteres

```javascript
   /^[BCDFGHJKLPQRSTVWXYZ]{4}(1[0-9]|[2-9][0-9])$/
```

## Modelo del vehiculo

- Longitud: Máximo 20 caracteres

## Año del vehiculo

- Rango: Entre 1950 y 2023

```javascript
   /^[BCDFGHJKLPQRSTVWXYZ]{4}(1[0-9]|[2-9][0-9])$/
```