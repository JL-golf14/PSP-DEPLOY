app.controller('FlagController', ['$firebaseAuth', '$http', '$location', 'DataFactory',"$routeParams", function($firebaseAuth, $http, $location, DataFactory,$routeParams){

  var self = this;
  self.flagToObject = $routeParams;
  var flagObject = {description:''};
  self.commentsToFlagObject = {list:[]};
  self.ideaToFlagObject = {list:[]};



  self.getCommentsToFlag = function(comment) {
    $http({
      method: 'GET',
      url: '/engagement/toFlagComments',
      headers:flagObject
    }).then(function(response) {
      self.commentsToFlagObject.list = response.data;
    });
  }//end of getComments()

  // self.getCommentsToFlag();

  // self.getIdeaToFlag = function(idea) {
  //   $http({
  //     method: 'GET',
  //     url: '/engagement/toFlagIdea',
  //     headers:flagObject
  //   }).then(function(response) {
  //     self.ideaToFlagObject.list = response.data;
  //   });
  // }//end of getComments()
  // self.getIdeaToFlag();
  self.flagClick = function(flagObject){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/engagement/flagReport',
        headers: {
          id_token: idToken
                },
          data:
          {flagObject,$routeParams}
        }).then(function(){
          swal({
          title: '<i>Your Input has been sent to our Administration for review</i>',
          type: 'info',
          showCloseButton: true,
          confirmButtonText:
          '<i>Thank You!</i>'
        });
          $location.path('/home');
        }).catch(function(error) {
          swal("Sorry, we couldn't process your request.", "Try Again!", "error");
          console.log('error authenticating', error);
        });
      });
    }//end of firebase.auth()
    //end of flagClick
  }]);
