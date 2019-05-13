/*
 * Copyright (c) 2018-2019 Future Internet Consulting and Development Solutions S.L.
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

/* globals MashupPlatform, MockMP, beforeAll, afterAll, beforeEach, entity2poi, processData, processEntity */

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

        it("throws an Endpoint Value error if data is not valid JSON data", () => {
            expect(function () {
                processData("{a}");
            }).toThrowError(MashupPlatform.wiring.EndpointTypeError);
        });

        it("throws an Endpoint Type error if data is not a JSON object", () => {
            expect(function () {
                processData("5");
            }).toThrowError(MashupPlatform.wiring.EndpointTypeError);
        });

        it("throws an Endpoint Type error if data is not an object", () => {
            expect(function () {
                processData(5);
            }).toThrowError(MashupPlatform.wiring.EndpointTypeError);
        });

        it("handles entities simple string entities", () => {
            spyOn(window, 'processEntity');

            processData("{}");

            expect(processEntity).toHaveBeenCalledWith({}, 0, [{}]);
        });

        it("handles entities simple object entities", () => {
            spyOn(window, 'processEntity');

            processData({});

            expect(processEntity).toHaveBeenCalledWith({}, 0, [{}]);
        });

        it("handles string entity lists", () => {
            spyOn(window, 'processEntity');

            processData("[{}]");

            expect(processEntity).toHaveBeenCalledWith({}, 0, [{}]);
        });

        it("handles object entity lists", () => {
            spyOn(window, 'processEntity');

            processData([{}]);

            expect(processEntity).toHaveBeenCalledWith({}, 0, [{}]);
        });

        it("support comma separated coordinates", () => {
            spyOn(window, 'entity2poi');
            MashupPlatform.prefs.set('coordinates_attr', 'location');

            let entity = {location: "0, 1"};
            processEntity(entity);

            expect(entity2poi).toHaveBeenCalledWith(entity, [0, 1], null);
        });

        it("support comma separated coordinates (missing longitude)", () => {
            spyOn(window, 'entity2poi');
            MashupPlatform.prefs.set('coordinates_attr', 'location');

            let entity = {location: "0"};
            processEntity(entity);

            expect(entity2poi).not.toHaveBeenCalled();
        });

        it("support coordinates splitted into two attributes", () => {
            spyOn(window, 'entity2poi');
            MashupPlatform.prefs.set('coordinates_attr', 'latitude, longitude');

            let entity = {latitude: 0, longitude: 1};
            processEntity(entity);

            expect(entity2poi).toHaveBeenCalledWith(entity, [0, 1], null);
        });

        it("support coordinates splitted into two attributes (missing latitude)", () => {
            spyOn(window, 'entity2poi');
            MashupPlatform.prefs.set('coordinates_attr', 'latitude, longitude');

            processEntity({longitude: 0});

            expect(entity2poi).not.toHaveBeenCalled();
        });

        it("support coordinates splitted into two attributes (missing longitude)", () => {
            spyOn(window, 'entity2poi');
            MashupPlatform.prefs.set('coordinates_attr', 'latitude, longitude');

            processEntity({latitude: 0});

            expect(entity2poi).not.toHaveBeenCalled();
        });

        it("support geojson coordinates", () => {
            spyOn(window, 'entity2poi');
            MashupPlatform.prefs.set('coordinates_attr', 'location');

            let entity = {location: {type: "Point", coordinates: [1, 0]}};
            processEntity(entity);

            expect(entity2poi).toHaveBeenCalledWith(entity, [0, 1], entity.location);
        });

        it("support geojson coordinates (polygon)", () => {
            spyOn(window, 'entity2poi');
            MashupPlatform.prefs.set('coordinates_attr', 'location');

            let geojson = {
                type: "Polygon",
                coordinates: [
                    [
                        [-3.80356167695194, 43.46296641666926],
                        [-3.803161973253841, 43.46301091092682],
                        [-3.803147082548618, 43.462879859445884],
                        [-3.803536474744068, 43.462838666196674],
                        [-3.80356167695194, 43.46296641666926]
                    ]
                ]
            };
            let entity = {location: geojson};
            processEntity(entity);

            expect(entity2poi).toHaveBeenCalledWith(entity, null, geojson);
        });

        describe("entity2poi(entity, coordinates, geojson)", () => {

            it("Process entities without a geometry", () => {
                let entity = {location: "0, 1"};
                entity2poi(entity, [0, 1], null);
            });

            it("Process point geometries", () => {
                let geojson = {type: "Point", coordinates: [1, 0]};
                let entity = {location: geojson};
                entity2poi(entity, [0, 1], geojson);
            });

            it("Process polygon geometries", () => {
                let geojson = {
                    type: "Polygon",
                    coordinates: [
                        [
                            [-3.80356167695194, 43.46296641666926],
                            [-3.803161973253841, 43.46301091092682],
                            [-3.803147082548618, 43.462879859445884],
                            [-3.803536474744068, 43.462838666196674],
                            [-3.80356167695194, 43.46296641666926]
                        ]
                    ]
                };
                let entity = {location: geojson};
                entity2poi(entity, null, geojson);
            });

        });

    });

})();
