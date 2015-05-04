import Resource = require('models/resource')

interface Pathway {
    id : number
    title : string
    dateModified : Date
    url : string
    resources : Resource[]
}

export = Pathway