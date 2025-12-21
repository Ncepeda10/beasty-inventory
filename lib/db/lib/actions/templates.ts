"use server";

import { db } from "@/lib/db";
import { templateItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Función para vincular/desvincular un producto de una planilla
export async function toggleProductInTemplate(templateId: number, productId: number, isSelected: boolean) {
  try {
    if (isSelected) {
      // Si se seleccionó (check), lo agregamos
      await db.insert(templateItems).values({
        templateId,
        productId,
      }).onConflictDoNothing();
    } else {
      // Si se desmarcó (uncheck), lo borramos
      await db.delete(templateItems)
        .where(
          and(
            eq(templateItems.templateId, templateId),
            eq(templateItems.productId, productId)
          )
        );
    }
    
    // Recargamos la página para ver cambios
    revalidatePath("/admin/plantillas"); 
    return { success: true };
  } catch (error) {
    console.error("Error updating template:", error);
    return { success: false, error: "Error al actualizar la planilla" };
  }
}