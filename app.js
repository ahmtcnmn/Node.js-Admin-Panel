import express from "express";
const app = express();

const PORT = process.env.port || 8081;
//---------------------------------------------------------------------------------------------------------------------------------------
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//---------------------------------------------------------------------------------------------------------------------------------------
app.use("/img", express.static("img"));
app.use("/css", express.static("css"));
app.use("/src", express.static("src"));
//---------------------------------------------------------------------------------------------------------------------------------------
import pages from "./router/pages.js";
//---------------------------------------------------------------------------------------------------------------------------------------

app.get("/", pages);
app.get("/iletisim", pages);
app.get("/iletisim/:id", pages);
app.post("/iletisim/:id", pages);
app.get("/iletisim/delete/:id", pages);
app.get("/addnew", pages);
app.post("/addnew/new", pages);
app.get('/update', pages)



//---------------------------------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} da çalışıyor`)
});