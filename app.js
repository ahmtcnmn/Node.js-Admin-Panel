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

app.use("/", pages);
app.use("/iletisim", pages);
app.use("/iletisim/:id", pages);
app.use("/iletisim/:id", pages);
app.use("/iletisim/delete/:id", pages);
app.use("/addnew", pages);
app.use("/addnew/new", pages);
app.use('/update', pages)



//---------------------------------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} da çalışıyor`)
});
