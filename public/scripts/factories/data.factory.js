app.factory('DataFactory', ['$http', '$firebaseAuth', '$routeParams', '$window', '$location', '$route', function($http, $firebaseAuth, $routeParams, $window, $location, $route){
  //must have variable for notyf
  var notyf = new Notyf();
  var auth = $firebaseAuth();

  var subtopicIdeas = { list : [] };
  var commentsObject = { list : [] };
  var userMatchObject = { list : [] };
  var allSubcommentsObject = { list : [] }
  var getIdeaIdObject = { list : [] }
  var getCommentIdObject = { list : [] }
  var userTally = {};
  var ideasTally = {};
  var commentsTally = {};
  var likesTally = {};
  var likes = {};
  var email = {};
  var mostLikedIdea = {list: []};
  var mostCommentedIdea = {list: []};
  var dbFilterObject = { list : [] }


  // //calls functions at startup
  // init();
  //
  // function init() {
  //   // getSubtopicIdeas();
  //   // getUserMatch();
  //   // getTallyInfo();
  //   // getSubTopics();
  //   getMostLikedIdea();
  //   // getMostCommentedIdea();
  // }

  function deactivateUser(userId) {
    swal({
      title: 'Deactivate User',
      text: "Are you sure you want to deactivate this user?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I\'m sure'
    }).then(function() {
      $http({
        method: 'PUT',
        url: '/admin/deactivateUser/' + userId
      }).then(function(response) {
        console.log('user marked as inactive');
        swal(
          'Success',
          'The user has been deactivated.',
          'success'
        )
        init()
      });
    })
    getSubtopicIdeas();
    getComments();
    // getUserMatch();
    getTallyInfo();
    getLikes();
  }


  //add new user to DB from login view button click
  function addNewUser(newUser){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/login/newUser',
        data: newUser,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        notyf.confirm('You are now a registered user!')
        self.newUser = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your address.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addNewUser()

  //add new idea to DB from button click from idea view
  function addNewIdea(newIdea){
    return firebase.auth().currentUser.getToken().then(function(idToken) {
      return $http({
        method: 'POST',
        url: '/engagement/newIdea',
        data: newIdea,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        console.log('response', response);
        getSubtopicIdeas()
        // return $window.location.reload();
        $route.reload();
        // self.newIdea = {};
      }).then(function(){
        return notyf.confirm('Your idea was added!')
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addNewUser()

  //adds ideas to subtopic views
  function getSubtopicIdeas(id) {
    $http({
      method: 'GET',
      url: '/public/subtopicIdeas',
      headers: {
        id : id
      }
    }).then(function(response) {
      subtopicIdeas.list = response.data;
      for (var i = 0; i < subtopicIdeas.list.length; i++) {
        if(subtopicIdeas.list[i].ideas_likes_count == null){
          subtopicIdeas.list[i].ideas_likes_count = 0;
        }
        if(subtopicIdeas.list[i].ideas_loves_count == null){
          subtopicIdeas.list[i].ideas_loves_count = 0;
        }
      }
    });
  }//end of getSubTopicIdeas()

  //adds flag/idea to DB
  function addFlag(subtopicIdeas){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/login/addFlag',
        data: subtopicIdeas,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        swal("flag Added To Database", "", "success");
        // self.subtopicIdeas = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of getSubTopicIdeas

  function addComment(newComment){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/engagement/addComment',
        data: newComment,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        notyf.confirm('Your comment was added!');
        self.addComment = {};
        $route.reload()
      }).catch(function(error) {
        swal("Values Are Incorrect", "Try Again!", "error");
        console.log('error', error);
      });
    });//end of firebase.auth()
  }//end of addComment()

  getTallyInfo();

  //function to display tallies on home page
  function getTallyInfo() {
    // console.log('inside of get tally?');
    $http({
      method: 'GET',
      url: '/public/userTally'
    }).then(function(response){
      userTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/public/ideasTally'
    }).then(function(response){
      ideasTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/public/commentsTally'
    }).then(function(response){
      commentsTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/public/likesTally'
    }).then(function(response){
      likesTally.count = response.data;
    });
  };//end of firebase.auth()

  //adds sub comment to DB
  function addNewSubComment(newSubComment){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/engagement/addNewSubComment',
        data: newSubComment,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        notyf.confirm('Your comment was added');
        self.newSubComment = {};
      }).catch(function(error) {
        swal("Values Are Incorrect", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addComment()

  //gets all subcomments for comments view
  function getAllSubcomments() {
    $http({
      method: 'GET',
      url: '/data/allSubcomments'
    }).then(function(response) {
      allSubcommentsObject.list = response.data;
    });
  }//end of getAllUsers()


  function getIdeaId(subtopicIdea) {
    $http({
      method: 'GET',
      url: '/data/getIdeaId',
      headers: subtopicIdea
    }).then(function(response) {
      getIdeaIdObject.list = response.data;
      console.log('getIdeaIdObject.list: ', getIdeaIdObject.list);
      for (var i = 0; i < getIdeaIdObject.list.length; i++) {
        if(getIdeaIdObject.list[i].ideas_likes_count == null){
          getIdeaIdObject.list[i].ideas_likes_count = 0;
        }
      }
    });

    $http({
      method: 'GET',
      url: '/data/getCommentId',
      headers: subtopicIdea
    }).then(function(response) {
      getCommentIdObject.list = response.data;
      for (var i = 0; i < getCommentIdObject.list.length; i++) {
        if(getCommentIdObject.list[i].comments_likes_count == null){
          getCommentIdObject.list[i].comments_likes_count = 0;
        }
      }
    });
  }

  //gets comments to display on comments page
  function getComments(ideaId) {
    $http({
      method: 'GET',
      url: '/data/getComments',
      headers: ideaId
    }).then(function(response) {
      commentsObject.list = response.data;
      for (var i = 0; i < commentsObject.list.length; i++) {
        if(commentsObject.list[i].comments_likes_count == null){
          commentsObject.list[i].comments_likes_count = 0;
        }
      }
    })
  }


  function checkUserStatus(){
    return firebase.auth().currentUser.getToken().then(function(idToken) {
      var firebaseUser = auth.$getAuth();
      return $http({
        method: 'GET',
        url: '/login/checkUserStatus',
        headers: {
          id_token: idToken,
          user_email: firebaseUser.email,
        }
      }).then(function(response){
        return response;
      });
    });
  };

  //function to add idea "like" to database
  function addIdeaLike(ideaId, subtopicId){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'PUT',
        url: '/engagement/addIdeaLike/' + ideaId,
        headers: {
          id_token: idToken
        }
      }).then(function(response) {
        getSubtopicIdeas(subtopicId);
        getMostLikedIdea();
      });
    });
  }

  //function to add idea "love" to database
  function addIdeaLove(ideaId, subtopicId){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'PUT',
        url: '/engagement/addIdeaLove/' + ideaId,
        headers: {
          id_token: idToken
        }
      }).then(function(response) {
        getSubtopicIdeas(subtopicId);
        getMostLikedIdea();
      });
    });
  }

  //function to add comment "like" to database
  function addCommentLike(commentId, ideaId){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'PUT',
        url: '/engagement/addCommentLike/' + commentId,
        headers: {
          id_token: idToken
        }
      }).then(function(response) {
        getComments({id: ideaId});
      });
    });
  }

  function getMostLikedIdea(){
    $http({
      method: 'GET',
      url: '/public/getMostLikedIdea',
    }).then(function(response) {
      mostLikedIdea.list = response.data;
      for (var i = 0; i < mostLikedIdea.list.length; i++) {
        if(mostLikedIdea.list[i].ideas_likes_count == null){
          mostLikedIdea.list[i].ideas_likes_count = 0;
        }
        if(mostLikedIdea.list[i].ideas_loves_count == null){
          mostLikedIdea.list[i].ideas_loves_count = 0;
        }
      }
    });
  }

