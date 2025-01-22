 console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });