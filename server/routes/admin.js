
var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');

//**********************************************//
//                                              //
//               ADMIN REPORTS VIEW             //
//                                              //
//**********************************************//
//Finds the number of users in a ward to display on admin view.
router.get('/userChart', function (req, res) {
  if(req.decodedToken.admin){
    pool.connect()
    .then(function (client) {
      client.query("SELECT ward, count(ward) FROM users GROUP BY ward ORDER BY ward ASC")
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  }
});//end of router.get

router.get('/userChartIdeas', function (req, res) {
  if(req.decodedToken.admin){
    pool.connect()
    .then(function (client) {
      client.query("SELECT subtopics_id, count(subtopics_id) FROM ideas GROUP BY subtopics_id ORDER BY subtopics_id ASC;")
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  }
});//end of router.get

router.get('/checkAdminStatus', function (req, res) {
  console.log('get here?');
  if(req.decodedToken.admin){
    res.send(true);
    console.log('admin', true);
  } else{
    res.send(false);
    console.log('admin', false);
  }
});//end of router.get

//gets all users name and id for idea and comment view
router.get('/ideaChart', function (req, res) {
  if(req.decodedToken.admin){
    pool.connect()
    .then(function (client) {
      client.query("SELECT ward, count(ward) FROM users GROUP BY ward")
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  }
});//end of router.get

//**********************************************//
//                                              //
//              ADMIN MANAGE USERS              //
//                                              //
//**********************************************//
//**********************************************//
//       GET ALL USERS TO DISPLAY ON VIEW       //
//**********************************************//
// router.get('/manageUsers', function(req, res){
//   if(req.decodedToken.admin){
//     pool.connect( function (err, client, done) {
//       client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
//       'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
//       ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
//       'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE ideas_flags_count IS NOT NULL OR comments_flags_count IS NOT NULL OR subflags_count IS NOT NULL;', function(err, result){
//         done();
//         if(err){
//           console.log('Error completing manage users query', err);
//           res.sendStatus(500);
//         } else {
//           res.send(result.rows);
//           console.log(result.rows);
//         }
//       });
//     });
//   }
// });

router.get('/manageUsers', function(req, res){
  if(req.decodedToken.admin){
    pool.connect( function (err, client, done) {
      client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
      'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
      ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
      'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id ORDER BY ideas_flags_count DESC NULLS LAST, comments_flags_count DESC NULLS LAST,    subflags_count DESC NULLS LAST LIMIT 50;', function(err, result){
        done();
        if(err){
          console.log('Error completing manage users query', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});
//**********************************************//
//         USER ACTIVATION/DEACTIVATION         //
//**********************************************//
//Deactivate user
router.put('/deactivateUser/:id', function(req, res) {
  if(req.decodedToken.admin){
    var userToDeactivateId = req.params.id;
    pool.connect( function (err, client, done) {
      client.query('UPDATE users SET active=false WHERE id=$1;',[userToDeactivateId], function(err, result){
        done();
        if(err){
          console.log('Error deactivating user', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});

//Reactivate user
router.put('/reactivateUser/:id', function(req, res) {
  if(req.decodedToken.admin){
    var userToReactivateId = req.params.id;
    pool.connect(function (err, client, done) {
      client.query('UPDATE users SET active=true WHERE id=$1;',[userToReactivateId], function(err, result){
        done();
        if(err){
          ('Error reactivating user', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});
//**********************************************//
//                 USER FILTER                  //
//**********************************************//
//populates user filter on admin manage users view
router.get('/filterUsers', function (req, res) {
  if(req.decodedToken.admin){
    pool.connect(function (err, client, done) {
      client.query('SELECT * FROM user_filter', function (err, result) {
        done();
        if (err) {
          console.log('Error completing user filter query', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    });
  }
});
//**********************************************//
//        LOGIC FOR WHAT THE FILTER DOES        //
//**********************************************//
//queries database for matching users on admin manage users view
router.get('/searchUsers', function (req, res) {
  if(req.decodedToken.admin){
    var userSearch = req.headers
    var newSearchString = "%" + req.headers.searchstring + "%";
    // console.log(newSearchString);
    if(req.headers.filter == 'User Name'){
      pool.connect(function (err, client, done) {
        client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
        'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
        ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
        'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE name ILIKE $1;',
        [newSearchString], function (err, result) {
          done();
          if (err) {
            console.log('Error completing user search query', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
            console.log(result.rows);
          }
        });
      });
    } else if(req.headers.filter == 'User Email'){
      pool.connect(function (err, client, done) {
        client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
        'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
        ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
        'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE email ILIKE $1;',
        [newSearchString], function (err, result) {
          done();
          if (err) {
            console.log('Error completing user search query', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
            // console.log(result.rows);
          }
        });
      });
    }else{
      pool.connect(function (err, client, done) {
        client.query('WITH ideas_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS ideas_flags_count FROM ideas_flags JOIN users ON ideas_flags.user_id=users.id GROUP BY users.id),' +
        'comments_flags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS comments_flags_count FROM comments_flags JOIN users ON comments_flags.user_id=users.id GROUP BY users.id),' +
        ' subflags_count_temp_table AS (SELECT users.id AS user_id, COUNT(users.id) AS subflags_count FROM subflags JOIN users ON subflags.user_id=users.id GROUP BY users.id)' +
        'SELECT users.name, users.email, users.ward, users.active, users.id, ideas_flags_count, comments_flags_count, subflags_count FROM users LEFT OUTER JOIN ideas_flags_count_temp_table ON ideas_flags_count_temp_table.user_id=users.id LEFT JOIN comments_flags_count_temp_table ON comments_flags_count_temp_table.user_id=users.id LEFT JOIN subflags_count_temp_table ON subflags_count_temp_table.user_id=users.id WHERE ward ILIKE $1;',
        [newSearchString], function (err, result) {
          done();
          if (err) {
            console.log('Error completing user search query', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
            // console.log(result.rows);
          }
        });
      });
    }
  }
});


router.get('/allCommentFlags', function(req,res){
  pool.connect( function (err, client, done) {
    client.query('SELECT * FROM comments_flags LEFT JOIN comments on comments_flags.comment_id = comments.id LEFT JOIN users ON users.id = comments.user_id WHERE comments_flags.active = true AND comments.active = true;', function(err, result){
      done();
      if(err){
        console.log('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
      }
    });
  })
});


router.get('/allIdeaFlags', function(req,res){
  pool.connect( function (err, client, done) {
    client.query(' SELECT * FROM ideas_flags LEFT JOIN ideas on ideas_flags.idea_id = ideas.id LEFT JOIN users ON users.id = ideas.user_id WHERE ideas_flags.active = true AND ideas.active = true;', function(err, result){
      done();
      if(err){
        console.log('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
      }
    });
  })
});



router.delete('/deleteFlaggedIdea/:id', function(req,res){
  console.log(req.params.id);
  pool.connect( function (err, client, done) {
    client.query('DELETE FROM ideas WHERE id=$1;',[req.params.id], function(err, result){
      done();
      if(err){
        console.log('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
        console.log("this si RRRRREEESSSULT",result.rows);
      }
    });
  })
});

router.delete('/deleteFlaggedComment/:id', function(req,res){
  console.log(req.params.id);
  pool.connect( function (err, client, done) {
    client.query('DELETE FROM comments WHERE id=$1;',[req.params.id], function(err, result){
      done();
      if(err){
        console.log('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
        console.log("this si RRRRREEESSSULT",result.rows);
      }
    });
  })
});


//gets filter results for admin-reports view
router.post('/getFilteredResult', function (req, res) {
  var filterObject = req.body;
  console.log("filterObject", filterObject);
  if(req.body.liked_loved == 'ideas_likes' && req.body.ward !== 'allWards'){
    pool.connect()
    .then(function (client) {
      client.query('WITH ideas_likes_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_likes_count FROM ideas_likes JOIN ideas ON ideas_likes.idea_id=ideas.id GROUP BY ideas.id), ' +
      'ideas_loves_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_loves_count FROM ideas_loves JOIN ideas ON ideas_loves.idea_id=ideas.id GROUP BY ideas.id) ' +
      'SELECT ideas.title, ideas.description, ideas.subtopics_id, ideas.user_id, ideas.id AS idea_id, users.name, users.email, users.address,users.ward, users.admin, users.active, users.photo, ideas_likes_count, ideas_loves_count, subtopics.active AS subtopics_active FROM ideas ' +
      'LEFT OUTER JOIN users ON ideas.user_id=users.id ' +
      'LEFT JOIN ideas_likes_count_temp_table ON ideas_likes_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN ideas_loves_count_temp_table ON ideas_loves_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN subtopics ON subtopics.id=ideas.subtopics_id ' +
      'WHERE ward=$1 AND subtopics_id=$2;',[filterObject.ward, filterObject.subtopic])
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  } else if (req.body.liked_loved == 'ideas_loves' && req.body.ward !== 'allWards'){
    pool.connect()
    .then(function (client) {
      client.query('WITH ideas_likes_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_likes_count FROM ideas_likes JOIN ideas ON ideas_likes.idea_id=ideas.id GROUP BY ideas.id), ' +
      'ideas_loves_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_loves_count FROM ideas_loves JOIN ideas ON ideas_loves.idea_id=ideas.id GROUP BY ideas.id) ' +
      'SELECT ideas.title, ideas.description, ideas.subtopics_id, ideas.user_id, ideas.id AS idea_id, users.name, users.email, users.address,users.ward, users.admin, users.active, users.photo, ideas_likes_count, ideas_loves_count, subtopics.active AS subtopics_active FROM ideas ' +
      'LEFT OUTER JOIN users ON ideas.user_id=users.id ' +
      'LEFT JOIN ideas_likes_count_temp_table ON ideas_likes_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN ideas_loves_count_temp_table ON ideas_loves_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN subtopics ON subtopics.id=ideas.subtopics_id ' +
      'WHERE ward=$1 AND subtopics_id=$2;',[filterObject.ward, filterObject.subtopic])
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
    console.log(filterObject);
  } else if (filterObject.ward == 'allWards' && req.body.liked_loved !== 'ideas_likes' && req.body.liked_loved !== 'ideas_loves'){
    pool.connect()
    .then(function (client) {
      client.query('WITH ideas_likes_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_likes_count FROM ideas_likes JOIN ideas ON ideas_likes.idea_id=ideas.id GROUP BY ideas.id), ' +
      'ideas_loves_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_loves_count FROM ideas_loves JOIN ideas ON ideas_loves.idea_id=ideas.id GROUP BY ideas.id) ' +
      'SELECT ideas.title, ideas.description, ideas.subtopics_id, ideas.user_id, ideas.id AS idea_id, users.name, users.email, users.address,users.ward, users.admin, users.active, users.photo, ideas_likes_count, ideas_loves_count, subtopics.active AS subtopics_active FROM ideas ' +
      'LEFT OUTER JOIN users ON ideas.user_id=users.id ' +
      'LEFT JOIN ideas_likes_count_temp_table ON ideas_likes_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN ideas_loves_count_temp_table ON ideas_loves_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN subtopics ON subtopics.id=ideas.subtopics_id ' +
      'WHERE subtopics_id=$1;',[filterObject.subtopic])
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  } else if (req.body.liked_loved == 'ideas_loves' && req.body.ward == 'allWards'){
    pool.connect()
    .then(function (client) {
      client.query('WITH ideas_likes_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_likes_count FROM ideas_likes JOIN ideas ON ideas_likes.idea_id=ideas.id GROUP BY ideas.id), ' +
      'ideas_loves_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_loves_count FROM ideas_loves JOIN ideas ON ideas_loves.idea_id=ideas.id GROUP BY ideas.id) ' +
      'SELECT ideas.title, ideas.description, ideas.subtopics_id, ideas.user_id, ideas.id AS idea_id, users.name, users.email, users.address,users.ward, users.admin, users.active, users.photo, ideas_likes_count, ideas_loves_count, subtopics.active AS subtopics_active FROM ideas ' +
      'LEFT OUTER JOIN users ON ideas.user_id=users.id ' +
      'LEFT JOIN ideas_likes_count_temp_table ON ideas_likes_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN ideas_loves_count_temp_table ON ideas_loves_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN subtopics ON subtopics.id=ideas.subtopics_id ' +
      'WHERE subtopics_id=$1;',[filterObject.subtopic])
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  } else if (req.body.liked_loved == 'ideas_likes' && req.body.ward == 'allWards'){
    pool.connect()
    .then(function (client) {
      client.query('WITH ideas_likes_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_likes_count FROM ideas_likes JOIN ideas ON ideas_likes.idea_id=ideas.id GROUP BY ideas.id), ' +
      'ideas_loves_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_loves_count FROM ideas_loves JOIN ideas ON ideas_loves.idea_id=ideas.id GROUP BY ideas.id) ' +
      'SELECT ideas.title, ideas.description, ideas.subtopics_id, ideas.user_id, ideas.id AS idea_id, users.name, users.email, users.address,users.ward, users.admin, users.active, users.photo, ideas_likes_count, ideas_loves_count, subtopics.active AS subtopics_active FROM ideas ' +
      'LEFT OUTER JOIN users ON ideas.user_id=users.id ' +
      'LEFT JOIN ideas_likes_count_temp_table ON ideas_likes_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN ideas_loves_count_temp_table ON ideas_loves_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN subtopics ON subtopics.id=ideas.subtopics_id ' +
      'WHERE subtopics_id=$1;',[filterObject.subtopic])
      .then(function (result) {
        client.release();
        res.send(result.rows);
      })
      .catch(function (err) {
        console.log('error on SELECT', err);
        res.sendStatus(500);
      });
    });//end of .then
  } else {
    return
  }//end of else

});//end of router.get

router.put('/deleteFlaggedIdeaFlag/:id', function(req,res){
  pool.connect( function (err, client, done) {
    client.query('UPDATE ideas_flags SET active = false WHERE ideas_flags.idea_id =$1;',[req.params.id], function(err, result){
      done();
      if(err){
        console.log('Error deleting flagged idea', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
      }
    });
  })
});

router.put('/deleteFlaggedComment/:id', function(req,res){
  pool.connect( function (err, client, done) {
    client.query('UPDATE comments_flags SET active = false WHERE comments_flags.comment_id =$1;',[req.params.id], function(err, result){
      done();
      if(err){
        console.log('Error deleting flagged comment', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
      }
    });
  })
});

router.put('/deleteComment/:id', function(req,res){
  pool.connect( function (err, client, done) {
    client.query('UPDATE comments SET active = false WHERE comments.id =$1;',[req.params.id], function(err, result){
      done();
      if(err){
        console.log('Error deleting comment', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
      }
    });
  })
});

router.put('/deleteIdea/:id', function(req,res){
  pool.connect( function (err, client, done) {
    client.query('UPDATE ideas SET active = false WHERE ideas.id =$1;',[req.params.id], function(err, result){
      done();
      if(err){

        console.log('Error completing deleting idea', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
      }
    });
  })
});

router.put('/updateComment/:id', function(req,res){
  pool.connect( function (err, client, done) {
    client.query('UPDATE comments SET description = $1 WHERE comments.id =$2;',[req.body.description,req.params.id], function(err, result){
      done();
      if(err){
        console.log('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
        console.log("this si RRRRREEESSSULT",result.rows);
      }
    });
  })
});

router.put('/updateIdea/:id', function(req,res){
  console.log(".............",req.params.id);
  console.log(">>>>>>>>>>>>>body",req.body,"TTTTTTTTT");
  pool.connect( function (err, client, done) {
    client.query('UPDATE ideas SET title = $1,description = $2  WHERE ideas.id =$3;;',[req.body.title,req.body.description,req.params.id], function(err, result){
      done();
      if(err){
        console.log('Error completing manage users query', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
        console.log("this is RRRRREEESSSULT",result.rows);
      }
    });
  })
});

router.get('/getUserLoves', function(req,res){
  pool.connect( function (err, client, done) {
    client.query('SELECT users.name AS user_name, users.email AS user_email, ideas.title AS idea_title, subtopics.title AS subtopic_title FROM users JOIN ideas_loves ON ideas_loves.user_id = users.id JOIN ideas ON ideas.id = ideas_loves.idea_id JOIN subtopics ON subtopics.id = ideas.subtopics_id WHERE users.active = true AND subtopics.active = true;', function(err, result){
      done();
      if(err){
        console.log('Error completing get user loves query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  })
});

router.put('/updateIdea/:id', function(req,res){
  pool.connect( function (err, client, done) {
    client.query('UPDATE ideas SET title = $1,description = $2  WHERE ideas.id =$3;;',[req.body.title,req.body.description,req.params.id], function(err, result){
      done();
      if(err){
        console.log('Error updating ideas', err);
        res.sendStatus(501);
      } else {
        res.send(result.rows);
      }
    });
  })
});

module.exports = router;
