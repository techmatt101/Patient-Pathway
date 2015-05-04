import app = require('app');

interface IScope extends ng.IScope {
    text : string
    placeholder : string
    results : IItem[]
    submit : () => void
    itemClick : () => void
    showDropdown : boolean
}

export interface IItem {
    id : number
    name : string
    icon : string
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