import app = require('app');

interface IScope {
    text : string
    placeholder : string
    results : any[]
    submit : () => void
    itemClick : () => void
}

export function SearchBar () {
    return {
        templateUrl: 'components/search-bar/search-bar.html',
        controller: SearchBarController,
        scope: {
            results: '=results',
            placeholder: '@?placeholder',
            search: '=?onSearch',
            itemClick: '=?onItemClick'
        }
    }
}

function SearchBarController ($scope : IScope) {
    $scope.text = '';
    $scope.placeholder = 'Search';
    $scope.results = [];
}

app.directive('searchBar', SearchBar);