/// <reference path="../../typings/tsd.d.ts" />

import Timeline = require('../components/timeline/timeline.controller')

module Pathway {

    export class Main {
        constructor () {
            new Timeline.Main();
        }
    }
}

export = Pathway;