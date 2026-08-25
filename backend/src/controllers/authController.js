const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/utils");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({
                message: "Username dan password wajib diisi"
            });
        }

        // Cari user
        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
            include: {
                employee: true
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Username atau password salah"
            });
        }

        // Cek password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Username atau password salah"
            });
        }

        // Buat JWT
        const token = jwt.sign(
            {
                userId: user.id,
                employeeId: user.employeeId,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Login berhasil",

            token,

            user: {
                id: user.id,
                employeeId: user.employeeId,
                username: user.username,
                role: user.role,
                employee: user.employee
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });
    }
};

module.exports = {
    login
};