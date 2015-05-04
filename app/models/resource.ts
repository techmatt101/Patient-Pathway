import MediaTypes = require('types/media-types');

interface Resource {
    id : number
    mediaType : MediaTypes
    mediaTypeName : string
    title : string
    dateCreated : Date
    notes? : string
    thumbnail? : string
}

export = Resource