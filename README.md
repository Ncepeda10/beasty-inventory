# 🥩 Beasty Butchers - Gestión de Inventarios

Sistema completo de gestión de inventarios para restaurante Beasty Butchers construido con Next.js 16, Shadcn/ui, Tailwind CSS y PostgreSQL.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **UI Library**: Shadcn/ui + Tailwind CSS
- **Base de Datos**: PostgreSQL (Neon.tech, Supabase, o local)
- **ORM**: Drizzle ORM
- **Notificaciones**: Sonner
- **Estilo**: Minimalista, color principal Naranja (#F97316), Mobile-first

## 🛠️ Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar base de datos

1. Elige un proveedor de PostgreSQL:
   - **Neon.tech** (recomendado): https://neon.tech
   - **Supabase**: https://supabase.com
   - **Local**: PostgreSQL en tu máquina

2. Crea un nuevo proyecto de base de datos

3. Copia la connection string (DATABASE_URL)

4. Crea un archivo `.env.local` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://username:password@host/database"
```

**Ejemplos de DATABASE_URL:**
- Neon: `postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/dbname`
- Supabase: `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres`
- Local: `postgresql://postgres:mypass@localhost:5432/beasty_inventory`

### 3. Ejecutar migraciones

```bash
# Generar migraciones
npm run db:generate

# Aplicar migraciones a la base de datos
npm run db:push
```

### 4. Ejecutar seed (datos reales de Beasty Butchers)

```bash
npm run db:seed-final
```

Esto creará:
- ✅ 6 unidades de medida (kg, g, L, ml, u, caj)
- ✅ 517 productos reales del restaurante
- ✅ 6 plantillas de inventario (COCINA TOP 15, BARRA TOP 15, etc.)
- ✅ Relaciones entre productos y plantillas

## 🏃‍♂️ Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📊 Funcionalidades Completas

### 🧭 Navegación Lateral
- ✅ Sidebar responsivo con tema oscuro
- ✅ Navegación intuitiva entre módulos
- ✅ Resaltado automático del item activo
- ✅ Iconos de Lucide React
- ✅ Oculto en móviles, fijo en desktop

### 🏠 Dashboard Principal
- ✅ Vista de plantillas disponibles con cards elegantes
- ✅ Navegación intuitiva a formularios de inventario
- ✅ Diseño responsive con tema naranja

### 📝 Nuevo Conteo de Inventario
- ✅ Selección de plantilla para iniciar conteo
- ✅ Creación automática de sesiones de inventario
- ✅ Formulario móvil-friendly con inputs grandes
- ✅ Auto-guardado inteligente (debounce 1s)
- ✅ Indicadores visuales de guardado (✓ verde)
- ✅ Gestión de unidades por defecto
- ✅ Progreso en tiempo real del conteo
- ✅ Finalización y conversión a historial

### 💾 Persistencia de Datos
- ✅ Guardado en base de datos PostgreSQL
- ✅ Transacciones para integridad de datos
- ✅ Server Actions de Next.js
- ✅ Notificaciones con Sonner (éxito/error)
- ✅ Redirección automática después del guardado

### 📋 Historial de Inventarios
- ✅ Lista completa de inventarios realizados
- ✅ Estadísticas del sistema (total, completados)
- ✅ Vista de detalle con productos contados
- ✅ Formateo inteligente de fechas
- ✅ Duración calculada de sesiones
- ✅ Filtrado automático (solo productos con cantidad > 0)

### ⚙️ Administración del Sistema
- ✅ Gestión de unidades de medida (UDM)
- ✅ Gestión completa de plantillas de inventario
- ✅ Configuración de productos por plantilla
- ✅ Interfaz de administración intuitiva
- ✅ Toggle visual con optimismo para selección de productos
- ✅ Tablas responsivas con acciones
- ✅ Diseño consistente con el sistema

## 🗂️ Estructura de Base de Datos

### Tablas principales:
- **`units`** - Unidades de medida (kg, g, L, ml, u, caj)
- **`products`** - Productos del inventario
  - `skuToteat` - Código SKU único
  - `name` - Nombre del producto
  - `unidadBase` - Unidad base sugerida
  - `categoria` - Categoría del producto
- **`templates`** - Plantillas de inventario
  - `numeroPlantilla` - ID numérico único
  - `name` - Nombre de la plantilla
- **`template_items`** - Productos en plantillas (con orden)
- **`inventory_sessions`** - Sesiones de inventario completadas
  - `templateId` - Referencia a plantilla
  - `name` - Nombre descriptivo
  - `status` - Estado (in_progress, completed, cancelled)
  - `completedAt` - Fecha de finalización
- **`inventory_items`** - Items de una sesión de inventario
  - `sessionId` - Referencia a sesión
  - `productId` - Referencia a producto
  - `quantity` - Cantidad contada (decimal)
  - `unitId` - Unidad utilizada
  - `notes` - Notas adicionales

## 📝 Comandos disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build de producción
npm run start        # Iniciar servidor de producción

# Base de datos
npm run db:generate  # Generar migraciones
npm run db:push      # Aplicar migraciones
npm run db:seed      # Ejecutar seed básico (desarrollo)
npm run db:seed-final # Ejecutar seed con datos reales de Beasty Butchers

# Linting
npm run lint         # Ejecutar ESLint
```

## 🚀 Despliegue en Vercel

### 1. Preparar el código
```bash
# Limpiar archivos temporales
# Ejecutar build para verificar que todo funciona
npm run build
```

### 2. Variables de entorno en Vercel
Después de conectar el repositorio:
- Ve a Settings → Environment Variables
- Agrega: `DATABASE_URL` con tu connection string de producción

### 3. Ejecutar seed en producción
```bash
# Una vez desplegado, puedes ejecutar el seed desde Vercel
# O directamente en tu base de datos de producción
npm run db:seed-final
```

## 🛣️ Rutas de la Aplicación

```
📱 Páginas Disponibles:
/                    - Dashboard principal con plantillas
/conteos           - Nuevo conteo (selección de plantilla)
/conteos/[id]      - Formulario de conteo con auto-guardado
/historial          - Lista de inventarios realizados
/historial/[id]     - Detalle de un inventario específico
/inventario/[id]    - Formulario de conteo final (legacy)
/admin/unidades     - Gestión de unidades de medida
/admin/plantillas   - Gestión de plantillas de inventario
/admin/plantillas/[id] - Configuración de productos por plantilla
```
