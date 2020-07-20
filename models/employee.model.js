const mongoose = require('mongoose');
 
var employeeSchema = new mongoose.Schema({

    name :{
        type : String ,
        required: 'This field is required.'
        
        
        //required: [true, 'Full name must be provided']
    },
    email : {
        type : String 
        // Required:  'Email address cannot be left blank.',
    },
    // password : {
    //     type : String
    // },
    gender : {
        type : String
    },
    city : {
        type : String
    }
})
// Custom validation for email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
mongoose.model('Employee', employeeSchema);