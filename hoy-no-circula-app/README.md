# 🚗 Hoy No Circula - Sistema de Validación de Circulación

Aplicación web full-stack para gestionar el registro de vehículos y validar la norma "Hoy No Circula". Desarrollada con **Spring Boot 3** (backend) y **React + TypeScript** (frontend).

## ⚡ Quick Start (5 minutos)

Si ya tienes Java 17+, Maven y Node.js 18+:

```bash
# Terminal 1: Backend
cd hoy-no-circula-app/backend
mvn clean install
mvn spring-boot:run

# Terminal 2: Frontend
cd hoy-no-circula-app/frontend
npm install
npm run dev
```

**Luego abre en el navegador:** http://localhost:3000

---

- ✅ **Registrar vehículos** con información completa (placa, color, modelo, chasis, marca, año)
- 🔍 **Consultar si un vehículo puede circular** en una fecha y hora específica
- 📊 **Validación del "Hoy No Circula"** basada en:
  - Último dígito de la placa
  - Día de la semana
  - Horario (6:00 AM - 10:00 PM)
  - Fin de semana permitido

### Reglas de "Hoy No Circula"

| Día | Dígitos Restringidos |
|-----|----------------------|
| **Lunes** | 1, 2 |
| **Martes** | 3, 4 |
| **Miércoles** | 5, 6 |
| **Jueves** | 7, 8 |
| **Viernes** | 9, 0 |
| **Fin de semana** | ✅ Sin restricción |

**Horario de restricción:** 6:00 AM - 10:00 PM

---

## 📸 Demostración (Pantallas)

### Frontend
```
┌─────────────────────────────────┐
│  Hoy No Circula 🚗              │
├─────────────────────────────────┤
│                                 │
│  📝 Registrar Nuevo Vehículo    │
│  ┌───────────────────────────┐  │
│  │ Placa: [ABC-1234]         │  │
│  │ Color: [Rojo]             │  │
│  │ Modelo: [Sedan]           │  │
│  │ Chasis: [1HGBH41JXMN...] │  │
│  │ Marca: [Toyota]           │  │
│  │ Año: [2023]               │  │
│  │                           │  │
│  │ [Registrar Vehículo]      │  │
│  └───────────────────────────┘  │
│                                 │
│  🔍 Consultar Circulación       │
│  ┌───────────────────────────┐  │
│  │ Placa: [ABC-1234]         │  │
│  │ Fecha: [18/01/2026 09:00] │  │
│  │                           │  │
│  │ [Consultar Circulación]   │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## 🛠️ Tecnologías

**Backend:**
- Java 17, Spring Boot 3.2.1, Spring Data JPA
- PostgreSQL (producción) / H2 (desarrollo)
- SpringDoc OpenAPI (Swagger)

**Frontend:**
- React 18, TypeScript, Vite
- Material UI, Formik, Yup para validaciones robustas, Axios

**DevOps:**
- Docker, Docker Compose, Nginx

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Java 17+** - [Descargar](https://www.oracle.com/java/technologies/downloads/#java17)
- **Maven 3.8+** - Incluido con Java, verificar con: `mvn -v`
- **Node.js 18+** - [Descargar](https://nodejs.org/)
- **Git** - Para clonar el repositorio

### Verificar Instalación

```bash
# Verificar Java
java -version

# Verificar Maven
mvn -v

# Verificar Node.js
node --version
npm --version
```

---

## 🎯 Ejecutar en Desarrollo Local

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/LeoDevexe/technical_assessment.git
cd technical_assessment/hoy-no-circula-app
```

### 2️⃣ Ejecutar el Backend

**Terminal 1 (Backend):**

```bash
cd backend

# Instalar dependencias y compilar
mvn clean install

# Ejecutar el servidor
mvn spring-boot:run
```

✅ **Esperado:**
```
Started HoyNocirculaApplication in X seconds
```

