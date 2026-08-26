const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {

        // Pastikan user sudah login
        if (!req.user) {
            return res.status(401).json({
                message: "Anda belum login"
            });
        }

        // Cek role user
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Anda tidak memiliki akses"
            });
        }

        next();
    };
};

module.exports = roleMiddleware;