"use client";

import { useState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { saveInventoryItem } from "@/lib/actions/sessions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  skuToteat: string | null;
  categoria: string | null;
  defaultUnitId: number | null;
  defaultUnit: {
    id: number;
    name: string;
    abbreviation: string;
  } | null;
}

interface InventoryItemFormProps {
  sessionId: number;
  product: Product;
  initialQuantity: number;
  initialUnitId: number;
  isCompleted: boolean;
}

// Unidades comunes (en una implementación real, estas vendrían del servidor)
const commonUnits = [
  { id: 1, name: "Unidades", abbreviation: "u" },
  { id: 2, name: "Kilogramos", abbreviation: "kg" },
  { id: 3, name: "Gramos", abbreviation: "g" },
  { id: 4, name: "Litros", abbreviation: "L" },
  { id: 5, name: "Mililitros", abbreviation: "ml" },
  { id: 6, name: "Cajas", abbreviation: "caj" },
];

export function InventoryItemForm({
  sessionId,
  product,
  initialQuantity,
  initialUnitId,
  isCompleted: initialIsCompleted
}: InventoryItemFormProps) {
  const [quantity, setQuantity] = useState(initialQuantity.toString());
  const [unitId, setUnitId] = useState(initialUnitId);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [isPending, startTransition] = useTransition();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save cuando cambian los valores (con debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hasUnsavedChanges) {
        handleSave();
      }
    }, 1000); // Esperar 1 segundo después del último cambio

    return () => clearTimeout(timeoutId);
  }, [quantity, unitId, hasUnsavedChanges]);

  const handleQuantityChange = (value: string) => {
    setQuantity(value);
    setHasUnsavedChanges(true);
  };

  const handleUnitChange = (value: string) => {
    setUnitId(parseInt(value));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    const numQuantity = parseFloat(quantity) || 0;

    // No guardar si la cantidad es 0 y ya estaba completado (evitar spam)
    if (numQuantity === 0 && isCompleted) {
      setHasUnsavedChanges(false);
      return;
    }

    startTransition(async () => {
      try {
        const result = await saveInventoryItem(sessionId, product.id, numQuantity, unitId);

        if (result.success) {
          setIsCompleted(numQuantity > 0);
          setHasUnsavedChanges(false);

          // Solo mostrar toast si hay cambios significativos
          if (numQuantity > 0) {
            toast.success(`Guardado: ${product.name}`, {
              description: `${numQuantity} ${commonUnits.find(u => u.id === unitId)?.abbreviation || 'u'}`,
              duration: 2000,
            });
          }
        } else {
          toast.error("Error al guardar", {
            description: result.error || "Inténtalo nuevamente",
          });
        }
      } catch (error) {
        console.error("Error saving:", error);
        toast.error("Error inesperado", {
          description: "No se pudo guardar el cambio",
        });
      }
    });
  };

  const selectedUnit = commonUnits.find(u => u.id === unitId);

  return (
    <div className={cn(
      "p-4 rounded-lg border-2 transition-all duration-200 bg-white",
      isCompleted
        ? "border-green-300 bg-green-50"
        : "border-gray-200 hover:border-orange-300"
    )}>
      {/* Loading overlay */}
      {isPending && (
        <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center z-10">
          <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
        </div>
      )}

      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Package className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-base">
                {product.name}
              </h3>
              {product.skuToteat && (
                <p className="text-sm text-gray-600 mt-1">
                  SKU: {product.skuToteat}
                </p>
              )}
            </div>

            {/* Status indicator */}
            <div className="flex-shrink-0 ml-4">
              {isPending ? (
                <div className="flex items-center text-orange-600 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  Guardando...
                </div>
              ) : isCompleted ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Guardado
                </span>
              ) : hasUnsavedChanges ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Pendiente
                </span>
              ) : null}
            </div>
          </div>

          {/* Form Inputs */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {/* Quantity Input */}
            <div>
              <Label htmlFor={`quantity-${product.id}`} className="text-sm font-medium text-gray-700">
                Cantidad
              </Label>
              <Input
                id={`quantity-${product.id}`}
                type="number"
                step="0.01"
                min="0"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                placeholder="0.00"
                className="mt-1 text-lg h-12"
                disabled={isPending}
              />
            </div>

            {/* Unit Select */}
            <div>
              <Label htmlFor={`unit-${product.id}`} className="text-sm font-medium text-gray-700">
                Unidad
              </Label>
              <Select
                value={unitId.toString()}
                onValueChange={handleUnitChange}
                disabled={isPending}
              >
                <SelectTrigger className="mt-1 h-12">
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
          </div>

          {/* Current value display */}
          {parseFloat(quantity) > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Actual: <span className="font-medium">{parseFloat(quantity)} {selectedUnit?.abbreviation || 'u'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
