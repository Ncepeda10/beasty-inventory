"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { toggleProductInTemplate } from "@/lib/actions/templates";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  skuToteat: string | null;
  categoria: string | null;
}

interface ProductTogglerProps {
  templateId: number;
  product: Product;
  initialChecked: boolean;
}

export function ProductToggler({ templateId, product, initialChecked }: ProductTogglerProps) {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    const newCheckedState = !isChecked;

    // Optimistic update
    setIsChecked(newCheckedState);

    startTransition(async () => {
      try {
        const result = await toggleProductInTemplate(
          templateId,
          product.id,
          newCheckedState
        );

        if (result.success) {
          toast.success(result.message);
        } else {
          // Revert optimistic update on error
          setIsChecked(!newCheckedState);
          toast.error(result.error || "Error al actualizar el producto");
        }
      } catch (error) {
        // Revert optimistic update on error
        setIsChecked(!newCheckedState);
        toast.error("Error inesperado al actualizar el producto");
        console.error("Error toggling product:", error);
      }
    });
  };

  return (
    <div
      className={cn(
        "relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer",
        isChecked
          ? "border-orange-300 bg-orange-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm",
        isPending && "opacity-70 pointer-events-none"
      )}
      onClick={handleToggle}
    >
      {/* Loading overlay */}
      {isPending && (
        <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
        </div>
      )}

      {/* Checkbox */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {isChecked ? (
            <CheckCircle className="w-5 h-5 text-orange-600" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {product.name}
          </h3>
          {product.skuToteat && (
            <p className="text-xs text-gray-600 mt-1">
              SKU: {product.skuToteat}
            </p>
          )}
          <div className="flex items-center mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
              {product.categoria || "Sin Categoría"}
            </span>
          </div>
        </div>
      </div>

      {/* Selection indicator */}
      {isChecked && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
        </div>
      )}
    </div>
  );
}





