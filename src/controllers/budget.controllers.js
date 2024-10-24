import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

const createBudget = async (req, res) => {
  try {
    const { title, quantity, price } = req.body;
    const newBudget = await client.budget.create({
      data: {
        title,
        quantity,
        price,
      },
    });
    res
      .status(201)
      .json({ message: "Budget created successfully", data: newBudget });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllBudgets = async (req, res) => {
  try {
    const allbudgets = await client.budget.findMany();
    if (allbudgets.length <= 0) {
      res.status(200).json({ message: "You don't have any budgets yet" });
    } else {
      res.status(200).json({ data: "All budgets", data: allbudgets });
    }
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getBudget = async (req, res) => {
  const title = req.params.title;
  try {
    const budget = await client.budget.findFirst({
      where: {
        title,
      },
    });
    if (!budget) {
      res.status(404).json({ message: "Budget with title ${title} not found" });
    } else {
      res.status(200).json({ data: budget });
    }
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateBudget = async (req, res) => {
  const selectedtitle = req.params.title;
  const { title, quantity, price } = req.body;
  try {
    let updatedBudget;
    if (title) {
      updatedBudget = await client.budget.update({
        where: {
          title: selectedtitle,
        },
        data: {
          title: title,
        },
      });
    }
    if (quantity) {
      updatedBudget = await client.budget.update({
        where: {
          title: selectedtitle,
        },
        data: {
          quantity: quantity,
        },
      });
    }
    if (price) {
      updatedBudget = await client.budget.update({
        where: {
          title: selectedtitle,
        },
        data: {
          price: price,
        },
      });
    }
    res
      .status(200)
      .json({ message: "Budget updated successfully", data: updatedBudget });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteBudget = async (req, res) => {
  const title = req.params.title;
  try {
    await client.budget.delete({
      where: {
        title: title,
      },
    });
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { createBudget, getAllBudgets, getBudget, updateBudget, deleteBudget };
