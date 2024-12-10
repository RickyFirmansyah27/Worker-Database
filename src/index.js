import { Client } from "./@neondatabase/serverless";

const startTime = Date.now();

const basic_default = {
  async fetch(request, env, ctx) {
    const client = new Client(env.DATABASE_URL);

    const uptimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
    const days = Math.floor(uptimeInSeconds / 3600 *( 24));
    const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;

    // Format waktu sebagai dd:hh:mm:ss
    const uptimeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    try {
      await client.connect();

      return new Response(
        JSON.stringify({
          status: "success",
          statusCode: 200,
          message: "[Neon DB] | Database connection established",
          uptime: uptimeFormatted,
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
      return new Response(
        JSON.stringify({
          status: "error",
          statusCode: 500,
          message: "[Neon DB] | Database connection failed",
          uptime: uptimeFormatted,
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
