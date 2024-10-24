import express from "express";
import budgetRouter from "./routes/budget.routes.js";
const app = express();
app.use(express.json());

app.use("/budgets", budgetRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
