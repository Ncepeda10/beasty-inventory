"use server";

import { db } from "@/lib/db";
import { inventorySessions, inventoryItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createSession(templateId: number) {
  try {
    // Generar nombre único para la sesión
    const now = new Date();
    const sessionName = `Conteo ${now.toLocaleDateString('es-ES')} - ${now.toLocaleTimeString('es-ES')}`;

    const [session] = await db.insert(inventorySessions).values({
      templateId,
      name: sessionName,
      status: 'in_progress',
    }).returning({ id: inventorySessions.id });

    return {
      success: true,
      sessionId: session.id,
      message: "Sesión de conteo creada exitosamente",
    };
  } catch (error) {
    console.error("Error creating session:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al crear la sesión",
    };
  }
}

export async function saveInventoryItem(
  sessionId: number,
  productId: number,
  quantity: number,
  unitId: number
) {
  try {
    // Verificar que la sesión existe y está activa
    const sessionCheck = await db
      .select()
      .from(inventorySessions)
      .where(
        and(
          eq(inventorySessions.id, sessionId),
          eq(inventorySessions.status, 'in_progress')
        )
      )
      .limit(1);

    if (sessionCheck.length === 0) {
      return {
        success: false,
        error: "Sesión no encontrada o ya finalizada",
      };
    }

    // Solo guardar si la cantidad es mayor que 0
    if (quantity <= 0) {
      // Si cantidad es 0, eliminar el item si existe
      await db
        .delete(inventoryItems)
        .where(
          and(
            eq(inventoryItems.sessionId, sessionId),
            eq(inventoryItems.productId, productId)
          )
        );

      return {
        success: true,
        message: "Item eliminado del conteo",
      };
    }

    // Buscar si ya existe el item en esta sesión
    const existingItem = await db
      .select()
      .from(inventoryItems)
      .where(
        and(
          eq(inventoryItems.sessionId, sessionId),
          eq(inventoryItems.productId, productId)
        )
      )
      .limit(1);

    if (existingItem.length > 0) {
      // Actualizar cantidad existente
      await db
        .update(inventoryItems)
        .set({
          quantity: quantity.toString(),
          unitId,
        })
        .where(eq(inventoryItems.id, existingItem[0].id));
    } else {
      // Insertar nuevo item
      await db.insert(inventoryItems).values({
        sessionId,
        productId,
        quantity: quantity.toString(),
        unitId,
      });
    }

    // Revalidar la página para actualizar la UI
    revalidatePath(`/conteos/${sessionId}`);

    return {
      success: true,
      message: "Cantidad guardada exitosamente",
    };
  } catch (error) {
    console.error("Error saving inventory item:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al guardar el item",
    };
  }
}

export async function getSessionProgress(sessionId: number) {
  try {
    const items = await db
      .select({
        productId: inventoryItems.productId,
        quantity: inventoryItems.quantity,
        unitId: inventoryItems.unitId,
      })
      .from(inventoryItems)
      .where(eq(inventoryItems.sessionId, sessionId));

    return {
      success: true,
      items: items.map(item => ({
        productId: item.productId,
        quantity: parseFloat(item.quantity.toString()),
        unitId: item.unitId,
      })),
    };
  } catch (error) {
    console.error("Error getting session progress:", error);
    return {
      success: false,
      items: [],
      error: error instanceof Error ? error.message : "Error al obtener progreso",
    };
  }
}
