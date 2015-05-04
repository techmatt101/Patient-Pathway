import Pathway = require('models/pathway');
import Permissions = require('types/permissions');

interface User {
    id : number
    name : string
    email : string
    permissionLevel : Permissions
    pathways? : Pathway[]
}

export = User