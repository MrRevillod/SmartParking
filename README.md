
<div align="center">
  <img src="https://raw.githubusercontent.com/MrRevillod/SmartParking/main/Dise%C3%B1o/logo-transparency-white-bg.png" alt="Descripción de la imagen" width="250">
</div>

<div align="center" style="margin: 2rem;">
    <h1>Smart Parking</h1>
    <h2>Sistema de administración de estacionamientos</h2>
</div>


### Frontend NextJS

Para ejecutar el panel en modo de desarrollo:

``` npm run dev ```

### Backend ExpressJS

Instalar dependencias:

``` npm install ``` || ``` pnpm install ```

Iniciar el servidor de desarrollo:

``` npm run dev ``` || ``` pnpm run dev ```

#### Documentación de la API:

- [Endpoints](./Backend/docs/Endpoints.md)
- [Estructura de carpetas](./Backend/docs/Docs.md)

<div align="center" style="margin: 2rem;">
    <h2>Codigos QR</h2>
</div>

<style>
  .flex-container {
    display: flex; /* Activa Flexbox */
    gap: 5rem; /* Espacio entre los elementos del flex */
    justify-content: center; /* Centra los elementos horizontalmente */
    align-items: center; /* Centra los elementos verticalmente */
    flex-wrap: wrap; /* Permite que los elementos se pasen a la línea siguiente si no caben */
  }

  .flex-item {
    text-align: center; /* Centra el texto debajo de la imagen */
  }

  .flex-item img {
    width: 100%; /* Ajusta la imagen al ancho del contenedor */
    max-width: 350px; /* Máximo ancho de la imagen */
    height: auto; /* Ajusta la altura automáticamente para mantener la proporción */
  }

  label {
    display: block; /* Hace que el label se comporte como un bloque y ocupe su propia línea */
    margin-top: 0.5rem; /* Espacio entre la imagen y el texto */
  }
</style>

<div class="flex-container">
  <div class="flex-item">
    <img src="./Backend/public/images/qr-guest-access.png" alt="">
    <label for="img1">Acceso Invitados</label>
  </div>
  <div class="flex-item">
    <img src="./Backend/public/images/qr-guest-exit.png" alt="">
    <label for="img2">Salida Invitados</label>
  </div>
</div>
