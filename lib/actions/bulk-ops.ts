"use server";

import { db } from "@/lib/db";
import { products, units, inventorySessions, inventoryItems, templates } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function generateInventoryTemplate() {
  try {
    // Obtener productos activos con sus unidades por defecto
    const activeProducts = await db
      .select({
        id: products.id,
        name: products.name,
        categoria: products.categoria,
        unitAbbreviation: units.abbreviation,
      })
      .from(products)
      .leftJoin(units, eq(products.defaultUnitId, units.id))
      .where(eq(products.isActive, true))
      .orderBy(products.name);

    // Crear headers del CSV
    const headers = ["id", "product_name", "category", "unit_abbreviation", "quantity"];

    // Crear filas de datos
    const rows = activeProducts.map(product => [
      product.id.toString(),
      product.name,
      product.categoria || "",
      product.unitAbbreviation || "",
      "", // quantity vacío por defecto
    ]);

    // Combinar headers y rows
    const csvData = [headers, ...rows];

    // Convertir a CSV string
    const csvString = csvData
      .map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(","))
      .join("\n");

    return {
      success: true,
      csvData: csvString,
      filename: `plantilla_inventario_${new Date().toISOString().split('T')[0]}.csv`,
    };
  } catch (error) {
    console.error("Error generating inventory template:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al generar la plantilla",
    };
  }
}

export async function processBulkUpload(csvData: Array<{
  id: string;
  product_name: string;
  category: string;
  unit_abbreviation: string;
  quantity: string;
}>) {
  try {
    // Obtener el primer template activo para usar en la sesión
    const [defaultTemplate] = await db
      .select({ id: templates.id })
      .from(templates)
      .where(eq(templates.isActive, true))
      .limit(1);

    if (!defaultTemplate) {
      return {
        success: false,
        error: "No hay plantillas activas disponibles. Crea al menos una plantilla antes de realizar una carga masiva.",
      };
    }

    // Crear la sesión de inventario con estado 'completed'
    const now = new Date();
    const sessionName = `Carga Masiva - ${now.toLocaleDateString('es-ES')} ${now.toLocaleTimeString('es-ES')}`;

    const [session] = await db.insert(inventorySessions).values({
      templateId: defaultTemplate.id,
      name: sessionName,
      status: 'completed', // Estado cerrado ya que es una carga masiva completa
      startedAt: now,
      completedAt: now,
    }).returning({ id: inventorySessions.id });

    // Procesar cada fila del CSV
    let processedCount = 0;
    let skippedCount = 0;

    for (const row of csvData) {
      // Validar que el ID del producto sea válido
      const productId = parseInt(row.id);
      if (isNaN(productId)) {
        console.warn(`Skipping invalid product ID: ${row.id}`);
        skippedCount++;
        continue;
      }

      // Validar que la cantidad sea un número positivo
      const quantity = parseFloat(row.quantity);
      if (isNaN(quantity) || quantity <= 0) {
        // Si cantidad no es válida o es 0, saltar este producto
        skippedCount++;
        continue;
      }

      // Verificar que el producto existe y está activo
      const [product] = await db
        .select({
          id: products.id,
          defaultUnitId: products.defaultUnitId,
        })
        .from(products)
        .where(
          and(
            eq(products.id, productId),
            eq(products.isActive, true)
          )
        )
        .limit(1);

      if (!product) {
        console.warn(`Product not found or inactive: ${productId}`);
        skippedCount++;
        continue;
      }

      // Obtener la unidad por abreviatura para este producto
      let unitId = product.defaultUnitId;

      if (row.unit_abbreviation && row.unit_abbreviation !== product.defaultUnitId?.toString()) {
        // Si se especificó una unidad diferente, buscarla
        const [specifiedUnit] = await db
          .select({ id: units.id })
          .from(units)
          .where(eq(units.abbreviation, row.unit_abbreviation))
          .limit(1);

        if (specifiedUnit) {
          unitId = specifiedUnit.id;
        }
      }

      if (!unitId) {
        console.warn(`No unit found for product ${productId}`);
        skippedCount++;
        continue;
      }

      // Insertar el item de inventario
      await db.insert(inventoryItems).values({
        sessionId: session.id,
        productId,
        quantity: quantity.toString(),
        unitId,
      });

      processedCount++;
    }

    // Revalidar las rutas relevantes
    revalidatePath("/");
    revalidatePath("/historial");

    return {
      success: true,
      message: `Carga masiva completada. ${processedCount} productos procesados, ${skippedCount} omitidos.`,
      sessionId: session.id,
      processedCount,
      skippedCount,
    };
  } catch (error) {
    console.error("Error processing bulk upload:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al procesar la carga masiva",
    };
  }
}

