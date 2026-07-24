import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required to export subscribers.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
});

function csvCell(value) {
  if (value === null || value === undefined) return "";
  return `"${String(value).replaceAll('"', '""')}"`;
}

try {
  const result = await pool.query(`
    select
      email,
      status,
      consent_version,
      signup_page,
      created_at,
      confirmed_at,
      updated_at,
      unsubscribed_at
    from subscribers
    order by created_at desc
  `);

  const headers = [
    "email",
    "status",
    "consent_version",
    "signup_page",
    "created_at",
    "confirmed_at",
    "updated_at",
    "unsubscribed_at",
  ];

  console.log(headers.map(csvCell).join(","));
  for (const row of result.rows) {
    console.log(headers.map((header) => csvCell(row[header])).join(","));
  }
} finally {
  await pool.end();
}