🌐 **Backend disponible en:**
- URL Principal: `http://localhost:8080`
- Documentación API (Swagger): `http://localhost:8080/swagger-ui.html`
- Health Check: `http://localhost:8080/api/v1/info/health`

**Credenciales para desarrollo:**
- API Key: `dev-api-key-12345`

---

### 3️⃣ Ejecutar el Frontend

**Terminal 2 (Frontend):**

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

✅ **Esperado:**
```
  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

🌐 **Frontend disponible en:**
- `http://localhost:3000` (o `http://localhost:3001` si 3000 está en uso)

---

### 📝 Variables de Entorno - Frontend (Desarrollo)

El archivo `frontend/.env` ya contiene las variables necesarias para desarrollo local:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_API_KEY=dev-api-key-12345
```

**No necesitas cambiar nada** si ejecutas el backend en `http://localhost:8080`. El frontend se conectará automáticamente.

Si el backend está en otra máquina o puerto, actualiza:
- `VITE_API_BASE_URL`: URL base de la API del backend
- `VITE_API_KEY`: Clave API (debe coincidir con las claves configuradas en el backend)

---

## 🧪 Probar la Aplicación

### En el Navegador

1. Abre **http://localhost:3000** en tu navegador
2. Verás dos formularios:
   - **Registrar Nuevo Vehículo** 🚗
   - **Consultar Circulación** 🔍

### Datos de Prueba

**Registrar un vehículo:**
```
Placa:      ABC-1234 (o ABC1234)
Color:      Rojo
Modelo:     Sedan
Chasis:     1HGBH41JXMN109186 (17 caracteres)
Marca:      Toyota
Año:        2023 (opcional)
```

**Consultar circulación:**
```
Placa:           ABC-1234
Fecha y Hora:    18/01/2026 09:00
```

---

### Desde Swagger UI (Más técnico)

1. Abre **http://localhost:8080/swagger-ui.html**
2. Expande **"vehicles-controller"**
3. Prueba los endpoints

---

## 🐳 Opción: Ejecutar con Docker Compose

Si tienes Docker instalado:

```bash
docker-compose up --build
```

URLs:
- Frontend: **http://localhost:3000**
- Backend: **http://localhost:8080**

---

## 📦 Despliegue en Producción (Ya realizado)

### URLs en Render.com

- **Frontend**: https://technical-assessment-1-m4g7.onrender.com
- **Backend API**: https://technical-assessment-2qji.onrender.com/api/v1

### Opción 1: Render.com (Recomendado - Gratis)

1. **Crear cuenta en Render**: https://render.com
2. **Crear PostgreSQL**:
   - "+ New +" → "PostgreSQL"
   - Name: `hoy-no-circula-db`
   - Plan: Free
   - Guardar credenciales

3. **Desplegar Backend**:
   - "+ New +" → "Web Service"
   - Conectar repositorio GitHub: `LeoDevexe/technical_assessment`
   - ⚠️ **Root Directory**: `hoy-no-circula-app` (IMPORTANTE)
   - Runtime: Docker
   - Dockerfile Path: `./Dockerfile.backend`
   - Variables de entorno:
     ```
     SPRING_PROFILES_ACTIVE=prod
     SPRING_DATASOURCE_URL=jdbc:postgresql://[host]:5432/hoy_no_circula
     SPRING_DATASOURCE_USERNAME=[usuario]
     SPRING_DATASOURCE_PASSWORD=[contraseña]
     SPRING_JPA_HIBERNATE_DDL_AUTO=update
     ```
   - ⚠️ **IMPORTANTE**: Agrega `jdbc:` al inicio de SPRING_DATASOURCE_URL
   - Ejemplo: Si Render te da `postgresql://host:5432/db`, usa `jdbc:postgresql://host:5432/db`

