const CSVRecord = require("../models/dataRecord");
const csv = require("csv-parser");
const fs = require("fs");

const index = async (req, res) => {
  const csvRecords = await CSVRecord.find();
  res.render("index", { csvRecords });
};

const uploadCSV = async (req, res) => {
  console.log(req.file);
  const { originalname, path } = req.file;
  const csvRecord = new CSVRecord({
    originalname,
    path,
  });
  await csvRecord.save();

  res.redirect("/");
};

const deleteCSV = async (req, res) => {
  const { id } = req.params;

  res.redirect("/");
};
const displayCSV = async (req, res) => {
  const ITEMS_PER_PAGE = 20;
  const results = [];
  const fieldLabels = [];
  const { id } = req.params;
  console.log("req query ", req.query);
  const start  = Number(req.query.start);
  const csvRecord = await CSVRecord.findById(id);
  console.log(csvRecord);
  fs.createReadStream(csvRecord.path)
    .pipe(csv())
    .on("headers", (headers) => {
      fieldLabels.push(headers);
    })
    .on("data", (data) => results.push(data))
    .on("end", () => {
      // console.log(results[0]);
      //pagination result
      const begin = (start - 1) * ITEMS_PER_PAGE;
      const end = start * ITEMS_PER_PAGE;
      const updatedRecords = results.slice(begin, end);
    
      res.render("csv-display", {
        id,
        headers: [...fieldLabels[0]],
        records: updatedRecords,
        totalPages:Math.ceil(results.length/ITEMS_PER_PAGE),
        currentPage:start,
      });
    });
};

module.exports = {
  index,
  uploadCSV,
  displayCSV,
  deleteCSV,
};
