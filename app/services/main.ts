angular.module('PatientPathway').service('MyService', ($http) => {
    var myData = null;

    var promise = $http.get('data.json').success((data) => myData = data);

    return {
        promise:promise,
        setData: (data) => {
            myData = data;
        },
        doStuff: () => {
            return myData;//.getSomeData();
        }
    };
});