4. **Desplegar Frontend**:
   - "+ New +" → "Web Service"
   - Conectar el mismo repositorio
   - ⚠️ **Root Directory**: `hoy-no-circula-app` (IMPORTANTE)
   - Runtime: Docker
   - Dockerfile Path: `./Dockerfile.frontend`
   - Variable de entorno:
     ```
     VITE_API_BASE_URL=https://technical-assessment-2qji.onrender.com/api/v1
     ```

### Opción 2: Docker Compose

```bash
# Configurar variables en docker-compose.yml
docker-compose build
docker-compose up -d
```

---

## 📖 API Endpoints

### Registrar Vehículo

```bash
POST /api/v1/vehicles/register
Content-Type: application/json

{
  "plate": "ABC-123",
  "color": "Rojo",
  "model": "Sedan",
  "chassis": "CH123456789",
  "brand": "Toyota",
  "year": 2023
}
```

### Consultar Circulación

```bash
POST /api/v1/circulation/check
Content-Type: application/json

{
  "plate": "ABC-123",
  "checkDateTime": "2026-01-17 09:00:00"
}
```

### Documentación Interactiva

Accede a Swagger UI: **http://localhost:8080/swagger-ui.html**

---

## 🧪 Testing

```bash
cd backend
mvn test
```

Tests incluidos:
- Validación de circulación
- Restricciones por día y horario
- Fin de semana sin restricción

---

## 🔐 Seguridad - API Key

**⚠️ IMPORTANTE:** Todos los endpoints de la API requieren una **API Key** en el header.

### Para Desarrollo (Ya configurado ✅)

El frontend ya envía automáticamente:
```
X-API-Key: dev-api-key-12345
```

**No necesitas hacer nada más**, todo funciona automáticamente en desarrollo.

### Si Quieres Probar Manualmente

**Con cURL:**
```bash
curl -X GET http://localhost:8080/api/v1/info/health \
  -H "X-API-Key: dev-api-key-12345"
```

**Registro de vehículo:**
```bash
curl -X POST http://localhost:8080/api/v1/vehicles/register \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-api-key-12345" \
  -d '{
    "plate": "ABC-1234",
    "color": "Rojo",
    "model": "Sedan",
    "chassis": "1HGBH41JXMN109186",
    "brand": "Toyota",
    "year": 2023
  }'
```

### API Keys por Entorno

| Entorno | API Key |
|---------|---------|
| Desarrollo | `dev-api-key-12345` |
| Producción | `XXXXX` |
| Mobile | `mobile-app-key-2024` |

### Error: 401 Unauthorized

Si ves este error:
```json
{"error": "API Key inválida o expirada"}
```

**Solución:**
1. Verifica que el header `X-API-Key` está presente
2. Verifica que la clave sea correcta
3. Reinicia el backend

---

---

## 📖 Variables de Entorno

### Para Desarrollo Local (Ya está todo configurado ✅)

Las variables de desarrollo ya están en los archivos:
- Frontend: `frontend/.env`
- Backend: `backend/src/main/resources/application.properties`

**No necesitas cambiar nada para desarrollo.**

---

### Para Producción (Render.com)

Cuando despliegues a Render, necesitarás agregar estas variables:

**Backend Web Service:**

En Render Dashboard → Tu servicio Backend → Settings → Environment

```bash
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:postgresql://[host]:[puerto]/[base-datos]
SPRING_DATASOURCE_USERNAME=[usuario]
SPRING_DATASOURCE_PASSWORD=[contraseña]
SPRING_JPA_HIBERNATE_DDL_AUTO=update
APP_API_KEYS=XXXXX,mobile-app-key-2024
```

**Frontend Static Site:**

En Render Dashboard → Tu servicio Frontend → Settings → Environment

```bash
VITE_API_KEY=XXXXX
```

---

### Detalles por Archivo

**Frontend `frontend/.env` (Desarrollo):**
```properties
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_API_KEY=dev-api-key-12345
```

**Frontend `frontend/.env.production` (Producción):**
```properties
VITE_API_BASE_URL=https://technical-assessment-2qji.onrender.com/api/v1
VITE_API_KEY=XXXXX
```

