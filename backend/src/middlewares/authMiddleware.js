const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Ambil token dari header Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Token tidak ditemukan"
            });
        }

        // Format:
        // Authorization: Bearer TOKEN
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token tidak valid"
            });
        }

        // Verifikasi token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Simpan data JWT ke req.user
        req.user = decoded;

        // Lanjut ke controller
        next();

    } catch (error) {
        console.error(error);

        return res.status(401).json({
            message: "Token tidak valid atau sudah expired"
        });
    }
};

module.exports = authMiddleware;