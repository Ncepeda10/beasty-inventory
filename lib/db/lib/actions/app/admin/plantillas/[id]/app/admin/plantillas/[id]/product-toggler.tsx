"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toggleProductInTemplate } from "@/lib/actions/templates";
import { toast } from "sonner"; // O tu librería de toast

export function ProductToggler({ templateId, product, initialChecked }: any) {
  const [checked, setChecked] = useState(initialChecked);
  const [loading, setLoading] = useState(false);

  const handleChange = async (isChecked: boolean) => {
    setChecked(isChecked); // Optimistic update visual
    setLoading(true);
    
    const result = await toggleProductInTemplate(templateId, product.id, isChecked);
    
    if (!result.success) {
      setChecked(!isChecked); // Revertir si falló
      toast.error("Error al guardar cambio");
    }
    setLoading(false);
  };

  return (
    <div className={`flex items-center space-x-2 p-3 border rounded-lg ${checked ? "bg-orange-50 border-orange-200" : "bg-white"}`}>
      <Checkbox 
        id={`prod-${product.id}`} 
        checked={checked}
        onCheckedChange={handleChange}
        disabled={loading}
      />
      <Label htmlFor={`prod-${product.id}`} className="cursor-pointer flex-1 text-sm">
        {product.name} <span className="text-xs text-gray-400">({product.category})</span>
      </Label>
    </div>
  );
}