# Guía rápida para configurar correctamente la cuenta de servicio y credenciales de Google Sheets

## Paso 1: Confirmar correo de la cuenta de servicio

- En Google Cloud Console, ve a **IAM y administración > Cuentas de servicio**.
- Copia el correo electrónico de la cuenta de servicio que usarás (ejemplo: firebase-adminsdk-fbsvc@congaiii-debates.iam.gserviceaccount.com).
- Este correo debe ser el valor de la variable de entorno `GOOGLE_CLIENT_EMAIL`.

## Paso 2: Descargar y configurar la clave privada

- En la cuenta de servicio, ve a la pestaña **Claves**.
- Descarga la clave privada en formato JSON.
- Abre el archivo JSON y copia el valor de `private_key` exactamente, incluyendo saltos de línea.
- Configura la variable de entorno `GOOGLE_PRIVATE_KEY` con este valor.
- Si usas un archivo `.env`, reemplaza los saltos de línea por `\n` y encierra el valor entre comillas dobles, por ejemplo:

```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
```

## Paso 3: Compartir la hoja de cálculo

- Abre tu Google Sheet.
- Haz clic en **Compartir**.
- Añade el correo de la cuenta de servicio con permisos de **Editor**.
- Guarda los cambios.

## Paso 4: Verificar ID de la hoja de cálculo

- El ID de la hoja es la parte de la URL entre `/d/` y `/edit`, por ejemplo:

```
https://docs.google.com/spreadsheets/d/ID_DE_LA_HOJA/edit#gid=0
```

- Este ID debe ser el valor de la variable de entorno `GOOGLE_SHEET_ID`.

## Paso 5: Reiniciar la aplicación

- Reinicia tu servidor para que las variables de entorno se apliquen.
- Prueba enviar el formulario y verifica que los datos se agreguen a la hoja.

---

Si quieres, puedo ayudarte a revisar cada paso o hacer pruebas para confirmar que todo funciona correctamente.
