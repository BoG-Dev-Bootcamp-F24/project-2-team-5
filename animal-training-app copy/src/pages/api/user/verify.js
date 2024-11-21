import cookie from "cookie";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Simulated login response
      const result = { id: 1, name: "John Doe" }; // Simulated user data

      if (result) {
        const token = `session-token-${result.id}`; // Simulated token (replace with real JWT or session token)

        // Set the session cookie
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only secure cookies in production
            path: "/",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // Cookie expires in 1 day
          })
        );

        return res.status(200).json(result);
      }

      return res.status(500).json({ error: "Login failed" });
    }

    if (req.method === "GET") {
      const cookies = req.headers.cookie
        ? cookie.parse(req.headers.cookie)
        : null;

      if (!cookies || !cookies.session) {
        return res.status(401).json({ error: "Unauthorized: Missing session" });
      }

      const token = cookies.session;

      // Simulated token validation (replace this logic with actual validation)
      if (token !== "session-token-1") {
        return res
          .status(401)
          .json({ error: "Unauthorized: Invalid session token" });
      }

      // Simulated user data (replace with actual database query)
      const result = {
        id: 1,
        name: "John Doe",
        animals: [], // Example empty data
        logs: [], // Example empty data
      };

      return res.status(200).json(result);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error in /api/user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
