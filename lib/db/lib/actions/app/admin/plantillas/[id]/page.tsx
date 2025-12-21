import { db } from "@/lib/db";
import { products, templateItems, templates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Checkbox } from "@/components/ui/checkbox"; // Asegúrate de tener este componente de Shadcn
import { ProductToggler } from "./product-toggler"; // Componente cliente que crearemos abajo

export default async function TemplateConfigPage({ params }: { params: { id: string } }) {
  const templateId = parseInt(params.id);

  // 1. Obtener info de la planilla
  const template = await db.query.templates.findFirst({
    where: eq(templates.id, templateId),
  });

  if (!template) return <div>Planilla no encontrada</div>;

  // 2. Obtener TODOS los productos
  const allProducts = await db.select().from(products).orderBy(products.name);

  // 3. Obtener los productos que YA están en esta planilla
  const existingItems = await db.select()
    .from(templateItems)
    .where(eq(templateItems.templateId, templateId));

  // Crear un Set con los IDs activos para buscar rápido
  const activeProductIds = new Set(existingItems.map(item => item.productId));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Configurar: {template.name}</h1>
      <p className="text-muted-foreground mb-6">
        Marca los productos que quieres que aparezcan en esta planilla.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProducts.map((product) => (
          <ProductToggler 
            key={product.id}
            templateId={templateId}
            product={product}
            initialChecked={activeProductIds.has(product.id)}
          />
        ))}
      </div>
    </div>
  );
}