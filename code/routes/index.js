var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');
var argon2 = require('argon2');

module.exports = router;

var user = "qweqe" ;
var pass = "" ;
var username = "" ;

router.post('/logins',  function(req, res , next) {

   var user = sanitizeHtml(req.body.username) ;
   var pass = sanitizeHtml(req.body.password);
   
   req.pool.getConnection( function(err, connection) {
      if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   var query = "select hashed_password from staffa where username = ? ";
   var values = [user];
    connection.query(query,[values], async function(err, rows, fields) {  
      if (err) {
        console.log(err);
        connection.release();
        res.sendStatus(500);
        return;
      }
    
    phash = rows[0].hashed_password ;
    
      try {
    if (await argon2.verify(phash, pass)) {
      // password match
      // add code here for when user successfully logged in

      res.sendStatus(200) ;

    } else {
      // password did not match
      // add code here for when user login fails
      connection.release();
      res.sendStatus(401);
      return;
    }
  } catch (err) {
      
      connection.release();
    // internal failure
    res.sendStatus(500);
    return;
  }
      connection.release();
    });

  });
  
  username = user ;
});


router.post('/loginm', function(req, res , next) {

   var user = sanitizeHtml(req.body.username) ;
   var pass = sanitizeHtml(req.body.password);
   
   req.pool.getConnection( function(err, connection) {
      if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   var query = "select hashed_password from manager where username = ? ";
   var values = [user];
    connection.query(query,[values],async function(err, rows, fields) {  
      if (err) {
        console.log(err);
        connection.release();
        res.sendStatus(500);
        return;
      }

      phash = rows[0].hashed_password ;
      try {
    if (await argon2.verify(phash, pass)) {
      
      res.sendStatus(200) ;

    } else {
      // password did not match
      // add code here for when user login fails
      
      res.sendStatus(401);
      connection.release();
      return;
    }
  } catch (err) {
    // internal failure
    res.sendStatus(500);
    return;
  }
    });
    connection.release();

  });
  
  username = user ;
});

var id = 0 ;
router.get('/loginid', function(req, res , next) {
   
   var user = username ;
   
   req.pool.getConnection( function(err, connection) {
      console.log('db starts here');
      if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   
    var query = "select staff_id from staffa where username = ?  ";
   var values = [user];
    connection.query(query,[values], function(err, rows, fields) {  
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
     
      id = rows[0].staff_id ;
      res.json(rows) ;
     
    });
    connection.release();
  });
  
 
});

router.get('/loginidm', function(req, res , next) {
   
   var user = username ;
   
   req.pool.getConnection( function(err, connection) {
      console.log('db starts here');
      if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   
    var query = "select manager_id from manager where username = ?  ";
   var values = [user];
    connection.query(query,[values], function(err, rows, fields) {  
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
     
      id = rows[0].manager_id ;
      res.json(rows) ;
     
    });
    connection.release();
  });
  
 
});

router.get('/staffmanage', function(req, res , next) {

   req.pool.getConnection( function(err, connection) {
     
      if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   
    var query = "select MAX(staff_id) AS id from staffa ";
   
    connection.query(query, function(err, rows, fields) {  
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
     
     
      res.json(rows) ;
     
    });
    connection.release();
  });
});  

router.get('/staffmanage1', function(req, res , next) {

   req.pool.getConnection( function(err, connection) {
     
      if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   
    var query = "select staff_id,firstname,lastname from staffa ";
   
    connection.query(query, function(err, rows, fields) {  
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows) ;
     
    });
    connection.release();
  });
});  

router.post('/staffemail', function(req, res , next) {

var staff = sanitizeHtml(req.body.staffid);

   req.pool.getConnection( function(err, connection) {
     
      if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    
    var query = "select staff_id,email,availnp,staffemail from staffa where staff_id = ?";
    var value = [staff] ;
    connection.query(query,[value], function(err, rows, fields) {  
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
     console.log(rows);
     
      res.json(rows) ;
     
    });
    connection.release();
  });
});  

var users=[];

router.post('/signup',  function(req, res , next) {
  
   var first = sanitizeHtml(req.body.firstname) ;
   var last = sanitizeHtml(req.body.surname) ;
   var user = sanitizeHtml(req.body.username) ;
   var pass = sanitizeHtml(req.body.password) ;
   var email = sanitizeHtml(req.body.email) ;
   var check = sanitizeHtml(req.body.checked) ;
   
   req.pool.getConnection( async function(err, connection) {
      
    if (err) {
      console.log('a');
      console.log(err);
      res.sendStatus(500);
      return;
    }
    
  var query = "" ;
  
  console.log(check) ;
  
    if (check == "false")
    query = "INSERT INTO staffa (username,firstname,lastname,email, hashed_password) VALUES (?)";
   else query = "INSERT INTO manager (username,firstname,lastname,email, hashed_password) VALUES (?)";
   
   var phash = null;
  try {
    phash = await argon2.hash(req.body.password);
  } catch (err) {
    res.sendStatus(500);
    return;
  }
   
   var values = [user, first, last, email, phash];
    connection.query(query,[values], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
    
      res.sendStatus(200) ;
    });
    connection.release();
  });

});

router.post('/createtask', function(req, res , next) {

   var tname = sanitizeHtml(req.body.taskname) ;
   var tdue = sanitizeHtml(req.body.taskdue) ;
   var s = sanitizeHtml(req.body.staffid) ;
   
   console.log(tname);
    req.pool.getConnection( function(err, connection) {
      console.log('db starts here');
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   var query = "INSERT INTO tasksa (taskinfo,taskdue,staff_id) VALUES (?)";
   var value1 = [tname,tdue,s];
 
    connection.query(query,[value1], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      res.json(rows);
    });
    connection.release();
  });
});