**Backend `backend/src/main/resources/application.properties` (Desarrollo):**
```properties
spring.application.name=hoy-no-circula-backend
spring.profiles.active=dev
spring.datasource.url=jdbc:h2:mem:testdb
app.api.keys=dev-api-key-12345,XXXXX,mobile-app-key-2024
```

**Backend `backend/src/main/resources/application-prod.properties` (Producción):**
```properties
spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO:update}
app.api.keys=${APP_API_KEYS:XXXXX,mobile-app-key-2024}
```

---

## � Troubleshooting - Problemas Comunes

### ❌ "Puerto 8080 ya está en uso"

```
Address already in use: bind
```

**Solución:**
```bash
# Matar el proceso Java anterior
# En Windows PowerShell:
Get-Process java | Stop-Process -Force

# O cambiar el puerto en backend/src/main/resources/application.properties:
server.port=8081
```

---

### ❌ "Cannot GET /" en Frontend

El frontend no carga, muestra error en la consola.

**Solución:**
1. Verifica que el backend está ejecutándose: `http://localhost:8080/api/v1/info/health`
2. Verifica que el `.env` tiene la URL correcta
3. Recarga la página: `Ctrl + Shift + R` (hard refresh)

---

### ❌ "API Key inválida" (401 Unauthorized)

```json
{"error": "API Key inválida o expirada"}
```

**Soluciones:**
1. Verifica que el `.env` tiene `VITE_API_KEY=dev-api-key-12345`
2. Reinicia el frontend: `npm run dev`
3. Recarga la página en el navegador

---

### ❌ "No se puede conectar a localhost:8080"

**Solución:**
1. Verifica que el backend está ejecutándose
2. En terminal del backend deberías ver:
   ```
   Started HoyNocirculaApplication in X seconds
   ```
3. Si no, ejecuta: `cd backend && mvn spring-boot:run`

---

### ❌ Error en Maven: "Could not find or load main class"

**Solución:**
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```

---

### ❌ "npm: command not found"

Node.js no está instalado.

**Solución:**
1. Descarga Node.js desde: https://nodejs.org/
2. Instala la versión LTS (18+)
3. Reinicia la terminal y verifica: `node --version`

---

### ❌ En los formularios no se aceptan valores

Los inputs no permiten escribir o aparecen en rojo.

**Solución:**
1. Abre la consola del navegador: `F12`
2. Verifica que no hay errores JavaScript
3. Recarga la página completamente: `Ctrl + Shift + R`
4. Si persiste, limpia el caché: `npm run dev` (cierra y abre otra vez)

---

## ✅ Verificación Rápida

Si completaste todo correctamente, deberías ver:

- [ ] Backend corriendo en http://localhost:8080 ✅
- [ ] Frontend corriendo en http://localhost:3000 ✅
- [ ] Swagger disponible en http://localhost:8080/swagger-ui.html ✅
- [ ] Puedes registrar un vehículo sin errores ✅
- [ ] Puedes consultar la circulación ✅
- [ ] Los formularios muestran validación en rojo si hay error ✅
- [ ] Sin errores en la consola del navegador (F12) ✅

---

```
backend/
  ├── controller/     # REST Controllers
  ├── service/        # Business Logic
  ├── repository/     # Data Access
  ├── domain/         # JPA Entities
  └── dto/            # Data Transfer Objects

frontend/
  ├── components/     # React Components
  ├── pages/          # Page Components
  ├── services/       # API Clients
  └── types/          # TypeScript Types
```

---

## ✅ Buenas Prácticas Implementadas

- ✅ Arquitectura en capas (Controller → Service → Repository)
- ✅ Global Exception Handling
- ✅ Validación de datos (Jakarta Validation)
- ✅ Swagger/OpenAPI documentation
- ✅ Unit Tests (JUnit 5 + Mockito)
- ✅ Docker containerization
- ✅ TypeScript type safety
- ✅ Material UI components

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.
