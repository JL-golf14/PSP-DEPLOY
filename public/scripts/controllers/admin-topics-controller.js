app.controller('AdminTopicsController', ['$http', '$location', 'TopicsFactory', '$firebaseAuth', function($http, $location, TopicsFactory, $firebaseAuth){
  // var self = this;
  // var auth = $firebaseAuth();
  const self = this;
  const auth = $firebaseAuth();

  self.mainTopic = TopicsFactory.mainTopic;
  self.upcomingMainTopic = TopicsFactory.upcomingMainTopic;
  self.subTopic = TopicsFactory.subTopic;
  self.upcomingSubTopic = TopicsFactory.upcomingSubTopic;

  self.noUpcomingTopic = TopicsFactory.noUpcomingTopic;
  //Load all of the things.
  TopicsFactory.adminTopicInit();
  //On auth state change handles refreshes and login/logout
  auth.$onAuthStateChanged(function(firebaseUser) {
   if (firebaseUser) {
    //  console.log('we are still logged in!');
     self.email = firebaseUser.email;
     //Load all of the things.
     TopicsFactory.adminTopicInit();
   } else {
    //  console.log('boooo');
     // redirect home
     home();
     self.email = '';
   }
  });

  function homeView() {
    $location.path('/home');
  }//end of homeView()

  //********************************************//
  //         UPDATE CURRENT MAIN TOPIC          //
  //********************************************//

  self.updateTopic = function(title, description, id) {
    TopicsFactory.updateTopic(title, description, id);
  };

  //********************************************//
  //        UPDATE UPCOMING MAIN TOPIC          //
  //********************************************//

  self.updateUpcomingTopic = function(title, description, id) {
    TopicsFactory.updateUpcomingTopic(title, description, id);
  };

  self.addUpcomingTopic = function(title, description) {
    TopicsFactory.addUpcomingTopic(title, description);
  };

  //*********************************************//
  //           UPDATE CURRENT SUBTOPICS          //
  //*********************************************//

  self.updateSubTopic = function(title, description, id) {
    TopicsFactory.updateSubTopic(title, description, id);
  };
  //*********************************************//
  //           UPDATE UPCOMING SUBTOPICS         //
  //*********************************************//

  self.updateUpcomingSubTopic = function(title, description, id) {
    TopicsFactory.updateUpcomingSubTopic(title, description, id);
  };

  self.addUpcomingSubTopic = function(title, description) {
    TopicsFactory.addUpcomingSubTopic(title, description);
  };

  //********************************************//
  //             NEW TRIMESTER WIPE             //
  //********************************************//
  self.setNewTrimester = function(){
    TopicsFactory.setNewTrimester()
  }

  //*********************************************//
  //                CHANGE VIEWS                 //
  //*********************************************//
  self.update = true;

  self.updateView = function(){
    self.update = true;
  }

  self.newTriView = function(){
    self.update = false;
  }

}]);
