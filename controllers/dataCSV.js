const CSVRecord = require("../models/dataRecord");
const csv = require("csv-parser");
const fs = require("fs");
const path=require('path');

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
  const record=await CSVRecord.findById(id);
  const recordPath=path.resolve(process.cwd(),record.path);
  fs.unlinkSync(recordPath);
  await CSVRecord.deleteOne({_id:id});
  res.redirect("/");
};

const displayCSV = async (req, res) => {
  const ITEMS_PER_PAGE = 10;
  const results = [];
  const fieldLabels = [];
  const searchText=req.query.searchText?.toLowerCase() ||"";
  console.log(searchText);
  const { id } = req.params;
  const start  = Number(req.query.start) || 1;
  const csvRecord = await CSVRecord.findById(id);
  // console.log(csvRecord);
  fs.createReadStream(csvRecord.path)
    .pipe(csv())
    .on("headers", (headers) => {
      
      fieldLabels.push(...headers);
      
    })
    .on("data", (data) => results.push(data))
    .on("end", () => {
      const filteredRecords=results.filter((result)=>{
      
        
        let found=false;
        for(let i=0;i<fieldLabels.length;i++){
          if(result[fieldLabels[i]]?.toLowerCase().includes(searchText)){
            found=true;
            break;
          }
        }
        return found;
      })
      console.log(filteredRecords.length);
      //pagination result
      const begin = (start - 1) * ITEMS_PER_PAGE;
      const end = start * ITEMS_PER_PAGE;
      const updatedRecords = filteredRecords.slice(begin, end);
    
      res.render("csv-display", {
        id,
        headers: [...fieldLabels],
        records: updatedRecords,
        totalPages:Math.ceil(filteredRecords.length/ITEMS_PER_PAGE),
        currentPage:start,
        searchText,
      });
    });
};

module.exports = {
  index,
  uploadCSV,
  displayCSV,
  deleteCSV,
};
