"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Papa from "papaparse";
import { generateInventoryTemplate, processBulkUpload } from "@/lib/actions/bulk-ops";

interface CSVRow {
  id: string;
  product_name: string;
  category: string;
  unit_abbreviation: string;
  quantity: string;
}

export default function CargaMasivaPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [previewData, setPreviewData] = useState<CSVRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = async () => {
    setIsDownloading(true);
    try {
      const result = await generateInventoryTemplate();

      if (result.success && result.csvData) {
        // Crear blob y descargar archivo
        const blob = new Blob([result.csvData], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");

        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", result.filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        toast.success("Plantilla descargada exitosamente");
      } else {
        toast.error(result.error || "Error al descargar la plantilla");
      }
    } catch (error) {
      console.error("Error downloading template:", error);
      toast.error("Error al descargar la plantilla");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast.error("Solo se permiten archivos CSV");
      return;
    }

    // Parsear el archivo CSV
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error("CSV parsing errors:", results.errors);
          toast.error("Error al leer el archivo CSV. Verifica el formato.");
          return;
        }

        // Validar estructura del CSV
        const requiredHeaders = ['id', 'product_name', 'category', 'unit_abbreviation', 'quantity'];
        const fileHeaders = results.meta.fields || [];

        const missingHeaders = requiredHeaders.filter(header => !fileHeaders.includes(header));
        if (missingHeaders.length > 0) {
          toast.error(`El archivo CSV no tiene las columnas requeridas: ${missingHeaders.join(', ')}`);
          return;
        }

        setCsvData(results.data);
        setPreviewData(results.data.slice(0, 5)); // Mostrar primeras 5 filas

        toast.success(`Archivo cargado exitosamente. ${results.data.length} filas encontradas.`);
      },
      error: (error) => {
        console.error("Papa Parse error:", error);
        toast.error("Error al procesar el archivo CSV");
      }
    });
  };

  const handleProcessUpload = async () => {
    if (csvData.length === 0) {
      toast.error("No hay datos para procesar");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processBulkUpload(csvData);

      if (result.success) {
        toast.success(result.message || "Carga masiva procesada exitosamente");

        // Limpiar estado
        setCsvData([]);
        setPreviewData([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error(result.error || "Error al procesar la carga masiva");
      }
    } catch (error) {
      console.error("Error processing upload:", error);
      toast.error("Error inesperado al procesar la carga");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6">
          <div className="flex items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Carga Masiva de Inventario
              </h1>
              <p className="text-gray-600">
                Descarga la plantilla de productos, completa las cantidades offline y sube el archivo para crear un inventario completo.
              </p>
            </div>
          </div>
        </div>

        {/* Sección 1: Descargar Plantilla */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Paso 1: Descargar Plantilla
            </CardTitle>
            <CardDescription>
              Descarga un archivo CSV con todos los productos activos del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                El archivo incluirá: ID del producto, nombre, categoría, unidad y columna de cantidad vacía
              </div>
              <Button
                onClick={handleDownloadTemplate}
                disabled={isDownloading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? "Descargando..." : "Descargar Plantilla"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sección 2: Subir Inventario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Paso 2: Subir Inventario Completado
            </CardTitle>
            <CardDescription>
              Selecciona el archivo CSV completado con las cantidades de inventario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Input de archivo */}
            <div className="space-y-2">
              <Label htmlFor="csv-file">Archivo CSV</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
            </div>

            {/* Previsualización */}
            {previewData.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Archivo cargado: {csvData.length} filas encontradas
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  Previsualización de las primeras 5 filas:
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-orange-50">
                        <TableHead className="font-semibold text-orange-900">ID</TableHead>
                        <TableHead className="font-semibold text-orange-900">Producto</TableHead>
                        <TableHead className="font-semibold text-orange-900">Categoría</TableHead>
                        <TableHead className="font-semibold text-orange-900">Unidad</TableHead>
                        <TableHead className="font-semibold text-orange-900">Cantidad</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-mono text-xs text-gray-600">
                            {row.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {row.product_name}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {row.category}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {row.unit_abbreviation}
                          </TableCell>
                          <TableCell>
                            {row.quantity ? (
                              <span className="font-semibold text-green-600">
                                {row.quantity}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {csvData.length > 5 && (
                  <div className="text-xs text-gray-500 text-center">
                    ... y {csvData.length - 5} filas más
                  </div>
                )}

                {/* Botón de procesamiento */}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleProcessUpload}
                    disabled={isProcessing}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isProcessing ? "Procesando..." : "Procesar Carga"}
                  </Button>
                </div>
              </div>
            )}

            {/* Estado vacío */}
            {csvData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Selecciona un archivo CSV para comenzar</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instrucciones */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Instrucciones Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-2">
            <p>• <strong>No modifiques</strong> la columna "id" del CSV - es necesaria para identificar los productos</p>
            <p>• Completa solo la columna "quantity" con números positivos</p>
            <p>• Los productos sin cantidad (vacío o 0) serán omitidos</p>
            <p>• Verifica que las unidades sean correctas antes de subir</p>
            <p>• Una vez procesado, el inventario aparecerá en el historial como una sesión completada</p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Sistema de Inventarios Beasty Butchers • Carga Masiva v1.0</p>
        </div>
      </div>
    </div>
  );
}

