const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {

    console.log("Mulai seeding...");

    // ========================================
    // WORK SCHEDULE (TUGAS KHAMILA)
    // ========================================
    // Menggunakan upsert agar data tidak duplikat jika seed dijalankan ulang
    const morningShift = await prisma.workSchedule.upsert({
        where: { id: 1 }, // ID manual untuk acuan seeding awal
        update: {},
        create: {
            id: 1,
            name: "Shift Pagi Regular",
            startTime: "08:00",
            endTime: "17:00",
            lateTolerance: 15
        }
    });

    // DEPARTMENT

    const itDepartment = await prisma.department.upsert({
        where: {
            name: "IT"
        },
        update: {},
        create: {
            name: "IT",
            description: "Information Technology"
        }
    });

    const hrDepartment = await prisma.department.upsert({
        where: {
            name: "HR"
        },
        update: {},
        create: {
            name: "HR",
            description: "Human Resources"
        }
    });

    // EMPLOYEE tanti (Sudah dihubungkan ke Work Schedule)
   
    const tanti = await prisma.employee.upsert({
        where: {
            employeeCode: "WD20260001"
        },

        update: {
            workScheduleId: morningShift.id // Pastikan ter-update jika dijalankan ulang
        },

        create: {
            employeeCode: "WD20260001",
            name: "tanti",
            email: "tanti@gmail.com",
            phone: "08123456789",
            address: "Jakarta",
            position: "Staff IT",
            departmentId: itDepartment.id,
            workScheduleId: morningShift.id, // Menghubungkan ke jadwal shift pagi
            status: "ACTIVE"
        }
    });

    // EMPLOYEE suwar (Sudah dihubungkan ke Work Schedule)
  
    const suwar = await prisma.employee.upsert({
        where: {
            employeeCode: "WD20260002"
        },

        update: {
            workScheduleId: morningShift.id
        },

        create: {
            employeeCode: "WD20260002",
            name: "suwar",
            email: "suwar@gmail.com",
            phone: "08123456788",
            address: "Jakarta",
            position: "HR",
            departmentId: hrDepartment.id,
            workScheduleId: morningShift.id, // Menghubungkan ke jadwal shift pagi
            status: "ACTIVE"
        }
    });


    // PASSWORD

    const hashedPassword = await bcrypt.hash("123456", 10);


    // USER tanti
   

    await prisma.user.upsert({
        where: {
            username: "tanti"
        },

        update: {
            password: hashedPassword,
            role: "EMPLOYEE",
            employeeId: tanti.id
        },

        create: {
            username: "tanti",
            password: hashedPassword,
            role: "EMPLOYEE",
            employeeId: tanti.id
        }
    });


    // ========================================
    // USER S
    // HR ADMIN
    // ========================================

    await prisma.user.upsert({
        where: {
            username: "suwar"
        },

        update: {
            password: hashedPassword,
            role: "HR_ADMIN",
            employeeId: suwar.id
        },

        create: {
            username: "suwar",
            password: hashedPassword,
            role: "HR_ADMIN",
            employeeId: suwar.id
        }
    });


    console.log("=================================");
    console.log("SEED BERHASIL!");
    console.log("=================================");
    console.log("Work Schedule:");
    console.log("ID 1 → Shift Pagi Regular (08:00 - 17:00)");
    console.log("---------------------------------");
    console.log("Employee:");
    console.log("tanti  → WD20260001 → EMPLOYEE (Shift Pagi)");
    console.log("Suwar→ WD20260002 → HR_ADMIN (Shift Pagi)");
    console.log("---------------------------------");
    console.log("Username tanti  : tanti");
    console.log("Username suwar : suwar");
    console.log("Password       : 123456");
    console.log("=================================");
}


main()
    .catch((error) => {
        console.error("SEED GAGAL:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
