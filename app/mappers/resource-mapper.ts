import Resource = require('models/resource');
import MediaTypes = require('types/media-types');

module ResourceMapper {
    export function mapResponseToResource (data) : Resource {
        var resource : Resource = {
            id: data.id,
            title: data.title,
            url : data.url,
            mediaType: MediaTypes[<string>data.type.toUpperCase()],
            mediaTypeName: data.type.toLowerCase(),
            dateCreated: new Date(data.timestamp),
        };
        if(data.notes) resource.notes = data.notes;
        if(data.thumbnail) resource.thumbnail = data.thumbnail;

        return resource;
    }
}

export = ResourceMapper;