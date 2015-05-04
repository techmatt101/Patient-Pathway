import MediaTypes = require('types/media-types');

interface Resource {
    id : number
    title : string
    url : string
    mediaType : MediaTypes
    mediaTypeName : string
    dateCreated : Date
    notes? : string
    thumbnail? : string
}

export = Resource