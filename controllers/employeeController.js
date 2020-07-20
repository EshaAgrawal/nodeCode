const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
   //console.log(req.body);
   
   if (req.body._id == '')
        insertRecord(req, res);
         else
         updateRecord(req, res);

});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.gender = req.body.gender;
    employee.city = req.body.city;
    employee.save((err , doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    //res.json("list");
    Employee.find((err, docs) => {
        if (!err){
            //console.log( "list is" , docs);
            var d = JSON.stringify (docs);
                        console.log( "first" , d);
                        var an_array = 
                        
[{"_id":"5f155a983dfa711ba597f4b2","name":"ESHA","email":"eshaagrawal277@gmail.com","gender":"aaaaaa","city":"BHILAI",
"__v":0},
 {"_id":"5f1578ea020b37e6703e9e54","name":"rtrtr","email":"eshaagrawal277@gmail.com","gender":"sss","city":"BHILAI",
"__v":0}];

            // var an_array = [
            //     {name: "My name"},
            //     {name: "Another name"}
            // ];

            res.render("employee/list", {try: d});
    }
        
         else {
             console.log('Error in retrieving employee list :' + err);
         }
    });
 });


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
 }

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;