var pool = require('../modules/database-config');
var express = require('express');
var router = express.Router();
// var pool = require('../modules/database-config');
var pg = require('pg');
// var connectionString = require('../modules/database-config');
var config = {
  database: 'psp_database',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};//end of config

//pool / pg constructor function
var pool = new pg.Pool(config);

//gets all users name and id for idea and comment view
router.get('/getUserNameId', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT id, name FROM users")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets all subtopics for add idea view
router.get('/getSubTopics', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM subtopics")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets all users to compare at login view if in the system
router.get('/getUserMatch', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT id, email FROM users")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

router.get('/comments', function(req, res){
  var userEmail = req.decodedToken.email;
  pool.connect(function (err, client, done) {
    client.query('SELECT * FROM comments JOIN ideas ON ideas.id=comments.idea_id WHERE email=$1 AND comments.active = true;', [userEmail], function(err, result){
      done();
      if(err){
        ('Error completing get comments on page load query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
        console.log(result.rows[0]);
      }
    });
  });
});

//gets all coments for comment view
router.get('/allComments', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM comments where comments.active = true;")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

router.get('/idea', function(req, res) {
  var userEmail = req.decodedToken.email;
  pool.connect(function (err, client, done) {
    client.query('SELECT * FROM idea;', [userEmail], function(err, result){
      done();
      if(err){
        ('Error completing get causes on page load query', err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

//gets all sub-coments for comment view
router.get('/allSubcomments', function(req, res) {
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM subcomments")
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets specific idea by id for comment view
router.get('/getIdeaId', function(req, res) {
  var subtopicIdea = req.headers;
  pool.connect()
    .then(function (client) {
      client.query('WITH ideas_likes_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_likes_count FROM ideas_likes JOIN ideas ON ideas_likes.idea_id=ideas.id GROUP BY ideas.id), ' +
      'ideas_loves_count_temp_table AS (SELECT ideas.id AS idea_id, COUNT(ideas.id) AS ideas_loves_count FROM ideas_loves JOIN ideas ON ideas_loves.idea_id=ideas.id GROUP BY ideas.id) ' +
      'SELECT ideas.title, ideas.description, ideas.subtopics_id, ideas.user_id, ideas.id AS idea_id, users.name, users.email, users.address,users.ward, users.admin, users.active, users.photo, ideas_likes_count, ideas_loves_count, subtopics.active AS subtopics_active FROM ideas ' +
      'LEFT OUTER JOIN users ON ideas.user_id=users.id ' +
      'LEFT JOIN ideas_likes_count_temp_table ON ideas_likes_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN ideas_loves_count_temp_table ON ideas_loves_count_temp_table.idea_id=ideas.id ' +
      'LEFT JOIN subtopics ON subtopics.id=ideas.subtopics_id ' +
      'WHERE ideas.id=$1 AND subtopics.active=true AND users.active=true;', [subtopicIdea.id])
        .then(function (result) {
          client.release();
          res.send(result.rows);
          console.log(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets specific comment by id for comment view (subtopic id)
router.get('/getCommentId', function(req, res) {
  var subtopicIdea = req.headers;
  pool.connect()
    .then(function (client) {
      client.query("SELECT * FROM comments FULL OUTER JOIN users ON user_id = users.id WHERE idea_id=$1 AND comments.active = true", [subtopicIdea.id])
        .then(function (result) {
          client.release();
          res.send(result.rows);
        })
        .catch(function (err) {
          console.log('error on SELECT', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get

//gets specific comment by id for comment view (subtopic id)
router.get('/getComments', function(req, res) {
  var ideaId = req.headers;
  console.log('zooop', ideaId);
  pool.connect()
    .then(function (client) {
      client.query('WITH comments_likes_count_temp_table AS (SELECT comments.id AS comment_id, COUNT(comments.id) AS comments_likes_count FROM comments_likes JOIN comments ON comments_likes.comment_id=comments.id GROUP BY comments.id) SELECT comments.id AS comments_id, comments.description, comments.idea_id AS comments_idea_id, comments_likes.id AS comments_likes_id, comments_likes.user_id, comments_likes.comment_id, comments_likes_count, users.active AS user_active, users.photo, users.name, users.ward, users.id FROM comments LEFT OUTER JOIN comments_likes ON comments_likes.id=comments.id LEFT JOIN comments_likes_count_temp_table ON comments_likes_count_temp_table.comment_id=comments.id FULL OUTER JOIN users ON comments.user_id = users.id WHERE  comments.active = true and users.active=true AND comments.idea_id=$1;',
      [ideaId.id])
        .then(function (result) {
          client.release();
          res.send(result.rows);
          console.log('zippy', result.rows);
        })
        .catch(function (err) {
          console.log('error on get comments', err);
          res.sendStatus(500);
        });
    });//end of .then
});//end of router.get



module.exports = router;
