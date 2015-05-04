import Helpers = require('utils/helpers');
import Pathway = require('models/pathway')
import ResourceMapper = require('mappers/resource-mapper')

module PathwayMapper {
    export function mapResponseToPathway(data) : Pathway {
        return  {
            id: data.id,
            title: data.title,
            dateModified : new Date(data.dateModified),
            url : '/pathway/' + data.id,
            resources : (data.points) ? Helpers.tableToArray(data.points).map((x) => ResourceMapper.mapResponseToResource(x)) : []
        };
    }
}

export = PathwayMapper;