const API_URL = import.meta.env.VITE_API_URL;

export const api = async (endpoint, options = {}) => {
  try {
    // Check API URL
    if (!API_URL) {
      throw new Error(
        "VITE_API_URL is not configured in .env file"
      );
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
      ...options,
    });

    /*
    ========================================
    IMPORTANT:
    Pehle response ko text me read karenge.
    Direct response.json() nahi karenge.
    ========================================
    */

    const text = await response.text();

    console.log("API URL:", `${API_URL}${endpoint}`);
    console.log("STATUS:", response.status);
    console.log("RAW RESPONSE:", text);

    let data = {};

    /*
    ========================================
    Agar backend ne JSON bheja hai
    to JSON parse karo
    ========================================
    */

    if (text.trim()) {
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error(
          "JSON Parse Error:",
          jsonError
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }
    }

    /*
    ========================================
    HTTP ERROR
    ========================================
    */

    if (!response.ok) {
      throw new Error(
        data.message ||
        `Request failed with status ${response.status}`
      );
    }

    /*
    ========================================
    SUCCESS
    ========================================
    */

    return data;

  } catch (error) {

    console.error("API ERROR:", error);

    throw error;
  }
};