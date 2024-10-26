import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(4006, () => {
  console.log("[SERVER]: Running at port 4006");
});