router.post('/report', function(req, res , next) {

 var i = sanitizeHtml(req.body.ida);
 var s = sanitizeHtml(req.body.statusa);

 req.pool.getConnection( function(err, connection) {
    
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    
  var query = "update tasksa set status= ? where task_id =?";

 
    connection.query(query,[s,i], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      res.json(rows);
    });
    connection.release();
  });


});

router.get('/gettasks', function(req, res , next) {

   var user = username;
   
    req.pool.getConnection( function(err, connection) {
    
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    
    
   query = "select task_id,taskinfo,taskdue,status from tasksa where staff_id =?";
   var values = id;

   console.log(values) ;
    connection.query(query,[values], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      res.json(rows);
    });
    connection.release();
  });

});

router.get('/getprofile', function(req, res , next) {

 var user = username ;
   
    req.pool.getConnection( function(err, connection) {
      console.log('db starts here');
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   var query = "select firstname,lastname,email from staffa where username = ?";
   var values = [user];
    connection.query(query,[values], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      res.json(rows);
    });
    connection.release();
  });

});



// var id1 = 0 ;
// router.get('/loginidm', function(req, res , next) {
   
//   var user = username ;
   
//   req.pool.getConnection( function(err, connection) {
//       console.log('db starts here');
//       if (err) {
//       console.log(err);
//       res.sendStatus(500);
//       return;
//     }
   
//     var query = "select staff_id,hashed_password from staffa where username = ?  ";
//   var values = [user];
//     connection.query(query,[values], function(err, rows, fields) {  
//       if (err) {
//         console.log(err);
//         res.sendStatus(500);
//         return;
//       }
//       console.log(rows);
     
//       id1 = rows[0].staff_id ;
//       res.json(rows) ;
     
//     });
//     connection.release();
//   });
  
// });

router.get('/getprofilem', function(req, res , next) {


 var user = username ;
   
    req.pool.getConnection( function(err, connection) {
      console.log('db starts here');
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   var query = "select firstname,lastname,email from manager where username = ?";
   var values = [user];
    connection.query(query,[values], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      res.json(rows);
    });
    connection.release();
  });

});


router.post('/updateprofile', function(req, res , next) {

 var f = sanitizeHtml(req.body.firstn) ;
   var s = sanitizeHtml(req.body.lastn) ;
   var e = sanitizeHtml(req.body.email1) ;
   var p = sanitizeHtml(req.body.password1) ;
  
    req.pool.getConnection( async function(err, connection) {
      
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var phash = null;
  try {
    phash = await argon2.hash(p);
  } catch (err) {
    res.sendStatus(500);
    return;
  }
  
   var query = "update staffa set  firstname = ? ,lastname = ? ,email = ? ,hashed_password = ?  where staff_id = ?";
   var value1 = f;
   var value2 = s;
   var value3 = e;
   var value4 = phash;
   var value5 = id;
   
    connection.query(query,[value1,value2,value3,value4,value5], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      res.json(rows);
    });
  });

});

router.post('/updateprofilem', function(req, res , next) {

 var f = sanitizeHtml(req.body.firstn) ;
   var s = sanitizeHtml(req.body.lastn) ;
   var e = sanitizeHtml(req.body.email1) ;
   var p = sanitizeHtml(req.body.password1) ;
  
    req.pool.getConnection( async function(err, connection) {
      
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var phash = null;
  try {
    phash = await argon2.hash(p);
  } catch (err) {
    res.sendStatus(500);
    return;
  }
  
   var query = "update manager set  firstname = ? ,lastname = ? ,email = ? ,hashed_password = ?  where manager_id = ?";
   var value1 = f;
   var value2 = s;
   var value3 = e;
   var value4 = phash;
   var value5 = id;
   
    connection.query(query,[value1,value2,value3,value4,value5], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      res.json(rows);
    });
  });

});

router.post('/updateavail', function(req, res , next) {

 var a = sanitizeHtml(req.body.avail) ;
  
  
    req.pool.getConnection( function(err, connection) {
      
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   var query = "update staffa set  availnp = ?  where staff_id = ?";
   var value1 = a;
   var value5 = id;
   
    connection.query(query,[value1,value5], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      res.json(rows);
    });
  });

});


router.post('/submitemailpre', function(req, res , next) {

 var a = sanitizeHtml(req.body.p1) ;
  var b = sanitizeHtml(req.body.p2) ;
    
    req.pool.getConnection( function(err, connection) {
      
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   var query = "update staffa set  staffemail = ?  where staff_id = ?";
   
   var value1 = "Notsure";
   if(a== "true" && b == "false")
    value1 = "weekly";
   
   if(a== false && b == true)
    value1 = "dayly";
   
   if(a== true && b == true)
    value1 = "weekly&dayly";
   
   
   var value5 = id;
   
    connection.query(query,[value1,value5], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      res.json(rows);
    });
  });

});

const  mailOptions = {
  from: 'xiaofanlu123@gmail.com', // sender address
  to: 'a1780911@student.adelaide.edu.au', // list of receivers
  subject: 'Subject of your email', // Subject line
 
  html: '<p>Your html here</p>'// plain text body
};

router.post('/sendemail', function(req, res , next) {

var email = sanitizeHtml(req.body.email) ;
var sub = sanitizeHtml(req.body.sub) ;
var htm = sanitizeHtml(req.body.htm) ;

mailOptions.to = email ;
mailOptions.subject = sub ;
mailOptions.html = htm ;

req.tran.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err);
   else
     res.sendStatus(200);
});

});


router.post('/send', function(req, res , next) {

  var text = sanitizeHtml(req.body.text) ;

});