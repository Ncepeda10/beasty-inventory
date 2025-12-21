"use server";

import { db } from "@/lib/db";
import { inventorySessions, inventoryItems } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface InventoryItemData {
  productId: number;
  quantity: number;
  unitId: number;
  notes?: string;
}

export interface SaveInventoryData {
  templateId: number;
  comments?: string;
  items: InventoryItemData[];
}

export async function saveInventory(data: SaveInventoryData) {
  try {
    // Filtrar solo items con cantidad > 0
    const validItems = data.items.filter(item => item.quantity > 0);

    if (validItems.length === 0) {
      throw new Error("No hay items con cantidad válida para guardar");
    }

    // Generar nombre único para la sesión
    const sessionName = `Inventario ${new Date().toLocaleDateString('es-ES')} - ${new Date().toLocaleTimeString('es-ES')}`;

    // Usar transacción para asegurar integridad
    const result = await db.transaction(async (tx) => {
      // Paso 1: Insertar sesión de inventario
      const [session] = await tx.insert(inventorySessions).values({
        templateId: data.templateId,
        name: sessionName,
        status: 'completed', // Ya que se está guardando como finalizado
        completedAt: new Date(),
      }).returning({ id: inventorySessions.id });

      // Paso 2: Insertar items del inventario
      const itemsToInsert = validItems.map(item => ({
        sessionId: session.id,
        productId: item.productId,
        quantity: item.quantity.toString(), // Convertir a string para decimal
        unitId: item.unitId,
        notes: item.notes || null,
      }));

      await tx.insert(inventoryItems).values(itemsToInsert);

      return {
        sessionId: session.id,
        itemsCount: itemsToInsert.length,
      };
    });

    // Revalidar la página del dashboard para mostrar cambios
    revalidatePath('/');

    return {
      success: true,
      sessionId: result.sessionId,
      itemsCount: result.itemsCount,
      message: `Inventario guardado exitosamente con ${result.itemsCount} productos`,
    };

  } catch (error) {
    console.error("Error saving inventory:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al guardar el inventario",
    };
  }
}