//DB request for filter object from admin-reports view
  function getFilteredResult(filterObject){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method:'POST',
        url: '/admin/getFilteredResult',
        data: filterObject,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        dbFilterObject.list = response.data;
      });
    });//end of firebase.auth()
  }//end of getFilteredResult()



  return {
    userTally: userTally,
    ideasTally: ideasTally,
    commentsTally: commentsTally,
    likesTally: likesTally,
    likes: likes,
    addIdeaLike: addIdeaLike,
    addIdeaLove: addIdeaLove,
    getComments: getComments,
    addCommentLike: addCommentLike,
    mostLikedIdea: mostLikedIdea,
    getMostLikedIdea: getMostLikedIdea,
    //new user object from add address button click
    addNewUser : addNewUser,
    //new idea object from idea button click
    addNewIdea : addNewIdea,
    //adds ideas to subtopic1 view
    subtopicIdeas : subtopicIdeas,
    //adds comment to DB
    addComment : addComment,
    //gets comments to comment view
    commentsObject : commentsObject,
    // allUsers: allUsers,
    deactivateUser: deactivateUser,
    //all existing users object
    userMatchObject : userMatchObject,
    //adds sub-comments to DB
    addNewSubComment : addNewSubComment,
    //adds sub-comments to view
    allSubcommentsObject : allSubcommentsObject,
    //gets specific idea id from DB
    getIdeaId : getIdeaId,
    //current subtopic ideas
    getSubtopicIdeas : getSubtopicIdeas,
    //specifid idea from DB for comment view
    getIdeaIdObject : getIdeaIdObject,
    //specified comments from DB for comment view
    getCommentIdObject : getCommentIdObject,
    //checks to see if the user exists in the database
    checkUserStatus: checkUserStatus,
    //gets email
    email: email,
    //gets all subcomments
    getAllSubcomments : getAllSubcomments,
    //sends filter results to db
    getFilteredResult : getFilteredResult,
    //results form DB for admin-reports view
    dbFilterObject : dbFilterObject
  }

}]); // end of app.factory
