import { db } from "@/lib/db";
import { products, units } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { columns, type ProductWithUnit } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

async function getProducts(): Promise<ProductWithUnit[]> {
  try {
    // Consulta directa usando solo las columnas que sabemos que existen
    const result = await db.execute(`
      SELECT
        p.id,
        p.name,
        p.is_active as active,
        p.default_unit_id as unit_id,
        u.id as unit_id_join,
        u.name as unit_name,
        u.abbreviation as unit_abbreviation
      FROM products p
      LEFT JOIN units u ON p.default_unit_id = u.id
      ORDER BY p.name
    `);

    // Transformar el resultado al formato esperado
    const transformedResult = result.map((row: any) => ({
      id: row.id,
      name: row.name,
      category: null, // No existe en BD real
      active: row.active,
      unit_id: row.unit_id,
      unit: row.unit_id_join ? {
        id: row.unit_id_join,
        name: row.unit_name,
        abbreviation: row.unit_abbreviation,
      } : null,
    }));

    return transformedResult as ProductWithUnit[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Package className="w-8 h-8 mr-3 text-orange-600" />
                Gestión de Productos
              </h1>
              <p className="text-gray-600">
                Administra todos los productos del sistema de inventarios con filtros avanzados y búsqueda
              </p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6">
          <DataTable columns={columns} data={products} />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Total de productos: {products.length} • Sistema de Inventarios Beasty Butchers</p>
        </div>
      </div>
    </div>
  );
}
