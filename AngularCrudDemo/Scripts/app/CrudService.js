
app.service('CrudService', function ($http) {

    //GetAllUSers
    this.getAll = function (apiRoute) {
        urlGet = apiRoute;
        return $http.get(urlGet);
    }

    //GetOneUser
    this.getbyID = function (apiRoute, UserId) {

        urlGet = apiRoute + '/' + UserId;
        return $http.get(urlGet);
    }

    //PostUser
    this.postUser = function (apiRoute, Model) {
        var request = $http({
            method: "post",
            url: apiRoute,
            data: Model
        });
        return request;
    }

    //UpdateUser
    this.EditUser = function (apiRoute, Model) {
        var request = $http({
            method: "put",
            url: apiRoute,
            data: Model
        });
        return request;
    }

    //DeleteUser
    this.delete = function (apiRoute) {
        var request = $http({
            method: "delete",
            url: apiRoute
        });
        return request;
    }

    
})
