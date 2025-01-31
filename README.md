# 🤑 Finanzas personales education

## 📜 Introducción
Bienvenido a la aplicación de finanzas personales. Esta aplicación está diseñada para ayudar a los usuarios a gestionar sus ingresos y gastos de manera eficiente. Utiliza Vue.js para el frontend y Firebase para el backend, proporcionando una experiencia de usuario fluida y segura.

## 🛠️ Descripción del Proyecto
La aplicación de finanzas personales permite a los usuarios registrar y categorizar sus transacciones financieras, visualizar sus saldos actuales y analizar sus ingresos y gastos a lo largo del tiempo.

## 🧩 Componentes del Sistema
1. **Frontend**
   - **Alojamiento**: GitHub Pages
   - **Framework**: Vue.js

2. **Backend**
   - **Autenticación**: Firebase Authentication
   - **Base de Datos**: Firestore
   - **Funciones en la Nube**: Firebase Cloud Functions (opcional)

## 📋 Funcionalidades Clave (Version 1)
- **Autenticación de Usuarios**: Permite a los usuarios registrarse e iniciar sesión usando varios métodos de autenticación.
- **Registro de Transacciones**: Los usuarios pueden registrar ingresos y gastos con detalles como monto, categoría y fecha.
- **Categorización de Transacciones**: Los usuarios pueden categorizar sus transacciones para una mejor organización.
- **Visualización de Saldos**: Los usuarios pueden ver el saldo actual de cada cuenta y un totalizado de todas las cuentas.
- **Análisis Financiero**: Proporciona gráficas y tablas que muestran los ingresos y gastos a lo largo del tiempo.

## 🌐 Estructura del Proyecto
```plaintext
|-- Frontend (GitHub Pages)
|   |-- Vue.js
|
|-- Backend (Firebase)
|   |-- Firebase Authentication
|   |-- Firestore Database
|   |-- Firebase Cloud Functions (opcional)
```

## 🏁 Primeros Pasos

**Clonar el repositorio**: `git clone https://github.com/tuusuario/personal-finance-app.git`

**Instalar dependencias**: `npm install`

**Configurar Firebase**: Sigue las instrucciones en la consola de Firebase para configurar autenticación y Firestore.

**Desplegar el frontend**: `npm run build` y subir los archivos generados a GitHub Pages.

## 🧱 Estructura del Proyecto
1. assets: En este directorio, almacenaremos todos los archivos de activos. Aquí queremos guardar fuentes, iconos, imágenes, estilos, etc.
2. common: Archivos comunes como componentes, directivas, archivos individuales, constantes,
3. layouts: Diseños de la aplicación
4. middlewares: Directorios para trabajar directamente con vue router. Almacena guards de navegación.
5. modules: Núcleo de la aplicación para almacenar todos los módulos.
6. plugins: Almacenamiento de plugins
7. router: Archivos de Vue Router.
8. services: Almacena los servicios, como conexiones a API, almacenamiento local, etc.
9. static: Almacenamiento de datos mock.
10. views: Almacena todos los puntos de entrada para las rutas de la aplicación. Ejemplo: home, about, etc. 

## 👥 Contribuciones

¡Contribuciones son bienvenidas! Por favor, sigue las pautas de contribución y asegúrate de discutir los cambios importantes a través de issues antes de enviar un pull request.