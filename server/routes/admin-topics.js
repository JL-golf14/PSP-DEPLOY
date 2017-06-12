var express = require('express');
var router = express.Router();
var pool = require('../modules/database-config');
//*****************************************//
//                                         //
//               MAIN TOPIC                //
//                                         //
//*****************************************//
//**********************************************//
//           ADMIN UPDATE ACTIVE TOPIC          //
//**********************************************//
router.put('/updateActiveTopic', function(req, res){
  var mainTopic = {title: req.body.title, description: req.body.description, id: req.body.id};
    if(req.decodedToken.admin){
      pool.connect( function (err, client, done) {
        client.query('UPDATE main_topics SET title = $1, description = $2 WHERE id = $3;',
        [mainTopic.title, mainTopic.description, mainTopic.id], function(err, result){
          done();
          if(err){
            console.log('Error updating main topic', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
      });
    } else {
      res.sendStatus(403);
    }
});
//**********************************************//
//        DISPLAY UPCOMING TOPIC ON VIEW        //
//**********************************************//
router.get('/findUpcomingTopic', function(req, res){
  var title = req.headers.title
    var description = req.headers.description;
    if(req.decodedToken.admin){
      pool.connect( function (err, client, done) {
        client.query('SELECT * FROM main_topics WHERE upcoming = true;', function(err, result){
          done();
          if(err){
            console.log('Error finding main topic from the database.', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
      });
    }
});
//**********************************************//
//          ADMIN UPDATE UPCOMING TOPIC         //
//**********************************************//
router.put('/updateUpcomingTopic', function(req, res){
  var mainTopic = {title: req.body.title, description: req.body.description, id: req.body.id};
    if(req.decodedToken.admin){
      pool.connect( function (err, client, done) {
        client.query('UPDATE main_topics SET title = $1, description = $2, upcoming = true WHERE id = $3;',
        [mainTopic.title, mainTopic.description, mainTopic.id], function(err, result){
          done();
          if(err){
            console.log('Error updating main topic', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
      });
    }
});
//**********************************************//
//          ADMIN CREATE UPCOMING TOPIC         //
//**********************************************//
router.put('/addUpcomingTopic', function(req, res){
  if(req.decodedToken.admin){
    var mainTopic = {title: req.body.title, description: req.body.description};
    // console.log('what is main topic?: ', mainTopic);
    pool.connect( function (err, client, done) {
      client.query('INSERT INTO main_topics (title, description, upcoming) VALUES ($1, $2, true);',
      [mainTopic.title, mainTopic.description], function(err, result){
        done();
        if(err){
          console.log('Error updating main topic', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    });
  }
});
//*****************************************//
//                                         //
//               SUB TOPICS                //
//                                         //
//*****************************************//

//**********************************************//
//        ADMIN UPDATE ACTIVE SUBTOPICS         //
//**********************************************//
router.put('/updateActiveSubTopics', function(req, res) {
  if(req.decodedToken.admin){
    var subtopic = {title: req.body.title, description: req.body.description, id: req.body.id};
      pool.connect( function (err, client, done) {
        client.query('UPDATE subtopics SET title = $1, description = $2 WHERE id=$3;',
        [subtopic.title, subtopic.description, subtopic.id], function(err, result){
        done();
        if(err){
          console.log('Error updating subtopic user', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    });
  }
});
//**********************************************//
//          DISPLAY UPCOMING SUBTOPICS          //
//**********************************************//
router.get('/findUpcomingSubTopics', function(req, res){
  if(req.decodedToken.admin){
    pool.connect( function (err, client, done) {
      client.query('SELECT * FROM subtopics WHERE upcoming = true ORDER BY id ASC LIMIT 5;',
      function(err, result){
        done();
        if(err){
          console.log('Error finding all upcoming subtopics', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    });
  }
});
//**********************************************//
//        ADMIN UPDATE UPCOMING SUBTOPICS       //
//**********************************************//
router.put('/updateUpcomingSubTopics', function(req, res) {
  if(req.decodedToken.admin){
    var subtopic = {title: req.body.title, description: req.body.description, id: req.body.id};
    pool.connect( function (err, client, done) {
      client.query('UPDATE subtopics SET title = $1, description = $2 WHERE id=$3;',
      [subtopic.title, subtopic.description, subtopic.id], function(err, result){
        done();
        if(err){
          console.log('Error updating upcoming subtopics user', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    });
  }
});
//**********************************************//
//       ADMIN ADD NEW UPCOMING SUBTOPIC        //
//**********************************************//
router.post('/addUpcomingSubTopics', function(req, res) {
  if(req.decodedToken.admin){
    var subtopic = {title: req.body.title, description: req.body.description};
    pool.connect( function (err, client, done) {
      client.query('SELECT id FROM main_topics WHERE upcoming = true;', function(err, result){
        done();
        if(err){
          console.log('Error updating upcoming subtopics user', err);
          res.sendStatus(500);
        } else {
          var upcomingMainTopicId = result.rows[0].id;
          client.query('INSERT INTO subtopics (title, description, upcoming, main_id) VALUES ($1, $2, true, $3);',
          [subtopic.title, subtopic.description, upcomingMainTopicId], function(err, result){
            done();
            if(err){
              console.log('Error updating upcoming subtopics user', err);
              res.sendStatus(500);
            } else {
              res.send(201);
            }
          });
        }
      });
    });
  }
});
//**********************************************//
//            SETS THE NEW TRIMESTER            //
//**********************************************//
router.put('/setNewTrimester', function(req, res) {
  // console.log('made it to the route. What now?');
  // console.log('token?', req.decodedToken.admin);
  if(req.decodedToken.admin){
    var subtopic = {title: req.body.title, description: req.body.description, id: req.body.id};
    pool.connect( function (err, client, done) {
      client.query('UPDATE main_topics SET active = false WHERE active = true;',
      function(err, result){
        done();
        if(err){
          console.log('Error step 1', err);
          res.sendStatus(500);
        } else {
          client.query('UPDATE main_topics SET active = true WHERE upcoming = true;',
          function (err, result){
            done();
            if (err){
              console.log('Error step 2')
            } else {
              client.query('UPDATE main_topics SET upcoming = false WHERE upcoming = true;',
              function (err, result){
                done();
                if (err){
                  console.log('Error step 3')
                } else {
                  client.query('UPDATE subtopics SET active = false WHERE active = true;',
                  function (err, result){
                    done();
                    if (err){
                      console.log('Error step 4')
                    } else {
                      client.query('UPDATE subtopics SET active = true WHERE upcoming = true;',
                      function (err, result){
                        done();
                        if (err){
                          console.log('Error step 5')
                        } else {
                          client.query('UPDATE subtopics SET upcoming = false WHERE upcoming = true;',
                          function (err, result){
                            done();
                            if (err){
                              console.log('Error step 6')
                            } else {
                              res.sendStatus(201);
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  }
});

module.exports = router;
