# Guía paso a paso para configurar las credenciales de Google API y solucionar el error "Invalid JWT Signature"

Este documento te guiará para verificar y corregir la configuración de las credenciales de la cuenta de servicio de Google que utiliza tu aplicación para escribir en Google Sheets.

---

## Paso 1: Crear una cuenta de servicio en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Selecciona tu proyecto o crea uno nuevo.
3. En el menú lateral, ve a **IAM y administración** > **Cuentas de servicio**.
4. Haz clic en **Crear cuenta de servicio**.
5. Pon un nombre y descripción, luego haz clic en **Crear y continuar**.
6. Asigna el rol **Editor** o **Editor de hojas de cálculo** para que pueda modificar Google Sheets.
7. Finaliza la creación.

---

## Paso 2: Crear y descargar la clave privada JSON

1. En la lista de cuentas de servicio, selecciona la cuenta creada.
2. Ve a la pestaña **Claves**.
3. Haz clic en **Agregar clave** > **Crear nueva clave**.
4. Selecciona formato JSON y descarga el archivo.
5. Guarda este archivo en un lugar seguro.

---

## Paso 3: Configurar las variables de entorno

1. Abre el archivo JSON descargado con un editor de texto.
2. Copia el valor de `client_email`.
3. Copia el valor de `private_key` tal cual, incluyendo los saltos de línea.
4. En tu entorno de desarrollo o servidor, configura las variables de entorno:

```
GOOGLE_CLIENT_EMAIL=tu_client_email_copiado
GOOGLE_PRIVATE_KEY="tu_private_key_copiado_con_saltos_de_linea"
GOOGLE_SHEET_ID=el_id_de_tu_hoja_de_calculo
```

**Importante:**  
- Asegúrate de que los saltos de línea en `GOOGLE_PRIVATE_KEY` estén correctamente representados. Si usas un archivo `.env`, reemplaza los saltos de línea por `\n` o usa comillas dobles para preservar el formato.  
- Ejemplo para `.env`:

```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
```

---

## Paso 4: Compartir la hoja de cálculo con la cuenta de servicio

1. Abre tu Google Sheet en el navegador.
2. Haz clic en **Compartir**.
3. Añade el correo electrónico de la cuenta de servicio (`client_email`) con permisos de **Editor**.
4. Guarda los cambios.

---

## Paso 5: Reiniciar la aplicación y probar

1. Reinicia tu servidor o entorno de desarrollo para que las variables de entorno se recarguen.
2. Prueba enviar el formulario de confirmación.
3. Verifica que los datos se agreguen a la hoja de cálculo.

---

Si sigues estos pasos y aún tienes problemas, por favor avísame para ayudarte a revisar cada punto en detalle.

---
