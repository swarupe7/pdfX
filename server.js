const express = require("express");
const path=require("path");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();

const { mergePdf } = require("./testPdfs");

app.use(express.json());
app.use('/static',express.static('public'))



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"));
});

app.post('/merge', upload.array('pdfs',2), async (req, res, next)=> {
  console.log(req.files);
  let d=await mergePdf(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
  // res.send({data:req.files});
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  res.redirect(`http://localhost:5000/static/${d}.pdf`);
})


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));