import { db } from "@/lib/db";
import { units } from "@/lib/db/schema";
import { dotenv } from "dotenv";

// Cargar variables de entorno
require("dotenv").config({ path: ".env.local" });

const main = async () => {
  console.log("🌱 Seeding Units...");

  const data = [
    { name: "Unidad", abbreviation: "UN" },
    { name: "Kilogramo", abbreviation: "KG" },
    { name: "Litro", abbreviation: "LT" },
    { name: "Botella", abbreviation: "BOT" },
    { name: "Caja", abbreviation: "CJ" },
    { name: "Paquete", abbreviation: "PAQ" },
    { name: "Lata", abbreviation: "LAT" },
  ];

  await db.insert(units).values(data).onConflictDoNothing();
  
  console.log("✅ Unidades insertadas correctamente.");
  process.exit(0);
};

main().catch((err) => {
  console.error("❌ Error seeding units:", err);
  process.exit(1);
});