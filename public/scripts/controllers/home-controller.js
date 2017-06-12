
app.controller('HomeController', ['DataFactory', 'TopicsFactory', '$firebaseAuth','$routeParams', '$http', '$location', function(DataFactory, TopicsFactory, $firebaseAuth, $routeParams, $http, $location){
  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  var notyf = new Notyf();

  //populates the main topic area
  self.mainTopic = TopicsFactory.mainTopic;
  //populates select option with subtopics
  self.subTopic = TopicsFactory.subTopic;
  //populates tally fields
  self.userTally = DataFactory.userTally;
  self.ideasTally = DataFactory.ideasTally;
  self.commentsTally = DataFactory.commentsTally;
  self.likesTally = DataFactory.likesTally;
  self.mostLikedIdea = DataFactory.mostLikedIdea;

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

  TopicsFactory.findActiveTopic();
  DataFactory.getMostLikedIdea();

  /* ============================================================================= *
  *               ADD NEW IDEA                                                     *
  * ============================================================================= */
  -->
  self.addNewIdea = function(idea) {
    //sources firebaseUser in the function
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    var notyf = new Notyf();

    if (firebaseUser === null){
      swal("Please login to engage with the community.", "Try Again!", "error");
    }
    //name and email is added to the idea object
    if(idea.subtopicId) {

      var newIdea = {
        name : firebaseUser.displayName,
        email : firebaseUser.email,
        subtopicId : idea.subtopicId,
        title : idea.title,
        description : idea.description
      }
      //sents the idea object to factory
      DataFactory.addNewIdea(newIdea)
      //redirects the user to the subtopic they chose from the dropdown
      redirectToSubtopic(newIdea);
      //empties inputs on submit
      self.idea = {};
    } else {
      notyf.alert('Please select a subtopic from the dropdown.');
    }
  }//end of self.createIdea()

  function getIdeas(index){
    DataFactory.getSubtopicIdeas(index);
  }
  <!--
  /* ============================================================================= *
  *                  REDIRECTS                                                     *
  * ============================================================================= */
  -->
  function redirectToSubtopic(url) {
    $location.path('/subtopics/' + url.subtopicId);
    DataFactory.getSubtopicIdeas(self.index);
  }

  function homeView() {
    $location.path('/home');
  }//end of homeView()

  self.redirectLogin = function () {
    $location.url('/login');
  }//end of redirectLogin()
  self.moreComments = function(subtopicIdea) {
    $location.path('/comment/' + subtopicIdea.idea_id);

  }
  //redirect to add idea view
  self.createIdea = function() {
    //redirect after submission
    $location.url('/idea');
  }//end of self.createIdea
  self.flagIdeaClick = function (subtopicIdeas){
    // console.log("this is subtopicIdeas on flag IDEA click",subtopicIdeas);

    $routeParams.idea_id = subtopicIdeas.idea_id;
    $routeParams.user_id = subtopicIdeas.user_id;
      $location.path('flag/'+$routeParams.idea_id+'/'+$routeParams.user_id);
  };//end of flagCommentClick

}]);//end of app.controller()
