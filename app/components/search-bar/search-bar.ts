import app = require('app');

interface IScope {
    text : string
    placeholder : string
    results : any[]
    submit : () => void
    itemClick : () => void
    showDropdown : boolean
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
    $scope.showDropdown = false;
    $scope.text = '';
    $scope.placeholder = 'Search';
}

app.directive('searchBar', SearchBar);