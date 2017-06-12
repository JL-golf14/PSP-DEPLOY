
app.factory('AdminFactory', ['$http','$route', '$firebaseAuth', function($http,$route, $firebaseAuth){

  var allUsers = {list: []};
  var filterList = {list: []};
  var userFilter = {};
  var userResults = {list: []};
  var ideaToFlagObject = {list: []};
  var commentToFlagObject = {list: []};
  var userLoves = {list: []};

  // init(); //run

  getUserLoves();

  //startup functions
  function init() {
    getUsers();
    filterUsers();
  }

  //function to display user list on manage users admin view
  function getUsers() {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        $http({
        method: 'GET',
        url: '/admin/manageUsers',
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        allUsers.list = response.data;
        console.log(allUsers.list);
        for (var i = 0; i < allUsers.list.length; i++) {
          if(allUsers.list[i].ideas_flags_count == null){
            allUsers.list[i].ideas_flags_count = 0;
          }
          if(allUsers.list[i].comments_flags_count == null){
            allUsers.list[i].comments_flags_count = 0;
          }
          if(allUsers.list[i].subflags_count == null){
            allUsers.list[i].subflags_count = 0;
          }
        }
      })
    });
  }
}

  //function to deactivate user profile
  function deactivateUser(userId) {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
      if(firebaseUser){
        firebase.auth().currentUser.getToken().then(function(idToken) {
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
              url: '/admin/deactivateUser/' + userId,
              headers: {
                id_token: idToken
              }
            }).then(function(response) {
              console.log('user marked as inactive');
              init();
            });
          })
        });
      }
  }

  //function to reactivate user profile
  function reactivateUser(userId) {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
      if(firebaseUser){
        firebase.auth().currentUser.getToken().then(function(idToken) {
          swal({
            title: 'Reactivate User',
            text: "Are you sure you want to reactivate this user?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I\'m sure'
          }).then(function() {
            $http({
              method: 'PUT',
              url: '/admin/reactivateUser/' + userId,
              headers: {
                id_token: idToken
              }
            }).then(function(response) {
              console.log('user marked as active');
              init();
            });
          })
        });
      }
  }

  //function to filter user search on admin manage users view
  function filterUsers() {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
      if(firebaseUser){
        firebase.auth().currentUser.getToken().then(function(idToken) {
          $http({
            method: 'GET',
            url: '/admin/filterUsers',
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            filterList.list = response.data;
            console.log('filterList', filterList.list);
          })
        });
      }
  }

  //function to search users on admin manage users view
  function searchUsers() {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
      if(firebaseUser){
        firebase.auth().currentUser.getToken().then(function(idToken) {
          $http({
            method: 'GET',
            url: '/admin/searchUsers',
            headers: {
              id_token: idToken,
              searchString: userFilter.searchString,
              filter: userFilter.filter.filter
            }
          }).then(function(response){
            allUsers.list = response.data;
            console.log(allUsers.list);
            for (var i = 0; i < allUsers.list.length; i++) {
              if(allUsers.list[i].ideas_flags_count == null){
                allUsers.list[i].ideas_flags_count = 0;
              }
              if(allUsers.list[i].comments_flags_count == null){
                allUsers.list[i].comments_flags_count = 0;
              }
              if(allUsers.list[i].subflags_count == null){
                allUsers.list[i].subflags_count = 0;
              }
            }
          })
        });
      }
  }

  // getAllFlaggedItems();

  function getAllFlaggedComments() {
  console.log("gets all flags for comments");
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  if(firebaseUser){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'GET',
        url: '/admin/allCommentFlags',
        headers: {
          id_token: idToken
        }
        // headers:flagObject
      }).then(function(response) {
        commentToFlagObject.list = response.data;
        console.log("this is the response from get all flags",response.data);
      });
    });
  }
}//end of getComments()

