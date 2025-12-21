import { db } from './index';
import { products, units, templates, templateItems } from './schema';

async function seed() {
  console.log('🌱 Starting seed with restaurant ingredients...');

  // Insert units
  const unitsData = [
    { name: 'Kilogramos', abbreviation: 'kg' },
    { name: 'Unidades', abbreviation: 'UN' },
    { name: 'Litros', abbreviation: 'L' },
    { name: 'Latas', abbreviation: 'CAN' }
  ];

  const insertedUnits = await db.insert(units).values(unitsData).returning();
  console.log('✅ Units inserted:', insertedUnits.length);

  // Create unit lookup map
  const unitMap: Record<string, any> = {};
  insertedUnits.forEach(unit => {
    unitMap[unit.abbreviation] = unit;
  });

  // Insert products
  const productsData = [
    {
      name: 'MANI JAPONES I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MOSTAZA ANTIGUA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'BROTES DECORACIÓN I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'ACEITE DE FREIR I',
      description: 'ACEITE DE FREIR I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ACEITE DE MARAVILLA I',
      description: 'ACEITE DE MARAVILLA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ACEITE DE OLIVA I',
      description: 'ACEITE DE OLIVA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'SALSA AJI AMARILLO I',
      description: 'SALSA AJI AMARILLO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ALCAPARRAS I',
      description: 'ALCAPARRAS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ARROZ G2 I',
      description: 'ARROZ G2 I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'AZUCAR BLANCA I',
      description: 'AZUCAR BLANCA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'AZUCAR RUBIA I',
      description: 'AZUCAR RUBIA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SALSA BBQ I',
      description: 'SALSA BBQ I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'BOMBILLA NEGRA PAPEL I',
      description: 'BOMBILLA NEGRA PAPEL I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CHOCLO CONGELADO I',
      description: 'CHOCLO CONGELADO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PASTA ESPIRALES I',
      description: 'PASTA ESPIRALES I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'HARINA S/POLVO I',
      description: 'HARINA S/POLVO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'HELADO VAINILLA I',
      description: 'HELADO VAINILLA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'JALAPENO I',
      description: 'JALAPENO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'HELADO DE PINA I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'KETCHUP HEINZ I',
      description: 'KETCHUP HEINZ I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'KETCHUP HELLMANS I',
      description: 'KETCHUP HELLMANS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LENTEJAS I',
      description: 'LENTEJAS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'KETCHUP HEINZ SERV I',
      description: 'KETCHUP POUCH PACK',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MANI SIN SAL I',
      description: 'MANI SIN SAL I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MASA DE TACOS SANITO 17CM I',
      description: 'MASA DE TACOS SANITO 9CM I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'MAYO HELLMANS I',
      description: 'MAYO HELLMANS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MIEL ABEJA I',
      description: 'MIEL ABEJA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MOSTAZA HEINZ I',
      description: 'MOSTAZA HEINZ I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MOSTAZA TRAVERSO I',
      description: 'MOSTAZA TRAVERSO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PANKO I',
      description: 'PANKO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PAPEL ALUMINIO ROLLO 30CM X 100M I',
      description: 'PAPEL ALUMINIO ROLLO 30CM X 100M I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PAPRIKA I',
      description: 'PAPRIKA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PEPINILLOS DILL LAMINADO I',
      description: 'PEPINILLOS DILL LAMINADO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'POROTOS I',
      description: 'POROTOS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SAL NITRO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SAL FINA I',
      description: 'SAL FINA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SALSA DE TOMATE I',
      description: 'SALSA DE TOMATE I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SALSA OSTRAS I',
      description: 'SALSA OSTRAS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'SPAGETTHI I',
      description: 'SPAGETTHI I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TABASCO SALSA I',
      description: 'TABASCO SALSA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VINAGRE BLANCO I',
      description: 'VINAGRE BLANCO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VINAGRE DE MANZANA I',
      description: 'VINAGRE DE MANZANA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'SALSA BBQ KOREANA I',
      description: 'SALSA BBQ KOREAANA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SALSA SOYA I',
      description: 'SALSA SOYA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ACEITE DE SESAMO I',
      description: 'ACEITE DE SESAMO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'MANTECA DE CERDO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MANTEQUILLA CON SAL I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CHOCOLATE CALLEBAUT 54% I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'VAINILLA I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'JUGO DE TOMATE BY MARIA I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CEBOLLA CRISPY I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'RELISH DE PEPINILLO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PAPEL DE ARROZ I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'BROCHETAS NUDO 9CM',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CAFE EN GRANO',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MISO',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PASTA DE AJI ROJO GOCHUJANG 1KG',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MANTEQUILLA SIN SAL I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CONCENTRADO DE TOMATE I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'SALSA SRIRACHA I',
      description: 'SALSA SRIRACHA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SALSA INGLESA I',
      description: 'SALSA INGLESA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ALBUMINA I',
      description: 'ALBUMINA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'WASABI I',
      description: 'WASABI I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ACETO BALSAMICO I',
      description: 'ACETO BALSAMICO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'BROWNIE FUDGE I',
      description: 'BROWNIE FUDGE I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TOCINO DEL CIELO I',
      description: 'TOCINO DEL CIELO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'AZUCAR FLOR I',
      description: 'AZUCAR FLOR I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'QUINOA I',
      description: 'QUINOA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PURE INSTANTANEO I',
      description: 'PURE INSTANTANEO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LASAGNA I',
      description: 'LASAGNA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'AJI PANCO I',
      description: 'AJI PANCO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SALSA HOISIN I',
      description: 'SALSA HOISIN I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ESENCIA VAINILLA I',
      description: 'ESENCIA VAINILLA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'AGAR AGAR I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'GOMA XANTANA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'GARBANZOS I',
      description: 'GARBANZOS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'AZUCAR GRANULADA',
      description: 'AZUCAR GRANULADA',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'TE DE MENTA I',
      description: 'TE DE MENTA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'BBQ COREANA I',
      description: 'BBQ COREANA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'AJI CREMA I',
      description: 'AJI CREMA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MAYONESA KRAFT I',
      description: 'MAYONESA KRAFT I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ZUKO SOBRE',
      description: 'ZUKO SOBRE',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SALSA HUAICAINA 400 GR I',
      description: 'SALSA HUAICAINA 400 GR I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'FRASCO FONDOS ALCACHOFA I',
      description: 'FRASCO FONDOS ALCACHOFA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'PISTACHO I',
      description: 'PISTACHO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'COBERTURA CHOCOLATE SEMIAMARGO I',
      description: 'COBERTURA CHOCOLATE SEMIAMARGO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'COMINO I',
      description: 'COMINO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MAICENA I',
      description: 'MAICENA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PIMIENTA NEGRA MOLIDA  I',
      description: 'PIMIENTA NEGRA MOLIDA  I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PIMIENTA ENTERA NEGRA I',
      description: 'PIMIENTA ENTERA NEGRA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SALSA CHILI GARLIC I',
      description: 'SALSA CHILIGARLIC I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'SEMILLA CILANTRO I',
      description: 'SEMILLA CILANTRO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SEMILLAS SESAMO BLANCO I',
      description: 'SEMILLAS SESAMO BLANCO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CRANBERRIES',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SEMILLA DE SESAMO NEGRO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CURRY I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'TE CEYLAN I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SEMOLA I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'POMODORO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'HARINA PIZZA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'HARINA FORTALEZA PLUS I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'HARINA PAN I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ACEITE DE TRUFA BLANCA I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'MERKEN I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MISO NEGRO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SAL PARRILLERA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'GELATINA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SAL MALDON I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'APEROL I',
      description: 'APEROL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ESPUMANTE VINAMAR I',
      description: 'ESPUMANTE VINAMAR I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GIN BOMBAY SAPHIRE I',
      description: 'GIN BOMBAY SAPHIRE I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GIN HENDRICKS I',
      description: 'GIN HENDRICKS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'PISCO ALTO DEL CARMEN 35 I',
      description: 'PISCO ALTO DEL CARMEN 35 I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'PISCO ALTO DEL CARMEN TRASNPARENTE 40 I',
      description: 'PISCO ALTO DEL CARMEN TRASNPARENTE 40 I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'PISCO 3R 40° I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'RAMAZZOTTI I',
      description: 'RAMAZZOTTI I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ST. GERMAIN LICOR DE SAUCO I',
      description: 'ST. GERMAIN LICOR DE SAUCO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VINO BLANCO CAJA I',
      description: 'VINO BLANCO CAJA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VINO TINTO CAJA I',
      description: 'VINO TINTO CAJA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VODKA STOLICHNAYA I',
      description: 'VODKA STOLICHNAYA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'RON MADERO I',
      description: 'RON MADERO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GIN BEEFEATER ORANGE I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GIN BEEFEATER I',
      description: 'GIN BEEFEATER I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GIN BEEFEATER PINK I',
      description: 'GIN BEEFEATER PINK I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'HAVANA ANEJO ESPECIAL I',
      description: 'HAVANA AÑEJO ESPECIAL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'HAVANA 3 ANOS I',
      description: 'HAVANA 3 ANOS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'TEQUILA OLMECA REPOSADO I',
      description: 'TEQUILA OLMECA REPOSADO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'DRAMBUIE I',
      description: 'DRAMBUIE I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'J.W RED LABEL I',
      description: 'J.W RED LABEL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'J.W BLACK LABEL I',
      description: 'J.W BLACK LABEL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'JACK DANIELS I',
      description: 'JACK DANIELS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CAMPARI I',
      description: 'CAMPARI I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'JAGGERMAISTER I',
      description: 'JAGGERMAISTER I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'MARTINI VERMOUTH BIANCO I',
      description: 'MARTINI VERMOUTH BIANCO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CACHACA I',
      description: 'CACHACA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'LICOR TRIPLE SEC I',
      description: 'LICOR TRIPLE SEC I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'LICOR CURAZAO BLUE I',
      description: 'LICOR CURAZAO BLUE I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VERMUTH ROSSO IRIS CC I',
      description: 'VERMUTH ROSSO IRIS CC I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'FERNET BRANCA I',
      description: 'FERNET BRANCA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'LICOR DE CAFE BOLS I',
      description: 'LICOR DE CAFE BOLS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'PISCO MISTRAL 35 I',
      description: 'PISCO MISTRAL 35 I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'BITTER ANGOSTURA I',
      description: 'BITTER ANGOSTURA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'MARTINI VERMOUTH ROSSO I',
      description: 'MARTINI VERMOUTH ROSSO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'TEQUILA OLMECA BLANCO I',
      description: 'TEQUILA OLMECA BLANCO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CHIVAS REGAL 18 I',
      description: 'CHIVAS REGAL 18 I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA TAMANGO HUMBOLDT BARRIL I',
      description: 'CERVEZA TAMANGO HUMBOLDT BARRIL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA TAMANGO SUNSET SCHOP I',
      description: 'CERVEZA TAMANGO SUNSET SCHOP I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA TAMANGO HOVER BEER BARRIL I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA TAMANGO CORTACORRIENTE BARRIL I',
      description: 'CERVEZA TAMANGO CORTACORRIENTE BARRIL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA TAMANGO TURBULENCE SCHOP I',
      description: 'CERVEZA TAMANGO TURBULENCE SCHOP I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'RON BACARDI BLANCO',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CERVEZA TAMANGO EASY TIGER BARRIL I',
      description: 'CERVEZA TAMANGO EASY TIGER BARRIL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA TAMANGO CLOUD JUICE BARRIL I',
      description: 'CERVEZA TAMANGO CLOUD JUICE BARRIL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'PISCO 3R 35° I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA VPL BOTELLA  330 cc',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'VODKA GABRI I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA VPL BARRIL I',
      description: 'CERVEZA VPL BARRIL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA ROYAL GUARD BARRIL I',
      description: 'CERVEZA ROYAL GUARD BARRIL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA KUNSTMANN TOROBAYO BARRIL I',
      description: 'CERVEZA KUNSTMANN TOROBAYO BARRIL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA LOA MINGA LOCA I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA BLUEMOON 355CC I',
      description: 'CERVEZA BLUEMOON 355CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CERVEZA CUSQUENA LATA 473CC I',
      description: 'CERVEZA CUSQUENA LATA 473CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CERVEZA DOLBEK MAKI BARRIL I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA HEINEKEIN 0 BOT 330CC I',
      description: 'CERVEZA HEINEKEIN 0 BOT 330CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'RON HAVANA ESPECIAL I',
      description: 'RON HAVANA ESPECIAL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'TEQUILA JIMADOR I',
      description: 'TEQUILA JIMADOR 750CC',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'PISCO ALTO DEL CARMEN REPOSADO I',
      description: 'PISCO ALTO DEL CARMEN REPOSADO',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'LICOR CHERRY I',
      description: 'LICOR CHERRY I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'LICOR AMARETTO MITJANS I',
      description: 'LICOR AMARETTO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'AMARGO DE ANGOSTURA I',
      description: 'AMARGO DE ANGOSTURA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GIN KANTAL I',
      description: 'GIN KANTAL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'JACK DANIELS FIRE I',
      description: 'JACK DANIELS FIRE I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'JACK DANIELS MIEL I',
      description: 'JACK DANIELS MIEL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GIN CARPINTERO NEGRO I',
      description: 'GIN CARPINTERO NEGRO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'LICOR FRANGELICO I',
      description: 'LICOR FRANGELICO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VINO CASTAMORA I',
      description: 'VINO CASTAMORRA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VERMOUTH ROSSO LUTHER I',
      description: 'VERMOUTH ROSSO LUTHER I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VERMOUTH BLANCO LUTHER I',
      description: 'VERMOUTH BLANCO LUTHER I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA ROYAL 0 BOT 350CC I',
      description: 'CERVEZA ROYAL 0 I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PIPENO',
      description: 'PIPENO',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GRANADINA I',
      description: 'GRANADINA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VINO LEYDA CARMENERE I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'VINO LEYDA PINOT NOIR I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'RAMAZZOTTI VIOLETTO I',
      description: 'RAMAZZOTTI VIOLETTO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'FERNET NERO 53 I',
      description: 'FERNET NERO 53 I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'MARTINI FIERO I',
      description: 'MARTINI FIERO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'MARTINI EXTRA DRY I',
      description: 'MARTINI EXTRA DRY I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CERVEZA SIN ALCOHOL KUNSTMANN 330CC',
      description: 'CERVEZA SIN ALCOHOL KUNSTMANN 330CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CERVEZA SIN GLUTEN STELLA 330 CC',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GIN PROA I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GIN ERVA I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'Sau. Blanc. Floresta bot750cc',
      description: 'Viña santa rita sauvignon blanca',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CHAR Garces Silva BOYA bot750cc',
      description: 'Viña garces silva Chardonnay',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SEMILLON Maturana',
      description: 'Maturana perellon cepa semillon',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'Cab Sau Maipo TH bot750cc',
      description: 'viña undurraga',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GAR Mauleon bot750cc',
      description: 'Viña castamora',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'ENSAM Mauleon bot750cc',
      description: 'Viña castamora ensamblaje',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CAR Mauleon bot750cc',
      description: 'Viña castamora carmenere',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'COCA COLA NORMAL LATA 350CC I',
      description: 'COCA COLA NORMAL LATA 350CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'COCA COLA LIGHT LATA 350CC I',
      description: 'COCA COLA LIGHT LATA 350CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'COCA COLA ZERO LATA 350CC I',
      description: 'COCA COLA ZERO LATA 350CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'FANTA ZERO LATA 350CC I',
      description: 'FANTA ZERO LATA 350CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GINGER ALE ZERO CANADA DRY LATA 350CC I',
      description: 'GINGER ALE ZERO CANADA DRY LATA 350CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GINGER ALE CANADA DRY LATA 350 CC I',
      description: 'GINGER ALE CANADA DRY LATA 350 CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LIMONADA CONGELADA I',
      description: 'LIMONADA CONGELADA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PULPA JUGO DE MANGO I',
      description: 'PULPA JUGO DE MANGO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SPRITE NORMAL MIDCAL LATA 350CC I',
      description: 'SPRITE NORMAL MIDCAL LATA 350CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GINGER BEER BOTAVIAN 200CC I',
      description: 'GINGER BEER BOTAVIAN 200CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TONICA LIGHT BOTAVIAN 200CC I',
      description: 'TONICA LIGHT BOTAVIAN 200CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TONICA INDIAN BOTAVIAN 200CC I',
      description: 'TONICA INDIAN BOTAVIAN 200CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TONICA NORDIC LATA 350CC I',
      description: 'TONICA NORDIC LATA 350CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'HIELO FRAPPE I',
      description: 'HIELO FRAPPE I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'HIELO CUBO I',
      description: 'HIELO CUBO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PULPA PINA I',
      description: 'PULPA PINA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'JUGO DE POMELO I',
      description: 'JUGO DE POMELO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'TONICA SCHWEPPES 350 CC I',
      description: 'TONICA SCHWEPPES 350 CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GINGER BEER CORTEZA JESUITA 200CC I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GINGER ALE LIGHT CANADA DRY LATA 350CC I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SODA MANDARINA GRANADA CORTEZA JESUITA 200CC',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SODA POMELO ROSADO CORTEZA JESUITA 200CC',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TONICA CORTEZA JESUITA 200C',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TONICA CUCUMBER CORTEZA JESUITA 200C',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'COCA COLA ZERO LATA 220CC I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'COCA COLA NORMAL LATA 220CC I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SPRITE LATA 220CC I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'COCA COLA LIGHT LATA 220CC I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SPRITE ZERO 220CC I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PULPA MARACUYA I',
      description: 'PULPA MARACUYA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'REDBULL NORMAL 250CC I',
      description: 'REDBULL NORMAL 250CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'REDBULL SANDIA 250CC I',
      description: 'REDBULL SANDIA 250CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'REDBULL YELLOW 250CC I',
      description: 'REDBULL YELLOW 250CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PEPSI ZERO LATA 350CC I',
      description: 'PEPSI ZERO LATA 350CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TONICA CANADA DRY LATA 350 CC I',
      description: 'TONICA CANADA DRY LATA 350 CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TONICA CANADA DRY ZERO LATA 310 CC I',
      description: 'TONICA CANADA DRY ZERO LATA 310 CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'FENTIMANS TONIC I',
      description: 'FENTIMANS TONIC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'FENTIMANS TONIC NARANJ VALENCIANA I',
      description: 'FENTIMANS TONIC NARANJ VALENCIANA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'FENTIMANS TONIC LIMONADA ROSE I',
      description: 'FENTIMANS TONIC LIMONADA ROSE I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SPRITE ZERO LATA 350 I',
      description: 'SPRITE ZERO LATA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GINGER BEER BOTAVIAN I',
      description: 'GINGER BEER BOTAVIAN I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'COCO LOPEZ I',
      description: 'COCO LOPEZ  I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'REDBULL SUGAR FREE 250CC I',
      description: 'REDBULL SUGAR FREE 250CC I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GINGER ALE SCHWEPPES 350 CC LATA I',
      description: 'GINGER ALE SCHWEPPES 350 CC LATA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GINGER ALE  ZERO SCHWEPPES 350 CC LATA I',
      description: 'GINGER ALE  ZERO SCHWEPPES 350 CC LATA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'FENTIMANS GINGER BEER',
      description: 'FENTIMANS GINGER BEER',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'FANTA NORMAL LATA 350 I',
      description: 'FANTA NORMAL LATA 350 I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CAPSULA CAFE EXPRESSO BRITT I',
      description: 'CAPSULA CAFE EXPRESSO BRITT I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TAPABARRIGA I',
      description: 'TAPABARRIGA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARNE LECHON I',
      description: 'CARNE LECHON I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARNE LOMO VETADO DE CERDO I',
      description: 'CARNE LOMO VETADO DE CERDO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARNE COGOTE I',
      description: 'MOLIDA Y ENTERA',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARNE POSTA NEGRA ENTERA I',
      description: 'CARNE POSTA NEGRA ENTERA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARNE POSTA NEGRA MOLIDA I',
      description: 'CARNE POSTA NEGRA MOLIDA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'HAMBURGUESA HONGOS FUNGER I',
      description: 'HAMBURGUESA HONGOS FUNGER I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LENGUA VACUNO I',
      description: 'LENGUA VACUNO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'MALAYA I',
      description: 'MALAYA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MEDULA I',
      description: 'MEDULA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PATO CONFIT I',
      description: 'PATO CONFIT I',
      defaultUnitId: unitMap['CAN'].id,
      isActive: true
    },
    {
      name: 'POLLO TRUTRO ENTERO I',
      description: 'POLLO TRUTRO ENTERO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PORK BELLY I',
      description: 'PORK BELLY I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PRIETA I',
      description: 'PRIETA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'TOCINO PANCETA ARTESANAL I',
      description: 'TOCINO PANCETA ARTESANAL I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'TOCINO LAMINADO I',
      description: 'TOCINO LAMINADO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARNE ASIENTO I',
      description: 'CARNE ASIENTO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARNE CHULETA DE CERDO I',
      description: 'CARNE CHULETA DE CERDO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'POLLO FILETE I',
      description: 'POLLO FILETE I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARRILLERAS I',
      description: 'CARRILLERAS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'POLLO TRUTRO  DESHUESADO I',
      description: 'POLLO TRUTRO  DESHUESADO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'BABY BACK RIBS I',
      description: 'BABY BACK RIBS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MANTECA I',
      description: 'MANTECA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MOLLEJAS I',
      description: 'MOLLEJAS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARNE CORDERO I',
      description: 'CARNE CORDERO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'GRASA HAMBURGUESA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'POLLO PECHUGA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'HUACHALOMO I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'OSSOBUCO I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TAPAPECHO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PALETA DE CERDO DESHUESADA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MOLLEJAS EN POTE',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PORK BELLY SIN CUERO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PEPPERONNI I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARNE DE JAIBA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ALITA MEDIA POLLO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'GUANCIALE I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARNE PARRILLA BRAVA I',
      description: 'CARNE PARA PARRILLA LOCAL ESQUINA BRAVA',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LOA PALE LAGER ATRAPANUBES LATA 470CC I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LOA MINGA LATA 470CC I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LOA OTRA RONDA LATA 470CC',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CILINDRO CO2 KUNSTMANN',
      description: 'CILINDRO CO2 KUNSTMANN',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PAPAS FRITAS I',
      description: 'PAPAS FRITAS  I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PAPAS FRITAS CAMOTE I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'AROS DE CEBOLLA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PULPA BERRIES I',
      description: 'PULPA BERRIES I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PULPA FRUTILLA I',
      description: 'SE USA COD CON10004',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ARANDANOS I',
      description: 'ARANDANOS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'FRUTILLA CONGELADA I',
      description: 'FRUTILLA CONGELADA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MIX BERRIES I',
      description: 'MIX BERRIES I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SOPLETE GAS I',
      description: 'SOPLETE GAS I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'Botella prisma sin gas I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'BOTELLA PRISMA CON GAS I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TAPA BOTELLA PRISMA I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'BURRATA I',
      description: 'BURRATA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CREMA DE LECHE I',
      description: 'CREMA DE LECHE I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'LECHE ENTERA I',
      description: 'LECHE ENTERA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'QUESO AZUL I',
      description: 'QUESO AZUL I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'STRACCIATELLA I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'QUESO CHEDDAR LAMINADO I',
      description: 'QUESO CHEDDAR LAMINADO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'QUESO CREMA I',
      description: 'QUESO CREMA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'QUESO PARMESANO GRANAPADANO I',
      description: 'QUESO GRANAPADANO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'QUESO RALLADO SEMIFINO I',
      description: 'QUESO RALLADO SEMIFINO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'YOGHURT NATURAL I',
      description: 'YOGHURT NATURAL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'CREMA VEGETAL I',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'QUESO MANTECOSO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LECHE EVAPORADA FRASCO DE 395 GRS I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LECHE CONDENSADA FRASCO DE 397 GRS I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'DULCE DE LECHE I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'QUESO GAUDA GRANULADO I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'QUESO FIOR DI LATE I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CONVOCLEAN FORTE I',
      description: 'LAVALOZAS LAVAVAJILLAS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ASEPCOL I',
      description: 'ASEPCOL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ALUSA PLAST 30X1400 I',
      description: 'ALUSA PLAST 30X1400 I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'BOLSA BASURA NEGRA 110X130 I',
      description: 'BOLSA BASURA NEGRA 110X130 I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'BOLSA BASURA NEGRA 70X90 I',
      description: 'BOLSA BASURA NEGRA 70X90 I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'BOLSA PREPICADA ROLLO 20X30 I',
      description: 'BOLSA PREPICADA ROLLO 20X30 I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'COFIAS NEGRAS UN I',
      description: 'COFIAS NEGRAS UN I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'DESENGRASANTE DISTAR F I',
      description: 'DESENGRASANTE DISTAR F I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ESCOBILLON I',
      description: 'ESCOBILLON I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'ESPONJAS I',
      description: 'ESPONJAS I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GUANTES LATEX AMARILLO M I',
      description: 'GUANTES LATEX AMARILLO M I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GUANTES QUIRURGICOS VINILO TALLA I',
      description: 'GUANTES QUIRURGICOS VINILO TALLA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LAVALOZA I',
      description: 'LAVALOZA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'LIMPIA PISO I',
      description: 'LIMPIA PISO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'MASCARILLAS NEGRA UN I',
      description: 'MASCARILLAS NEGRA UN I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PALA ASEO I',
      description: 'PALA ASEO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PANO ULTRAWIPE REPASO ROLLO 88 TOALLAS I',
      description: 'PANO ULTRAWIPE REPASO ROLLO 88 TOALLAS I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PECHERA BLANCA PVC COPERO I',
      description: 'PECHERA BLANCA PVC COPERO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SPONTEX I',
      description: 'SPONTEX I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TOALLA NOVA 250M I',
      description: 'TOALLA NOVA 250M I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TRAPERO CON OJAL I',
      description: 'TRAPERO CON OJAL I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'VIRUTILLA METALICA I',
      description: 'VIRUTILLA METALICA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'VIXCLOR BIDON 22 KILOS',
      description: 'VIXCLOR BIDON 22 KILOS',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'LENGUA BARREDORA PLASTICA I',
      description: 'LENGUA BARREDORA PLASTICA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'NYLON COBERTURA PLASTICA I',
      description: 'NYLON COBERTURA PLASTICA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GUANTE NYLON I',
      description: 'GUANTE NYLON I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'GUANTE NITRILO 9" PROF13',
      description: 'GUANTE NITRILO 9" PROF13',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PLUMERO I',
      description: 'PLUMERO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LIMPIA VIDRIOS I',
      description: 'LIMPIA VIDRIOS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ABRILLANTADOR PISO FLOTANTE I',
      description: 'ABRILLANTADOR PISO FLOTANTE I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ALCOHOL GEL I',
      description: 'ALCOHOL GEL I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'JABON NEUTRO I',
      description: 'JABON NEUTRO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'AGUA DESMINERALIZADA I',
      description: 'AGUA DESMINERALIZADA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GUANTES NITRILO NEGROS L',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'DESODORANTE AMBIENTAL SPRAY I',
      description: 'DESODORANTE AMBIENTAL SPRAY I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'NOTOX 600 DESINFECTANTE VERDURAS I',
      description: 'NOTOX 600 DESINFECTANTE VERDURAS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'PAPEL HIGIENICO 250mt / 6 rollos I',
      description: 'PAPEL HIGIENICO 250mt / 6 rollos I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'HIGIEN QUAT I',
      description: 'HIGIEN QUAT I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'TRAPERO GRANDE I',
      description: 'TRAPERO GRANDE I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SAL LAVAVAJILLAS SACO I',
      description: 'SAL LAVAVAJILLAS SACO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LAVALOZAS DILUIDO I',
      description: 'LAVALOZAS DILUIDO I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'BOLSA BASURA 80X110 I',
      description: 'BOLSA BASURA 80X100 I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CIF CREMA I',
      description: 'CIF CREMA I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GUANTE NITRILO M I',
      description: 'GUANTE NITRILO M I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'B-QUAT I',
      description: 'B-QUAT 5lts',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'DESINFECTANTE ALCAMAX I',
      description: 'DESINFECTANTE ALCAMAX I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'BCN 100 I',
      description: 'BCN 100 I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'PANOS AMARILLOS I',
      description: 'PANOS AMARILLOS I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'ALCA CLOR REINIGER 5 LTS I',
      description: 'ALCA CLOR REINIGER 5 LTS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ALCOHOL DESMINERALIZADO 5 LTS I',
      description: 'ALCOHOL DESNATURALIZADO 5 LTS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'ANOLYTE / DESINFECTANTE 5 L',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'DETERGENTE F2 X 10L',
      description: null,
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'GUANTES AMARILLOS   S',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'DESODORANTE ambiental',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'BICARBONATO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CAMARON NYLON I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'TRUCHA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ATUN I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARBON I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CARGA SIFON I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CORCHETE ESTANDAR 5000 UN I',
      description: 'CORCHETE ESTANDAR 5000 UN I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LAPIZ PASTA AZUL I',
      description: 'LAPIZ PASTA AZUL I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'MASKINTAPE GRANDE 24MM I',
      description: 'MASKINTAPE GRANDE 24MM I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'MASKINTAPE MEDIANO 18MM I',
      description: 'MASKINTAPE MEDIANO 18MM I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PLUMON NEGRO PERMANENTE PUNTA REDONDO I',
      description: 'PLUMÓN NEGRO PERMANENTE PUNTA REDONDO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'HOJAS BLANCAS CARTA RESMA I',
      description: 'HOJAS BLANCAS CARTA RESMA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'HOJAS BLANCAS OFICIO RESMA I',
      description: 'HOJAS BLANCAS OFICIO RESMA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SCOTCH 18MM*30MTS 3M',
      description: 'SCOTCH 18MM*30MTS 3M',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'COMANDERA I',
      description: 'COMANDERA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CUCHILLO CARTONERO I',
      description: 'CUCHILLO CARTONERO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SEPARADORES 6 UNI I',
      description: 'SEPARADORES 6 UNI I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'VELAS I',
      description: 'VELAS I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'ACEITE VELAS I',
      description: 'ACEITE VELAS I',
      defaultUnitId: unitMap['L'].id,
      isActive: true
    },
    {
      name: 'LAPICES COLORES X12 I',
      description: 'LAPICES COLORES X12 I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PILAS I',
      description: 'PILAS I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CORCHETERA INDUSTRIAL I',
      description: 'CORCHETERA INDUSTRIAL I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TINTA NEGRA I',
      description: 'TINTA NEGRA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TINTA AMARILLA I',
      description: 'TINTA AMARILLA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TINTA AZUL I',
      description: 'TINTA AZUL I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'TINTA ROJA I',
      description: 'TINTA ROJA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'ROLLOS COMANDERAS I',
      description: 'ROLLOS COMANDERAS I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'OTRO I',
      description: 'OTRO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'OTRO II',
      description: 'OTRO II',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'VASO PLASTICO 330CC I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PACKAGING BOLSA C/DISENO',
      description: 'PACKAGING BOLSA C/DISENO',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PACKAGING CAJA HAMBURGUESA',
      description: 'PACKAGING CAJA HAMBURGUESA',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PACKAGING CAJA PAPAS FRITAS',
      description: 'PACKAGING CAJA PAPAS FRITAS',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PACKAGING CAJA UNITARIA ALMEJA',
      description: 'PACKAGING CAJA UNITARIA ALMEJA',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PACKAGING PAPEL ANTIGRASA 33X35',
      description: 'PACKAGING PAPEL ANTIGRASA 33X35',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'INDIVIDUALES BLANCO NEGRO I',
      description: 'INDIVIDUALES BLANCO NEGRO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SERVILLETA BLANCA 24x24 COCTAIL I',
      description: 'SERVILLETA BLANCA 24x24 COCTAIL I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'SERVILLETA BLANCA 30X30 I',
      description: 'SERVILLETA BLANCA 30X30 I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PACKAGING BOLSA KRAFT I',
      description: 'PACKAGING BOLSA KRAFT I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CAJA KRAFT CON VENTANA 700CC',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'BOLSAS DE VACIO PARA ALIMENTOS 20X30X60',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'BOLSAS DE VACIO PARA ALIMENTOS 30X40X80',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LEVADURA FRESCA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PAN DE HOGAZA BLANCO MASA MADRE I',
      description: 'PAN DE HOGAZA BLANCO MASA MADRE I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PAN HAMBURGUESA BRIOCHE SIN SESAMO 100 GRS I',
      description: 'PAN HAMBURGUESA BRIOCHE SIN SESAMO 100 GRS I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PAN KING HAWAIAN i',
      description: 'PAN KING HAWAIAN I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PAN MOLDE ARTESANAL PAPA I',
      description: 'PAN MOLDE ARTESANAL I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LEVADURA 250 GR',
      description: 'LEVADURA 250 GR',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'BERLINA I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PAN MINI BURGER 7CM BRIOCHE SIN SESAMO 50 GRS I',
      description: 'PAN HAMBURGUESA BRIOCHE SIN SESAMO 50 GRS I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PAN COMPLETO PAPA 40 GRS',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CROISSANT I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PAN CIABATTA 17CM I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LACTO WASABI ALBAHACA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'HINOJO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'BERENJENA I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'AJI AMARILLO I',
      description: 'AJI AMARILLO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'AJI VERDE I',
      description: 'AJI VERDE I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'AJO I',
      description: 'AJO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ALBAHACA I',
      description: 'ALBAHACA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CANELA EN POLVO I',
      description: 'CANELA ENTERA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CEBOLLA BLANCA I',
      description: 'CEBOLLA BLANCA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CEBOLLA MORADA I',
      description: 'CEBOLLA MORADA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CEBOLLIN ATADO I',
      description: 'CEBOLLIN ATADO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CILANTRO I',
      description: 'CILANTRO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CLAVO DE OLOR I',
      description: 'CLAVO DE OLOR I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ESPINACA I',
      description: 'ESPINACA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'JENGIBRE I',
      description: 'JENGIBRE I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'HUEVOS I',
      description: 'HUEVOS I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LECHUGA ESCAROLA I',
      description: 'LECHUGA ESCAROLA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LECHUGA HIDROPONICA I',
      description: 'LECHUGA HIDROPÓNICA I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'LIMON AMARILLO I',
      description: 'LIMON AMARILLO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LIMON DE PICA I',
      description: 'LIMON DE PICA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MENTA I',
      description: 'MENTA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MERQUEN I',
      description: 'MERQUEN I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'NARANJA I',
      description: 'NARANJA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PAPA I',
      description: 'PAPA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PEPINO I',
      description: 'PEPINO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PIMENTON ROJO I',
      description: 'PIMENTON ROJO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PIMENTON VERDE I',
      description: 'PIMENTON VERDE I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PITILLA ALGODON 1 ROLLITO I',
      description: 'PITILLA ALGODÓN 1 ROLLITO',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PUERRO I',
      description: 'PUERRO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'RABANITO I',
      description: 'RABANITO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'REPOLLO MORADO I',
      description: 'REPOLLO MORADO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'REPOLLO VERDE I',
      description: 'REPOLLO VERDE I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'ROMERO I',
      description: 'ROMERO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'RUCULA I',
      description: 'RUCULA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'TOMATE LARGA VIDA I',
      description: 'TOMATE LARGA VIDA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'TOMATE PERA I',
      description: 'TOMATE PERA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ZANAHORIA I',
      description: 'ZANAHORIA  I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LIMON SUTIL I',
      description: 'LIMON SUTIL I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PAPA CAMOTE I',
      description: 'PAPA CAMOTE I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MANZANA VERDE I',
      description: 'MANZANA VERDEV I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'POMELOS I',
      description: 'POMELOS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'TOMATE CHERRY I',
      description: 'TOMATE CHERRY I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PINA I',
      description: 'PINA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'COLIFLOR I',
      description: 'COLIFLOR I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'DURAZNO I',
      description: 'DURAZNO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MIX HOJAS VERDES I',
      description: 'MIX ASIATICO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ACEITUNAS NEGRAS I',
      description: 'ACEITUNAS NEGRAS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'BETARRAGA I',
      description: 'BETARRAGA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CHAMPINON PARIS I',
      description: 'CHAMPINON PARIS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MANZANA ROJA I',
      description: 'MANZANA ROJA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'AJO PELADO I',
      description: 'AJO PELADO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'BROCOLI I',
      description: 'BROCOLI I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'ZAPALLO ITALIANO I',
      description: 'ZAPALLO ITALIANO I',
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'ALMENDRAS I',
      description: 'ALMENDRAS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CALLAMPA DESHIDRATADO I',
      description: 'CALLAMPA DESHIDRATADO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SEMILLAS DE ZAPALLO I',
      description: 'SEMILLAS DE ZAPALLO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'AJO EN POLVO I',
      description: 'AJO EN POLVO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'OREGANO I',
      description: 'OREGANO I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'NUEZ I',
      description: 'NUEZ I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PIMIENTA BLANCA MOLIDA I',
      description: 'PIMIENTA BLANCA MOLIDA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'SEMILLAS MOSTAZA I',
      description: 'SEMILLAS MOSTAZA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LAUREL I',
      description: 'LAUREL I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'AVELLANAS I',
      description: 'AVELLANAS I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CEBOLLA PLUMA I',
      description: 'CEBOLLA PLUMA I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'FLORES COMESTIBLES I',
      description: 'FLORES COMESTIBLES I',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PEREJIL I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'MIX LECHUGA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LECHUGA COSTINA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'TOMILLO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'BERENJENA I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'PERA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'APIO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ACEITUNA AZAPA NEGRA',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ANIS ESTRELLADO',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CANELA ENTERA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'LECHUGA EN HOJA I',
      description: 'LECHUGA SANITIZADA',
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'PALTA I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CHAMPINON OSTRA I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CHAMPINON PORTOBELO I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'CHAMPINON SHITAKE I',
      description: null,
      defaultUnitId: unitMap['UN'].id,
      isActive: true
    },
    {
      name: 'HUACATAY I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'BRUSELAS I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'NABOS I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CIBOULETTE I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'ZAPALLO BUTTERNUT I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'CEBOLLA PERLA I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    },
    {
      name: 'AJI ORO I',
      description: null,
      defaultUnitId: unitMap['kg'].id,
      isActive: true
    }
  ];

  const insertedProducts = await db.insert(products).values(productsData).returning();
  console.log('✅ Products inserted:', insertedProducts.length);

  // Insert template "Inventario Completo"
  const insertedTemplates = await db.insert(templates).values([{
    name: 'Inventario Completo',
    description: 'Inventario completo del restaurante con todos los ingredientes',
  }]).returning();

  const inventarioCompletoTemplate = insertedTemplates[0];
  console.log('✅ Template inserted:', inventarioCompletoTemplate.name);

  // Insert template items (products in the template with order)
  const templateItemsData = insertedProducts.map((product, index) => ({
    templateId: inventarioCompletoTemplate.id,
    productId: product.id,
    order: index + 1
  }));

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
