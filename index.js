import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";

const mercadopago = require ('mercadopago');
mercadopago.configure({access_token: "TEST-8799567864073356-061211-f94432519dece36dca95b6b05971353d-2059252492"});

const app = express();
const port = 5500;
app.use(cors());
app.use(express.json());

app.post("../create_preference", async (req, res) => {
  try {
    const { title, quantity, price } = req.body;

if (!title || !quantity || !price) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const preference = {

      
      
    items: [
  {
    title,
    unit_price: Number(price),
    quantity: Number(quantity),
    currency_id: "MX",
  }
],
      back_urls: {
        success: "http://localhost:3000/success.html",
  failure: "http://localhost:3000/failure.html",
  pending: "http://localhost:3000/pending.html"
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
