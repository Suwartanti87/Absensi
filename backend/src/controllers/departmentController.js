const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /departments
const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        employees: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get departments",
      error: error.message,
    });
  }
};

// GET /departments/:id
const getDepartmentById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID",
      });
    }

    const department = await prisma.department.findUnique({
      where: { id },
      include: {
        employees: true,
      },
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get department",
      error: error.message,
    });
  }
};

// POST /departments
const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const existingDepartment = await prisma.department.findUnique({
      where: { name },
    });

    if (existingDepartment) {
      return res.status(409).json({
        success: false,
        message: "Department name already exists",
      });
    }

    const department = await prisma.department.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create department",
      error: error.message,
    });
  }
};

// PUT /departments/:id
const updateDepartment = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID",
      });
    }

    const existingDepartment = await prisma.department.findUnique({
      where: { id },
    });

    if (!existingDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    if (name && name !== existingDepartment.name) {
      const duplicateName = await prisma.department.findUnique({
        where: { name },
      });

      if (duplicateName) {
        return res.status(409).json({
          success: false,
          message: "Department name already exists",
        });
      }
    }

    const department = await prisma.department.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
      },
    });

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update department",
      error: error.message,
    });
  }
};

// DELETE /departments/:id
const deleteDepartment = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID",
      });
    }

    const existingDepartment = await prisma.department.findUnique({
      where: { id },
      include: {
        employees: true,
      },
    });

    if (!existingDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    if (existingDepartment.employees.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete department because it has employees",
      });
    }

    await prisma.department.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete department",
      error: error.message,
    });
  }
};

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
