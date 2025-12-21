import Link from "next/link";
import { db } from "@/lib/db";
import { inventorySessions, templates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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
import { Eye, Calendar, User, CheckCircle } from "lucide-react";

interface InventorySessionWithTemplate {
  id: number;
  name: string;
  status: string;
  startedAt: Date;
  completedAt: Date | null;
  template: {
    id: number;
    name: string;
  };
}

async function getInventorySessions(): Promise<InventorySessionWithTemplate[]> {
  try {
    const result = await db
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
      .orderBy(inventorySessions.startedAt);

    return result.reverse(); // Más reciente primero
  } catch (error) {
    console.error("Error fetching inventory sessions:", error);
    return [];
  }
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return `Hoy, ${date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  } else if (diffInHours < 48) {
    return `Ayer, ${date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  } else {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
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

export default async function HistorialPage() {
  const sessions = await getInventorySessions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Historial de Inventarios
              </h1>
              <p className="text-gray-600">
                Consulta todos los inventarios realizados en el sistema
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                ← Volver al Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Inventarios</p>
                  <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completados</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sessions.filter(s => s.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Responsable</p>
                  <p className="text-lg font-bold text-gray-900">Sistema</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Lista de Inventarios</CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay inventarios registrados</h3>
                <p className="text-gray-600 mb-4">
                  Los inventarios que completes aparecerán aquí.
                </p>
                <Link href="/">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Ir al Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Plantilla</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">
                        {formatDate(session.completedAt || session.startedAt)}
                      </TableCell>
                      <TableCell>{session.template.name}</TableCell>
                      <TableCell>{getStatusBadge(session.status)}</TableCell>
                      <TableCell>
                        <Link href={`/historial/${session.id}`}>
                          <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalle
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

