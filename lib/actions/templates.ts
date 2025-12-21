"use server";

import { db } from "@/lib/db";
import { templateItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleProductInTemplate(
  templateId: number,
  productId: number,
  isSelected: boolean
) {
  try {
    if (isSelected) {
      // Insertar producto en la plantilla
      await db.insert(templateItems).values({
        templateId,
        productId,
        order: 0, // Orden por defecto, puede ser reordenado después
      });
    } else {
      // Eliminar producto de la plantilla
      await db
        .delete(templateItems)
        .where(
          and(
            eq(templateItems.templateId, templateId),
            eq(templateItems.productId, productId)
          )
        );
    }

    // Revalidar la página para actualizar la UI
    revalidatePath(`/admin/plantillas/${templateId}`);

    return {
      success: true,
      message: isSelected
        ? "Producto agregado a la plantilla"
        : "Producto removido de la plantilla",
    };
  } catch (error) {
    console.error("Error toggling product in template:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
