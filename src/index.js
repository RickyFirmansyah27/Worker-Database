// src/templates/basic/index.js
import { Client } from "@neondatabase/serverless";

// Simpan waktu awal worker pertama kali dijalankan
const startTime = Date.now();

const basic_default = {
  async fetch(request, env, ctx) {
    const client = new Client(env.DATABASE_URL);

    // Hitung waktu hidup aplikasi dalam detik (mengonversi ms ke detik)
    const uptimeInSeconds = Math.floor((Date.now() - startTime) / 1000);

    // Konversi detik menjadi hari, jam, menit, dan detik
    const days = Math.floor(uptimeInSeconds / 3600 *( 24));
    const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;

    // Format waktu sebagai dd:hh:mm:ss
    const uptimeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    try {
      await client.connect();

      // Return success response dengan formatted uptime
      return new Response(
        JSON.stringify({
          status: "success",
          statusCode: 200,
          message: "database connection ok",
          uptime: uptimeFormatted,  // Tambahkan uptime dalam format dd:hh:mm:ss
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Database connection error:", error);

      // Return failure response dengan formatted uptime
      return new Response(
        JSON.stringify({
          status: "error",
          statusCode: 500,
          message: "database connection fail",
          uptime: uptimeFormatted,  // Tambahkan uptime dalam format dd:hh:mm:ss
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } finally {
      ctx.waitUntil(client.end());
    }
  },
};

export { basic_default as default };
