import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes";
import productsRoutes from "./routes/productsRoutes";
import ordersRoutes from "./routes/ordersRoutes";
import paymentsRoutes from "./routes/paymentsRoutes";
import meRoutes from "./routes/meRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import discountRoutes from "./routes/discountRoutes";
import brandRoutes from "./routes/brandRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import bannerRoutes from "./routes/bannerRoutes";
import suppliersRoutes from "./routes/suppliersRoutes";
import transfersRoutes from "./routes/transfersRoutes";
import { handleSearch } from "./controllers/search";
dotenv.config();
import handleAnalytics from "./controllers/analytics";
import { Authentication } from "./middlewares/authentication";
import { Authorization } from "./middlewares/authorization";
import { generateUploadUrl } from "./utils/getSignedUrl";
const app = express();

// git subtree push --prefix <subfolder> heroku master
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/payments", paymentsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/discounts", discountRoutes);
app.use("/me", Authentication, meRoutes);
app.use("/inventory", Authentication, inventoryRoutes);
app.use("/brands", brandRoutes);
app.use("/banners", bannerRoutes);
app.use("/suppliers", suppliersRoutes);
app.use("/transfers", Authentication, transfersRoutes);
app.get("/search", handleSearch);
app.get(
  "/analytics",
  Authentication,
  Authorization(["admin"]),
  handleAnalytics
);

app.post("/signed-url", Authentication, async (req, res) => {
  try {
    const type = req.body.type;
    const key = req.body.key;

    if (!type) {
      return res.status(400).json({ error: "type is required" });
    }
    const data = await generateUploadUrl({ type, key });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/contact", (req, res) => {
  return res.json({ message: "success" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400);
  res.json({
    message: error,
    status: 400,
  });
});

app.get("/", async (req, res) => {
  res.json({ message: "👋 welcome on cartpower api" });
});

app.post("/newslater", async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }
    return res.json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.use("/", async (req, res) => {
  res.status(404).json({ message: "route not found" });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
