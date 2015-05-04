import Helpers = require('utils/helpers');
import User = require('models/user');
import PathwayMapper = require('mappers/pathway-mapper');

module UserMapper {
    export function mapResponseToUser(data) : User {
        return  {
            id: data.id,
            name: data.name,
            email: data.email,
            permissionLevel: data.permissionLevel || 0,
            pathways: (data.pathways) ? Helpers.tableToArray(data.pathways).map((x) => PathwayMapper.mapResponseToPathway(x)) : []
        };
    }
}

export = UserMapper;