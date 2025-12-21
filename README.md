# 🥩 Beasty Butchers - Gestión de Inventarios

Sistema de gestión de inventarios para restaurante Beasty Butchers construido con Next.js 14, Shadcn/ui, Tailwind CSS y PostgreSQL.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Shadcn/ui + Tailwind CSS
- **Base de Datos**: PostgreSQL (Neon.tech)
- **ORM**: Drizzle ORM
- **Estilo**: Minimalista, color principal Naranja (#F97316), Mobile-first

## 🛠️ Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar base de datos

1. Crea una cuenta en [Neon.tech](https://neon.tech)
2. Crea un nuevo proyecto de base de datos
3. Copia la connection string (DATABASE_URL)
4. Crea un archivo `.env.local` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://username:password@host/database"
```

### 3. Ejecutar migraciones

```bash
# Generar migraciones
npm run db:generate

# Aplicar migraciones a la base de datos
npm run db:push
```

### 4. Ejecutar seed (datos iniciales)

```bash
npm run db:seed
```

Esto creará:
- ✅ 6 unidades de medida (kg, g, L, ml, u, caj)
- ✅ 5 productos de ejemplo
- ✅ 1 plantilla "Diario Cocina" con los productos ordenados

## 🏃‍♂️ Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📊 Funcionalidades del MVP

- ✅ Dashboard simple para elegir plantilla de inventario
- ✅ Vista "Realizar Inventario" con productos ordenados
- ✅ Lógica de calculadora simple para cantidades
- ✅ Selección de unidades de medida
- ✅ Guardar y finalizar inventario

## 🗂️ Estructura de Base de Datos

### Tablas principales:
- `units` - Unidades de medida
- `products` - Productos del inventario
- `templates` - Plantillas de inventario
- `template_items` - Productos en plantillas (con orden)
- `inventory_sessions` - Sesiones de inventario
- `inventory_items` - Items de una sesión de inventario

## 📝 Comandos disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build de producción
npm run start        # Iniciar servidor de producción

# Base de datos
npm run db:generate  # Generar migraciones
npm run db:push      # Aplicar migraciones
npm run db:seed      # Ejecutar seed

# Linting
npm run lint         # Ejecutar ESLint
```
