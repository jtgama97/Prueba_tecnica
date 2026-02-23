# Sistema de Gestión de Estudiantes (Full Stack)

**Autor:** Auto. Ing. Jhonatan Garrido Maturana  
**Rol:** Desarrollador Full Stack y adminitrador de servicio linux(RHEL)
**Fecha:** 2026  

# Sistema de Gestión de Estudiantes (Full Stack)

Este proyecto es una aplicación Full Stack para la gestión de estudiantes y el seguimiento de sus pruebas institucionales, desarrollada con **Laravel 12** y **Angular 19**.

## Tecnologías Utilizadas

### Backend: Laravel 12
- **Justificación:** Laravel 12 proporciona una arquitectura robusta y bien documentada para crear APIs RESTful escalables. Su sistema de migraciones y ORM (Eloquent) facilita la gestión de la base de datos.
- **Autenticación:** Laravel Sanctum para la emisión de tokens API (SPA Authentication).
- **Base de Datos:** **MySQL 8.0** para garantizar la escalabilidad, integridad referencial y rendimiento en entornos de producción.

### Frontend: Angular 19 con Material Design
- **Justificación:** Angular 19 ofrece una estructura sólida para aplicaciones empresariales. Se utilizó el enfoque tradicional de **NgModules** (sin standalone components) según los requerimientos técnicos. La integración de **Angular Material** proporciona un diseño moderno y componentes UI preconstruidos que siguen las directrices de Material Design, mejorando la experiencia de usuario y la estética de la aplicación.
- **Estilos:** SASS para una gestión eficiente y modular de los estilos.
- **Arquitectura:** Separación clara por módulos (Auth, Students) con servicios centralizados en la carpeta `core`.

---

## Requisitos Previos
- **PHP >= 8.2** con extensiones: `php-mysql`, `php-curl`, `php-mbstring`, `php-xml`, `php-zip`
- **Composer** (gestor de dependencias de PHP)
- **MySQL 8.0** o superior
- **Node.js >= 22**
- **pnpm** o **npm** (gestor de dependencias de Node)
- **Angular CLI** (instalado globalmente)

---

## Instrucciones de Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/jtgama97/Prueba_tecnica.git
cd student-management
```

### 2. Configurar MySQL
Asegúrate de que MySQL esté corriendo. Luego, crea la base de datos y el usuario:

```bash
sudo mysql -u root -p
```

Dentro de MySQL, ejecuta:
```sql
CREATE DATABASE students_db;
CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON students_db.* TO 'student_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Configurar el Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

**Configura el archivo `.env` con los datos de MySQL:**
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=students_db
DB_USERNAME=student_user
DB_PASSWORD=password123
```

Ejecuta las migraciones y siembra los datos:
```bash
php artisan migrate:fresh --seed
php artisan serve
```

*El backend correrá en `http://localhost:8000`*

### 4. Configurar el Frontend (Angular)
En una nueva terminal:
```bash
cd frontend
pnpm install
ng serve
```

*El frontend correrá en `http://localhost:4200`*

---

## Estructura del Proyecto

### Backend (Laravel)
```
backend/
├── app/
│   ├── Models/
│   │   └── Student.php          # Modelo de estudiante
│   └── Http/Controllers/Api/
│       ├── AuthController.php   # Controlador de autenticación
│       └── StudentController.php # Controlador CRUD de estudiantes
├── database/
│   ├── migrations/              # Migraciones de base de datos
│   └── seeders/                 # Semillas de datos
├── routes/
│   └── api.php                  # Rutas de la API
└── .env                         # Variables de entorno
```

### Frontend (Angular)
```
frontend/
├── src/app/
│   ├── auth/
│   │   ├── login/               # Componente de login
│   │   └── auth.module.ts       # Módulo de autenticación
│   ├── students/
│   │   ├── student-list/        # Componente de listado
│   │   ├── student-form/        # Componente de formulario
│   │   └── students.module.ts   # Módulo de estudiantes
│   ├── core/
│   │   ├── services/            # Servicios (Auth, Student)
│   │   ├── guards/              # Guards (AuthGuard)
│   │   └── interceptors/        # Interceptores (AuthInterceptor)
│   ├── shared/
│   │   └── material/            # Módulo de Angular Material
│   └── app-routing.module.ts    # Rutas principales
└── src/styles.sass             # Estilos globales
```

---

## Funcionalidades Principales

### 1. Autenticación
- Login seguro con validación de credenciales
- Emisión de tokens JWT mediante Sanctum
- Almacenamiento seguro de tokens en localStorage
- Cierre de sesión con revocación de tokens

### 2. Dashboard de Estudiantes
- Tabla interactiva con datos de estudiantes
- **Filtros dinámicos:**
  - Por estado de la prueba (Pendiente, En Progreso, Completada, Reprobada)
  - Por grado (10A, 10B, 11A, 11B)
- Indicadores visuales con badges de colores según el estado

### 3. CRUD de Estudiantes
- **Crear:** Formulario para registrar nuevos estudiantes
- **Leer:** Visualización de todos los estudiantes con filtros
- **Actualizar:** Edición de datos de estudiantes existentes
- **Eliminar:** Eliminación con confirmación

### 4. Seguridad
- Autenticación basada en tokens (Sanctum)
- Guards para proteger rutas privadas
- Interceptor para adjuntar tokens automáticamente en las peticiones
- Validación en frontend y backend

---

## Decisiones Tecnológicas

| Aspecto | Decisión | Justificación |
|--------|----------|---------------|
| **Base de Datos** | MySQL 8.0 | Escalabilidad, integridad referencial, amplio soporte en producción |
| **Arquitectura** | API REST | Separación clara entre frontend y backend, facilita mantenimiento y testing |
| **Autenticación** | Sanctum | Tokens JWT seguros, ideal para SPAs |
| **NgModules** | Tradicional (no standalone) | Cumplimiento de requerimientos técnicos, estructura modular clara |
| **Estilos** | SASS | Modularidad, variables reutilizables, mejor mantenibilidad |
| **UI Framework** | Angular Material | Componentes UI preconstruidos, diseño moderno y responsivo, siguiendo Material Design |

---

## Credenciales de Prueba

| Campo | Valor |
|-------|-------|
| **Usuario** | `admin@example.com` |
| **Contraseña** | `password` |

---

## Endpoints de la API

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|----------------|
| POST | `/api/login` | Autenticación de usuario | No |
| POST | `/api/logout` | Cierre de sesión | Sí |
| GET | `/api/students` | Listar estudiantes (con filtros) | Sí |
| POST | `/api/students` | Crear estudiante | Sí |
| GET | `/api/students/{id}` | Obtener estudiante | Sí |
| PUT | `/api/students/{id}` | Actualizar estudiante | Sí |
| DELETE | `/api/students/{id}` | Eliminar estudiante | Sí |

---

## Notas Importantes

- **CORS:** Asegúrate de que CORS esté correctamente configurado en Laravel si accedes desde un dominio diferente.
- **Variables de Entorno:** Nunca commits el archivo `.env` con credenciales reales a un repositorio público.
- **Migraciones:** Las migraciones se ejecutan automáticamente con `php artisan migrate:fresh --seed`.
- **Puerto del Frontend:** Si el puerto 4200 está en uso, Angular te ofrecerá otro puerto automáticamente.

---

