
app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', '$routeParams', '$route', '$window', function($firebaseAuth, $http, $location, DataFactory, $routeParams, $route, $window){

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  var subtopicIdea = $routeParams;

  //come form DB
  self.getIdeaIdObject = DataFactory.getIdeaIdObject;
  self.getCommentIdObject = DataFactory.getCommentIdObject;
  self.commentsObject = DataFactory.commentsObject;
  self.addCommentLike = DataFactory.addCommentLike;
  self.allSubcommentsObject = DataFactory.allSubcommentsObject;


  self.addIdeaLike = function(ideaId, subTopicId){
    if (firebaseUser === null){
      swal("Please login to engage with the community.", "Try Again!", "error");
    }
    DataFactory.addIdeaLike(ideaId, subTopicId);
  }

  self.addIdeaLove = function(ideaId, subTopicId){
    if (firebaseUser === null){
      swal("Please login to engage with the community.", "Try Again!", "error");
    }
    DataFactory.addIdeaLove(ideaId, subTopicId);
  }


  DataFactory.getAllSubcomments();
  DataFactory.getComments(subtopicIdea);
  DataFactory.getIdeaId(subtopicIdea);


  //*****************************************//
  //            COMMENT CREATION             //
  //*****************************************//
  //adds new comment to DB (need to add firebase id into the line below)
  self.addComment = function(comment) {
    //checks to see if user in logged in
    if (firebaseUser === null){
      swal("Please login to engage with the community.", "Try Again!", "error");
    }

    var newComment = {
      description : comment.description,
      idea_id : subtopicIdea.id
    }

    //sents comment from view to DB
    DataFactory.addComment(newComment);
    //reloads entire page after comment submission
    $window.location.reload();

    // empties inputs after submission
    self.comment = {};

  }//end of self.addComment()

  //*****************************************//
  //           SUBCOMMENT CREATION           //
  //*****************************************//
  //shows and hides sun-comment text area
  self.showComment = false;
  self.showCommentArea = function(comments){
    self.showComment = true;
  }

  //button click to add new sub-comment (need to add firebase id into the line below)
  self.addNewSubComment = function(subComment){
    var firebaseUser = auth.$getAuth();
    var userMatchObject = DataFactory.userMatchObject.list;
    //container to loop id's through
    var id = "";
    //loops through all users email to find correct id
    for (var i = 0; i < userMatchObject.length; i++) {
      if (userMatchObject[i].email == firebaseUser.email) {
        var id = userMatchObject[i].id;
      }//end of if
    };//end of for loop

    var newSubComment = {
      description : subComment.description,
      comment_id : "257",//this is where im stuck
      user_id : id
    }

    DataFactory.addNewSubComment(newSubComment);
    //empties sub-comment text area on submit
    self.subComment = {};
    $window.location.reload();
  }//end of addNewSubComment()

  //redirect to add idea view
  self.flagIdea = function() {
    $location.path('/flag');
  }
  self.flagIdeaClick = function (subtopicIdeas){
    // console.log("this is subtopicIdeas on flag IDEA click",subtopicIdeas);

    $routeParams.idea_id = subtopicIdeas.idea_id;
    $routeParams.user_id = subtopicIdeas.user_id;
    $location.path('flag/'+$routeParams.idea_id+'/'+$routeParams.user_id);
  };//end of flagCommentClick

  self.flagCommentClick = function (comments){
    $routeParams.id = comments.comments_id;
    $routeParams.idea_id = comments.comments_idea_id;
    $routeParams.user_id = comments.id;
    $location.path('flag/'+$routeParams.id+'/'+$routeParams.idea_id+'/'+$routeParams.user_id);
  };//end of flagCommentClick

}]);//end of app.controller()
