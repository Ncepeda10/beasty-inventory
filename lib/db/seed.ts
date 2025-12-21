import { db } from './index';
import { products, units, templates, templateItems } from './schema';

async function seed() {
  console.log('🌱 Starting seed...');

  // Insert units
  const insertedUnits = await db.insert(units).values([
    { name: 'Kilogramos', abbreviation: 'kg' },
    { name: 'Gramos', abbreviation: 'g' },
    { name: 'Litros', abbreviation: 'L' },
    { name: 'Mililitros', abbreviation: 'ml' },
    { name: 'Unidades', abbreviation: 'u' },
    { name: 'Cajas', abbreviation: 'caj' },
  ]).returning();

  console.log('✅ Units inserted:', insertedUnits.length);

  // Get unit IDs for reference
  const kgUnit = insertedUnits.find(u => u.abbreviation === 'kg')!;
  const gUnit = insertedUnits.find(u => u.abbreviation === 'g')!;
  const LUnit = insertedUnits.find(u => u.abbreviation === 'L')!;
  const mlUnit = insertedUnits.find(u => u.abbreviation === 'ml')!;
  const uUnit = insertedUnits.find(u => u.abbreviation === 'u')!;
  const cajUnit = insertedUnits.find(u => u.abbreviation === 'caj')!;

  // Insert products
  const insertedProducts = await db.insert(products).values([
    {
      name: 'Carne de Res (Costilla)',
      description: 'Costilla de res para cortes y guisos',
      defaultUnitId: kgUnit.id,
    },
    {
      name: 'Pollo Entero',
      description: 'Pollo entero fresco para diversos preparados',
      defaultUnitId: kgUnit.id,
    },
    {
      name: 'Pescado (Salmón)',
      description: 'Filetes de salmón fresco',
      defaultUnitId: kgUnit.id,
    },
    {
      name: 'Aceite de Oliva',
      description: 'Aceite de oliva extra virgen',
      defaultUnitId: LUnit.id,
    },
    {
      name: 'Huevos',
      description: 'Huevos frescos de granja',
      defaultUnitId: uUnit.id,
    },
  ]).returning();

  console.log('✅ Products inserted:', insertedProducts.length);

  // Insert template
  const insertedTemplates = await db.insert(templates).values([
    {
      name: 'Diario Cocina',
      description: 'Inventario diario para la cocina principal',
    },
  ]).returning();

  const diarioCocinaTemplate = insertedTemplates[0];
  console.log('✅ Template inserted:', diarioCocinaTemplate.name);

  // Insert template items (products in the template with order)
  const templateItemsData = [
    { templateId: diarioCocinaTemplate.id, productId: insertedProducts[0].id, order: 1 }, // Carne de Res
    { templateId: diarioCocinaTemplate.id, productId: insertedProducts[1].id, order: 2 }, // Pollo
    { templateId: diarioCocinaTemplate.id, productId: insertedProducts[2].id, order: 3 }, // Pescado
    { templateId: diarioCocinaTemplate.id, productId: insertedProducts[3].id, order: 4 }, // Aceite
    { templateId: diarioCocinaTemplate.id, productId: insertedProducts[4].id, order: 5 }, // Huevos
  ];

  await db.insert(templateItems).values(templateItemsData);
  console.log('✅ Template items inserted:', templateItemsData.length);

  console.log('🎉 Seed completed successfully!');
  console.log('\n📋 Summary:');
  console.log('- Units created:', insertedUnits.length);
  console.log('- Products created:', insertedProducts.length);
  console.log('- Templates created:', insertedTemplates.length);
  console.log('- Template items created:', templateItemsData.length);
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});

