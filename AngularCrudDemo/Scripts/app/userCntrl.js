




app.controller('userCtrl', ['$scope', 'CrudService',
    function ($scope, CrudService) {
        $scope.Message = 'Hello World';
        var baseUrl = "http://localhost:54059/api/";
        $scope.UserId = 0;
        $scope.data = {
            UserId: $scope.UserId,
            FName: $scope.FName,
            Address: $scope.Address,
            Age: $scope.Age
        };

        //GetUsers
        $scope.GetUsers = function () {
            var apiRoute = baseUrl + "users";
            var user = CrudService.getAll(apiRoute);
            user.then(function (response) {
                $scope.users = response.data;
            },
                function (error) {
                    console.log("error");
                })
        }
        $scope.GetUsers();
        //GetOneUser
        $scope.GetUserByID = function (dataModel) {
           
            var apiRoute = baseUrl + 'users'
            var oneUser = CrudService.getbyID(apiRoute, dataModel.UserId);
            oneUser.then(function (response) {
                $scope.UserId = response.data.UserId;
                $scope.FName = response.data.FName;
                $scope.Address = response.data.Address;
                $scope.Age = response.data.Age;
                $scope.btnText = "Update";

            })
        }
        //AddUser
        $scope.btnText = "Save";
        $scope.SaveUpdate = function () {
            var user = {
                FName: $scope.FName,              
                Address: $scope.Address,
                Age: $scope.Age
            }
            if ($scope.btnText === "Save") {
                var apiRoute = baseUrl + "users";
                var saveUser = CrudService.postUser(apiRoute, user);
                saveUser.then(function (response) {
                    if (response.data !== "") {
                        alert("Data Save Successfully");
                        $scope.Clear();
                        $scope.GetUsers();

                    } else {
                        alert("Some error");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                    });
                $scope.GetUsers();
            }
            else {
                var apiRoute = baseUrl + "users";
                var updateUser = CrudService.EditUser(apiRoute, user);
                updateUser.then(function (response) {
                    if (response.data !== "") {
                        alert("Data Updated Successfully");
                        $scope.Clear();
                        $scope.GetUsers();

                    } else {
                        alert("Some error");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
        }

        $scope.Clear = function () {
            $scope.FName = "";           
            $scope.Address = "";
            $scope.Age = "";
        }

        $scope.DeleteUser = function (user) {

            var apiRoute = baseUrl + "users/" + user.UserId;
            var deletedUser = CrudService.delete(apiRoute);

            deletedUser.then(function (response) {
                if (response.data !== "") {
                    alert("Data Delete Successfully");
                    $scope.Clear();
                    $scope.GetUsers()

                } else {
                    alert("Some error");
                }
            }, function (error) {
                console.log("Error: " + error);
            })
        }

    }]);

