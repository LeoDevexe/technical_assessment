# 🚗 Hoy No Circula - Sistema de Validación de Circulación

Aplicación web full-stack para gestionar el registro de vehículos y validar la norma "Hoy No Circula". Desarrollada con **Spring Boot 3** (backend) y **React + TypeScript** (frontend).

## 📋 Características

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

- **Java 17+**
- **Maven 3.8+**
- **Node.js 18+**
- **Docker** (opcional, para Docker Compose)

### Desarrollo Local

#### Backend

```bash
cd backend
mvn spring-boot:run
```

El backend estará disponible en: **http://localhost:8080**
- API Docs (Swagger): **http://localhost:8080/swagger-ui.html**

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

#### Con Docker Compose

```bash
docker-compose up --build
```

URLs:
- Frontend: **http://localhost:3000**
- Backend: **http://localhost:8080**

---

## 📦 Despliegue en Producción

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

La aplicación utiliza **autenticación con API Key** para proteger todos los endpoints de la API.

### Configuración

Cada solicitud debe incluir el header:
```
X-API-Key: [clave-api]
```

### API Keys Válidas

**Desarrollo:**
```
X-API-Key: dev-api-key-12345
```

**Producción:**
```
X-API-Key: prod-api-key-secure-key
```

### Ejemplo de Solicitud

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

### Con JavaScript/Axios (Frontend)

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'dev-api-key-12345'
  },
});
```

### Gestión de API Keys

⚠️ **En Producción:**
- Las claves deben almacenarse en **variables de entorno**
- Usar diferentes claves para cada entorno (dev, staging, prod)
- Rotar claves regularmente
- Usar HTTPS obligatoriamente

**Ubicación de las claves (backend):**
- [`src/main/java/com/hoynocircula/security/ApiKeyProvider.java`](backend/src/main/java/com/hoynocircula/security/ApiKeyProvider.java)

---

## 📖 Variables de Entorno

### Frontend

```bash
# .env (Desarrollo)
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_API_KEY=dev-api-key-12345
```

```bash
# .env.production (Producción)
VITE_API_BASE_URL=https://technical-assessment-2qji.onrender.com/api/v1
VITE_API_KEY=XXXXXXXX
```

### Backend

#### Desarrollo (H2)

Las claves se definen en `application.properties`:
```properties
# API Keys para desarrollo
app.api.keys=dev-api-key-12345,API_KEY : XXXXX,frontend-web-key-2024
```

#### Producción (Render.com)

En **Render**, en Settings → Environment, agrega:
```
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
SPRING_DATASOURCE_USERNAME=[usuario]
SPRING_DATASOURCE_PASSWORD=[contraseña]
APP_API_KEYS=API_KEY : XXXXX
```

---
spring.datasource.url=jdbc:h2:mem:testdb

# Producción (PostgreSQL)
SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/hoy_no_circula
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=password
SPRING_PROFILES_ACTIVE=prod
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

### Frontend

```env
# Desarrollo
VITE_API_BASE_URL=http://localhost:8080/api/v1

# Producción (Render)
VITE_API_BASE_URL=https://technical-assessment-2qji.onrender.com/api/v1
```

---

## 🏗️ Arquitectura

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
