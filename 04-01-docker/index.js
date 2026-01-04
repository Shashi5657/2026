import e from "express";

const app = e();

app.get("/", (req, res) => {
  res.send("🚀 Hello World..!!");
});

app.listen(8001, "0.0.0.0", () => {
  console.log("Server running on 8001");
});
