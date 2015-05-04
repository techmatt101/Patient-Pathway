import MediaTypes = require('types/media-types');

interface Media {
    id : number
    type : MediaTypes
    typeName : string
    title : string
    description : string
    tags : string[]
}

export = Media