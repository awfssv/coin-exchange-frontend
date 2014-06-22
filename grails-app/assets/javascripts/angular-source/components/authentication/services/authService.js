//=require ../auth.module

'use strict';

angular.module('auth').factory('AuthService', ['$http', '$location', '$log', 'localStorageService',
  function ($http, $location, $log, localStorageService) {
    var _username = localStorageService.get('username') || '',
      _isLoggedIn = _username,
      _sessionLogoutTime,
      _errors = '';

    function logoutOnUI() {
      _isLoggedIn = false;
      _errors = '';
      localStorageService.remove('username');
    }

    return {
      login: function (username, password) {
        return $http.post('auth/login', {username: username, password: password})
          .success(function (response) {
            //@Todo: update username and session logout time
            _isLoggedIn = true;
            _username = username;
            _errors = '';
            localStorageService.set('username', _username);
            $location.path('/account');
          })
          .error(function (errorMessage) {
//            $log.error('something wrong with login');
            console.log(errorMessage);
            _errors = errorMessage;
          });
      },
      logout: function () {
        return $http.post('auth/logout')
          .success(function (response) {
            //@Todo: update username and session logout time
            logoutOnUI();
          })
          .error(function (error) {
            console.log(error);
          });
      },
      isLoggedIn: function () {
        return _isLoggedIn;
      },
      getUserName: function () {
        return _username;
      },
      getErrors: function () {
        return _errors;
      },
      logoutOnUI: function () {
        logoutOnUI();
      }
    }
  }]);