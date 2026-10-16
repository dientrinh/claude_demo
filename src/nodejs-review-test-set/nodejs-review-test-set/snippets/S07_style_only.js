const Customer = require('./customer')
const fs = require('fs');
var _ = require("lodash")

class ReportService{
  buildNames(customers){
    var Result_list = []
    for(var i=0;i<customers.length;i++){
      var n = customers[i].firstName+" "+customers[i].lastName
      Result_list.push(n)
    }
    return Result_list
  }
}

module.exports = ReportService
