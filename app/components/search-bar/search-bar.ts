import app = require('app');

interface IScope {
    text : string
    search : (text : string) => void
    dropdown : any[]
}

export function SearchBar () {
    return {
        templateUrl: 'components/search-bar/search-bar.html',
        controller: SearchBarController,
        scope: {
            dropdown: '=dropdown',
            search: '=search'
        }
    }
}

function SearchBarController ($scope) {
    $scope.text = '';
}

app.directive('searchBar', SearchBar);