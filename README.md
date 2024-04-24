## Instrucciones para levantar la aplicación

**Pasos:**

1. **Crear archivo .env:**
    - Crear un archivo llamado `.env` en la raíz del proyecto.
    - Agregar la siguiente variable al archivo `.env`:

      ```
      VITE_API_URL=<URL_DE_TU_API>
      ```

      - Reemplazar `<URL_DE_TU_API>` con la URL real de tu API.

2. **Iniciar la aplicación:**
    - Ejecutar el siguiente comando en la terminal:

      ```
      yarn dev
      ```

**Explicación:**

* El archivo `.env` se utiliza para almacenar variables de entorno que no deben incluirse en el código fuente. En este caso, la variable `VITE_API_URL` guarda la URL de la API que se utilizará en la aplicación.
* El comando `yarn dev` inicia el servidor de desarrollo local. Esto compilará el código de la aplicación y lo ejecutará en un servidor web local. Puedes acceder a la aplicación en tu navegador web en la siguiente URL: **http://localhost:5173/**