function getAllFlaggedIdeas() {
console.log("gets all flags for ideas");
var auth = $firebaseAuth();
var firebaseUser = auth.$getAuth();
if(firebaseUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'GET',
      url: '/admin/allIdeaFlags',
      headers: {
        id_token: idToken
      }
      // headers:flagObject
    }).then(function(response) {
      ideaToFlagObject.list = response.data;
      console.log("this is the response from get all flags",response.data);
    });
  });
}
}//end of getComments()

function deleteFlaggedComment(flag) {
console.log("gets all flags", flag);
var auth = $firebaseAuth();
var firebaseUser = auth.$getAuth();
if(firebaseUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'PUT',
      url: '/admin/deleteFlaggedComment/' + flag.comment_id,
      headers: {
        id_token: idToken,
      }
    }).then(function(response) {
  getAllFlaggedComments();
    });
  });
}
}//end of getComments()

function deleteFlaggedIdeaFlag(flag) {
console.log("gets all flags", flag);
var auth = $firebaseAuth();
var firebaseUser = auth.$getAuth();
if(firebaseUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'PUT',
      url: '/admin/deleteFlaggedIdeaFlag/' + flag.idea_id,
      headers: {
        id_token: idToken,
      }
    }).then(function(response) {
    getAllFlaggedIdeas()
    });
  });
}
}//end of getIdeaFlags()



function deleteIdea(flag) {
var auth = $firebaseAuth();
var firebaseUser = auth.$getAuth();
if(firebaseUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'PUT',
      url: '/admin/deleteIdea/' + flag.idea_id,
      headers: {
        id_token: idToken,
      }
    }).then(function(response) {
      getAllFlaggedIdeas();
    });
  });
}
}//end of idea()

function deleteComment(flag) {
var auth = $firebaseAuth();
var firebaseUser = auth.$getAuth();
if(firebaseUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'PUT',
      url: '/admin/deleteComment/' + flag.comment_id,
      headers: {
        id_token: idToken,
      }
    }).then(function(response) {
      getAllFlaggedComments();
    });
  });
}
}//end of getComments()

function updateFlaggedComment(flag) {
var auth = $firebaseAuth();
var firebaseUser = auth.$getAuth();
if(firebaseUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'PUT',
      url: '/admin/updateComment/' + flag.comment_id,
      headers: {
        id_token: idToken,
      },
      data:flag
    }).then(function(response) {
      getAllFlaggedComments();
    });
  });
}
}//end of updateComments()

function updateFlaggedIdea(flag) {
var auth = $firebaseAuth();
console.log(flag);
var firebaseUser = auth.$getAuth();
console.log(firebaseUser);
if(firebaseUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'PUT',
      url: '/admin/updateIdea/' + flag.idea_id,
      headers: {
        id_token: idToken,
      },
      data:flag
    }).then(function(response) {
      getAllFlaggedIdeas();
    });
  });
}
}//end of updateIdea()

//function to display list of users who loved an idea
function getUserLoves() {
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        $http({
          method: 'GET',
          url: '/admin/getUserLoves',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          userLoves.list = response.data;
        })
      });
    }
} //end of get user loves function

  return {
    allUsers: allUsers,
    updateFlaggedComment:updateFlaggedComment,
    updateFlaggedIdea:updateFlaggedIdea,
    deactivateUser: deactivateUser,
    reactivateUser: reactivateUser,
    filterList: filterList,
    searchUsers: searchUsers,
    deleteFlaggedIdeaFlag:deleteFlaggedIdeaFlag,
    userFilter: userFilter,
    userResults: userResults,
    deleteIdea:deleteIdea,
    init: init,
    deleteComment:deleteComment,
    getAllFlaggedComments: getAllFlaggedComments,
    getAllFlaggedIdeas: getAllFlaggedIdeas,
    ideaToFlagObject: ideaToFlagObject,
    commentToFlagObject: commentToFlagObject,
    deleteFlaggedComment: deleteFlaggedComment,
    userLoves: userLoves,
    getUserLoves: getUserLoves
  }

}]); // end of app.factory
