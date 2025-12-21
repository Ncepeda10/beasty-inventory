import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { inventorySessions, inventoryItems, products, units, templates } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Calendar, User, Package, CheckCircle, Clock } from "lucide-react";

interface InventoryDetail {
  id: number;
  name: string;
  status: string;
  startedAt: Date;
  completedAt: Date | null;
  template: {
    id: number;
    name: string;
  };
  items: Array<{
    id: number;
    quantity: number;
    notes: string | null;
    product: {
      id: number;
      name: string;
      skuToteat: string | null;
      categoria: string | null;
    };
    unit: {
      id: number;
      name: string;
      abbreviation: string;
    };
  }>;
}

async function getInventoryDetail(sessionId: number): Promise<InventoryDetail | null> {
  try {
    // Obtener la sesión de inventario
    const sessionResult = await db
      .select({
        id: inventorySessions.id,
        name: inventorySessions.name,
        status: inventorySessions.status,
        startedAt: inventorySessions.startedAt,
        completedAt: inventorySessions.completedAt,
        template: {
          id: templates.id,
          name: templates.name,
        },
      })
      .from(inventorySessions)
      .innerJoin(templates, eq(inventorySessions.templateId, templates.id))
      .where(eq(inventorySessions.id, sessionId))
      .limit(1);

    if (sessionResult.length === 0) {
      return null;
    }

    const session = sessionResult[0];

    // Obtener los items del inventario con productos y unidades
    const itemsResult = await db
      .select({
        id: inventoryItems.id,
        quantity: inventoryItems.quantity,
        notes: inventoryItems.notes,
        product: {
          id: products.id,
          name: products.name,
          skuToteat: products.skuToteat,
          categoria: products.categoria,
        },
        unit: {
          id: units.id,
          name: units.name,
          abbreviation: units.abbreviation,
        },
      })
      .from(inventoryItems)
      .innerJoin(products, eq(inventoryItems.productId, products.id))
      .innerJoin(units, eq(inventoryItems.unitId, units.id))
      .where(eq(inventoryItems.sessionId, sessionId))
      .orderBy(products.name);

    return {
      ...session,
      items: itemsResult.map(item => ({
        ...item,
        quantity: Number(item.quantity)
      })),
    };
  } catch (error) {
    console.error("Error fetching inventory detail:", error);
    return null;
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDuration(startDate: Date, endDate: Date | null): string {
  if (!endDate) return "En progreso";

  const diffMs = endDate.getTime() - startDate.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 1) return "Menos de 1 minuto";
  if (diffMins < 60) return `${diffMins} minutos`;

  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;

  if (mins === 0) return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  return `${hours} ${hours === 1 ? 'hora' : 'horas'} y ${mins} minutos`;
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Cerrado
        </Badge>
      );
    case 'in_progress':
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="w-3 h-3 mr-1" />
          En Progreso
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="destructive">
          Cancelado
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HistorialDetailPage({ params }: PageProps) {
  const { id } = await params;
  const sessionId = parseInt(id);

  if (isNaN(sessionId)) {
    notFound();
  }

  const inventoryDetail = await getInventoryDetail(sessionId);

  if (!inventoryDetail) {
    notFound();
  }

  // Filtrar solo items con cantidad > 0
  const itemsWithQuantity = inventoryDetail.items.filter(item =>
    parseFloat(item.quantity.toString()) > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/historial">
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Historial
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Ir al Dashboard
              </Button>
            </Link>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {inventoryDetail.name}
                </h1>
                <p className="text-gray-600">
                  Detalle del inventario completado
                </p>
              </div>
              {getStatusBadge(inventoryDetail.status)}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Plantilla</p>
                  <p className="text-lg font-semibold text-gray-900">{inventoryDetail.template.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Fecha Inicio</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatDate(inventoryDetail.startedAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {inventoryDetail.completedAt && (
            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Fecha Fin</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(inventoryDetail.completedAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Duración</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatDuration(inventoryDetail.startedAt, inventoryDetail.completedAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Items Table */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Productos Contados ({itemsWithQuantity.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {itemsWithQuantity.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">No hay productos con cantidad registrada en este inventario.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Notas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsWithQuantity.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold text-gray-900">{item.product.name}</div>
                          {item.product.skuToteat && (
                            <div className="text-sm text-gray-600">SKU: {item.product.skuToteat}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {item.product.categoria || "Sin Categoría"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-lg">
                        {parseFloat(item.quantity.toString()).toLocaleString('es-ES', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 3,
                        })}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {item.unit.abbreviation}
                        </span>
                      </TableCell>
                      <TableCell>
                        {item.notes ? (
                          <span className="text-sm text-gray-700 italic">"{item.notes}"</span>
                        ) : (
                          <span className="text-sm text-gray-400">Sin notas</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Inventario ID: #{inventoryDetail.id} • Sistema de Inventarios Beasty Butchers</p>
        </div>
      </div>
    </div>
  );
}

