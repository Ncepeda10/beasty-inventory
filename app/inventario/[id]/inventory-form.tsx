"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveInventory, InventoryItemData } from "@/actions/save-inventory";

interface Product {
  id: number;
  name: string;
  skuToteat: string | null;
  unidadBase: string | null;
  categoria: string | null;
  defaultUnit: {
    id: number;
    name: string;
    abbreviation: string;
  } | null;
}

interface InventoryItem {
  productId: number;
  quantity: string;
  unitId: number;
  notes: string;
}

interface InventoryFormProps {
  templateId: number;
  products: Product[];
}

export function InventoryForm({ templateId, products }: InventoryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [inventoryItems, setInventoryItems] = useState<Record<number, InventoryItem>>({});
  const [progress, setProgress] = useState(0);

  // Unidades básicas comunes (hardcoded por ahora)
  const commonUnits = [
    { id: 1, name: "Kilogramos", abbreviation: "kg" },
    { id: 2, name: "Gramos", abbreviation: "g" },
    { id: 3, name: "Litros", abbreviation: "L" },
    { id: 4, name: "Mililitros", abbreviation: "ml" },
    { id: 5, name: "Unidades", abbreviation: "u" },
    { id: 6, name: "Cajas", abbreviation: "caj" },
  ];

  // Inicializar items de inventario
  useEffect(() => {
    const initialItems: Record<number, InventoryItem> = {};
    products.forEach(product => {
      initialItems[product.id] = {
        productId: product.id,
        quantity: "",
        unitId: product.defaultUnit?.id || 1, // Default to kg
        notes: "",
      };
    });
    setInventoryItems(initialItems);
  }, [products]);

  // Calcular progreso
  useEffect(() => {
    const completedCount = Object.values(inventoryItems).filter(item =>
      item.quantity.trim() !== "" && parseFloat(item.quantity) > 0
    ).length;
    setProgress(products.length > 0 ? (completedCount / products.length) * 100 : 0);
  }, [inventoryItems, products.length]);

  const updateInventoryItem = (productId: number, field: keyof InventoryItem, value: string | number) => {
    setInventoryItems(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    startTransition(async () => {
      try {
        // Preparar datos para la Server Action
        const validItems: InventoryItemData[] = Object.values(inventoryItems)
          .filter(item => item.quantity.trim() !== "" && parseFloat(item.quantity) > 0)
          .map(item => ({
            productId: item.productId,
            quantity: parseFloat(item.quantity),
            unitId: item.unitId,
            notes: item.notes.trim() || undefined,
          }));

        if (validItems.length === 0) {
          toast.error("No hay productos con cantidad válida para guardar");
          return;
        }

        const result = await saveInventory({
          templateId,
          items: validItems,
        });

        if (result.success) {
          toast.success(result.message || "Inventario guardado exitosamente", {
            description: `Sesión #${result.sessionId} con ${result.itemsCount} productos`,
          });

          // Redirigir al dashboard después de un breve delay para mostrar la notificación
          setTimeout(() => {
            router.push("/");
          }, 1500);
        } else {
          toast.error("Error al guardar el inventario", {
            description: result.error || "Inténtalo nuevamente",
          });
        }
      } catch (error) {
        console.error("Error saving inventory:", error);
        toast.error("Error inesperado", {
          description: "Ocurrió un error al guardar el inventario",
        });
      }
    });
  };

  const getProductCategory = (categoria: string | null) => {
    if (!categoria) return "Sin Categoría";
    return categoria;
  };

  // Agrupar productos por categoría
  const productsByCategory = products.reduce((acc, product) => {
    const category = getProductCategory(product.categoria);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="space-y-6">
      {/* Categories */}
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <Card key={category} className="border-orange-200">
          <CardHeader className="bg-orange-50 border-b border-orange-200">
            <CardTitle className="text-lg text-orange-900 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {category}
              <span className="ml-2 text-sm font-normal text-orange-700">
                ({categoryProducts.length} productos)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {categoryProducts.map((product, index) => {
                const item = inventoryItems[product.id];
                const isCompleted = item?.quantity.trim() !== "";

                return (
                  <div
                    key={product.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      isCompleted
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        {product.skuToteat && (
                          <p className="text-sm text-gray-600 mb-1">
                            SKU: {product.skuToteat}
                          </p>
                        )}
                        {product.unidadBase && (
                          <p className="text-sm text-gray-600">
                            Unidad base: {product.unidadBase}
                          </p>
                        )}
                      </div>
                      {isCompleted && (
                        <div className="flex items-center text-green-600 ml-4">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Cantidad */}
                      <div>
                        <Label htmlFor={`quantity-${product.id}`} className="text-sm font-medium">
                          Cantidad *
                        </Label>
                        <Input
                          id={`quantity-${product.id}`}
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={item?.quantity || ""}
                          onChange={(e) => updateInventoryItem(product.id, "quantity", e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      {/* Unidad */}
                      <div>
                        <Label htmlFor={`unit-${product.id}`} className="text-sm font-medium">
                          Unidad
                        </Label>
                        <Select
                          value={item?.unitId?.toString() || "1"}
                          onValueChange={(value) => updateInventoryItem(product.id, "unitId", parseInt(value))}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {commonUnits.map((unit) => (
                              <SelectItem key={unit.id} value={unit.id.toString()}>
                                {unit.name} ({unit.abbreviation})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Notas */}
                      <div>
                        <Label htmlFor={`notes-${product.id}`} className="text-sm font-medium">
                          Notas
                        </Label>
                        <Input
                          id={`notes-${product.id}`}
                          placeholder="Observaciones..."
                          value={item?.notes || ""}
                          onChange={(e) => updateInventoryItem(product.id, "notes", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Submit Button */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Progreso: {Object.values(inventoryItems).filter(item => item.quantity.trim() !== "" && parseFloat(item.quantity) > 0).length} / {products.length} productos con cantidad
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isPending || progress === 0}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 disabled:opacity-50"
          >
            {isPending ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </div>
            ) : progress === 0 ? (
              "Completar Al Menos un Producto"
            ) : (
              "Finalizar y Guardar Inventario"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
