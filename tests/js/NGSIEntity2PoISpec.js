/*
 * Copyright (c) 2018 Future Internet Consulting and Development Solutions S.L.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* globals MashupPlatform, MockMP, beforeAll, afterAll, beforeEach, processData */

(function () {

    "use strict";

    describe("NGSI Source operator should", function () {

        var operator, abort_mock, entity_pages, entity_page_i;

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'operator',
                prefs: {
                    'coordinates_attr': '',
                    'ngsi_entities': ''
                },
                inputs: ['poiOutput'],
                outputs: ['poiOutput']
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
        });

        it("handles entities simple string entities", () => {
            processData("{}");
        });

        it("handles entities simple object entities", () => {
            processData({});
        });

        it("handles string entity lists", () => {
            processData("[{}]");
        });

        it("handles object entity lists", () => {
            processData([{}]);
        });

    });

})();
