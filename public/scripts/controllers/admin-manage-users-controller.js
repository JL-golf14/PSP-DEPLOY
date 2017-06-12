
app.controller('AdminManageUsersController', ['$http', '$location', 'AdminFactory', '$firebaseAuth', function($http, $location, AdminFactory, $firebaseAuth){

  var self = this;
  var auth = $firebaseAuth();

  auth.$onAuthStateChanged(function(firebaseUser) {
   if (firebaseUser) {
     self.email = firebaseUser.email;
     // go reload idea data....
     AdminFactory.init();
   } else {
     // redirect
     self.email = '';
    //  self.logout();
   }
  });

  self.allUsers = AdminFactory.allUsers;
  self.filterList = AdminFactory.filterList;
  self.searchUsers = AdminFactory.searchUsers;
  self.userFilter = AdminFactory.userFilter;
  self.userResults = AdminFactory.userResults;

  self.deactivateUser = function(userId) {
    AdminFactory.deactivateUser(userId);
  };

  self.reactivateUser = function(userId) {
    AdminFactory.reactivateUser(userId);
  };

}]); //end of controller
