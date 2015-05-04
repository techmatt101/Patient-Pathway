import Media = require('models/Media');
import MediaTypes = require('types/media-types');
import SearchBar = require('components/search-bar/search-bar');

module MediaMapper {
    export function mapResponseToMedia(data) : Media {
        return {
            id: data.id,
            type: MediaTypes[<string>data.type.toUpperCase()],
            typeName: data.type.toLowerCase(),
            title: data.title,
            description: data.description,
            tags: data.tags
        }
    }

    export function mapMediaToSearchItem(media : Media) : SearchBar.IItem {
        return {
            id: media.id,
            name: media.title,
            icon: media.typeName
        }
    }
}

export = MediaMapper;