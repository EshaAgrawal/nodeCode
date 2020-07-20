const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB' , {useNewUrlParser : true}  , (err) => {
    if(!err) {console.log('mongo connection successful')}
    else{console.log('error in connecting ' + err)}
});
require('./employee.model');