import { db } from './index';
import { products, templates, templateItems } from './schema';
import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';

interface PlantillaCSV {
  'Nombre Plantilla': string;
  'Numero Plantilla': string;
}

interface ProductoCSV {
  'ID Producto': string;
  'Nombre Producto': string;
  'Medida Base': string;
  'Plantillas': string;
  'CATEGORIA': string;
  'Jerarquias de Ingredientes': string;
}

async function seedFinal() {
  console.log('🌱 Starting final seed...');

  try {
    // 1. Limpiar tablas existentes
    console.log('🧹 Cleaning existing data...');

    await db.delete(templateItems);
    console.log('✅ template_items table cleaned');

    await db.delete(products);
    console.log('✅ products table cleaned');

    await db.delete(templates);
    console.log('✅ templates table cleaned');

    // 2. Procesar archivo de plantillas
    console.log('📁 Processing maestro_plantillas.csv...');

    const plantillasPath = path.join(process.cwd(), 'data', 'maestro_plantillas.csv');
    const plantillasContent = fs.readFileSync(plantillasPath, 'utf-8');

    const plantillasData = Papa.parse<PlantillaCSV>(plantillasContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
    });

    if (plantillasData.errors.length > 0) {
      console.error('❌ Errors parsing plantillas CSV:', plantillasData.errors);
      throw new Error('Failed to parse plantillas CSV');
    }

    // Insertar plantillas
    const plantillasMap = new Map<number, number>(); // numeroPlantilla -> id
    const plantillasToInsert = plantillasData.data
      .filter(row => row['Nombre Plantilla'] && row['Numero Plantilla'])
      .map(row => ({
        numeroPlantilla: parseInt(row['Numero Plantilla']),
        name: row['Nombre Plantilla'].trim(),
        description: `Plantilla ${row['Nombre Plantilla']}`,
      }));

    const insertedPlantillas = await db.insert(templates).values(plantillasToInsert).returning();

    // Crear mapa de plantillas para referencia posterior
    insertedPlantillas.forEach(plantilla => {
      plantillasMap.set(plantilla.numeroPlantilla, plantilla.id);
    });

    console.log(`✅ Templates inserted: ${insertedPlantillas.length}`);

    // 3. Procesar archivo de productos
    console.log('📁 Processing maestro_productos.csv...');

    const productosPath = path.join(process.cwd(), 'data', 'maestro_productos.csv');
    const productosContent = fs.readFileSync(productosPath, 'utf-8');

    // Procesar el archivo con formato especial manualmente
    const lines = productosContent.trim().split('\n');
    const productosParsed: ProductoCSV[] = [];

    // Saltar header
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || !line.startsWith('"') || !line.endsWith('"')) continue;

      // Remover comillas externas
      const content = line.slice(1, -1);

      // Parsear campos manualmente
      const fields: string[] = [];
      let current = '';
      let inQuotes = false;

      for (let j = 0; j < content.length; j++) {
        const char = content[j];

        if (char === '"' && content[j + 1] === '"') {
          // Comillas escapadas
          current += '"';
          j++; // Saltar siguiente comilla
        } else if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          fields.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }

      // Agregar último campo
      if (current) {
        fields.push(current.trim());
      }

      if (fields.length >= 6) {
        productosParsed.push({
          'ID Producto': fields[0],
          'Nombre Producto': fields[1],
          'Medida Base': fields[2],
          'Plantillas': fields[3],
          'CATEGORIA': fields[4],
          'Jerarquias de Ingredientes': fields[5],
        });
      }
    }

    // Simular resultado de Papa.parse
    const productosData = {
      data: productosParsed,
      errors: [],
      meta: { delimiter: ',', linebreak: '\n' }
    };

    // Insertar productos
    const productosToInsert = productosData.data
      .filter(row => row['ID Producto'] && row['Nombre Producto'])
      .map(row => ({
        skuToteat: row['ID Producto'].replace(/"/g, '').trim(),
        name: row['Nombre Producto'].replace(/"/g, '').trim(),
        unidadBase: row['Medida Base']?.replace(/"/g, '').trim() || null,
        categoria: row['CATEGORIA']?.replace(/"/g, '').trim() || null,
        description: `Jerarquía: ${row['Jerarquias de Ingredientes']?.replace(/"/g, '').trim() || 'N/A'}`,
      }));

    const insertedProductos = await db.insert(products).values(productosToInsert).returning();
    console.log(`✅ Products inserted: ${insertedProductos.length}`);

    // Crear mapa de productos para referencia
    const productosMap = new Map<string, number>(); // skuToteat -> id
    insertedProductos.forEach(producto => {
      productosMap.set(producto.skuToteat, producto.id);
    });

    // 4. Crear relaciones template_items
    console.log('🔗 Creating template-item relationships...');

    const templateItemsToInsert: Array<{ templateId: number; productId: number; order: number }> = [];
    let orderCounter = 1;

    productosData.data
      .filter(row => row['ID Producto'] && row['Plantillas'])
      .forEach(row => {
        const skuToteat = row['ID Producto'].replace(/"/g, '').trim();
        const plantillasStr = row['Plantillas'].replace(/"/g, '').trim();

        if (!plantillasStr) return;

        const plantillaIds = plantillasStr.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

        plantillaIds.forEach(plantillaNum => {
          const templateId = plantillasMap.get(plantillaNum);
          const productId = productosMap.get(skuToteat);

          if (templateId && productId) {
            templateItemsToInsert.push({
              templateId,
              productId,
              order: orderCounter++,
            });
          } else {
            console.warn(`⚠️  Missing reference - Product SKU: ${skuToteat}, Template Num: ${plantillaNum}`);
          }
        });
      });

    if (templateItemsToInsert.length > 0) {
      await db.insert(templateItems).values(templateItemsToInsert);
      console.log(`✅ Template items inserted: ${templateItemsToInsert.length}`);
    }

    console.log('🎉 Final seed completed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Templates created:', insertedPlantillas.length);
    console.log('- Products created:', insertedProductos.length);
    console.log('- Template items created:', templateItemsToInsert.length);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

// Ejecutar el seed
seedFinal().catch((error) => {
  console.error('❌ Final seed failed:', error);
  process.exit(1);
});
