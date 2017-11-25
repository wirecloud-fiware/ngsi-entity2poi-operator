/*
 * Copyright (c) 2014 CoNWeT Lab., Universidad Politécnica de Madrid
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

/* globals MashupPlatform */

(function () {

    "use strict";

    var icon;

    MashupPlatform.wiring.registerCallback("entityInput", function (entities) {
        if (entities === "string") {
            try {
                entities = JSON.parse(entities);
            } catch (e) {
                throw new MashupPlatform.wiring.EndpointTypeError();
            }
        }

        if (!Array.isArray(entities)) {
            entities = [entities];
        }

        var pois = entities.map(processEntity).filter(function (poi) {return poi != null;});
        MashupPlatform.wiring.pushEvent("poiOutput", pois);
    });

    var processEntity = function processEntity(entity) {
        var coordinates = null;
        var coord_parts = null;
        var coordinates_pref = MashupPlatform.prefs.get('coordinates_attr');
        var attributes = coordinates_pref.split(new RegExp(',\\s*'));
        if (attributes.length < 1) {
            return;
        } else if (attributes.length >= 2 && entity[attributes[0]] != null && entity[attributes[1]] != null) {
            coord_parts = [
                entity[attributes[0]],
                entity[attributes[1]]
            ];
        } else if (entity[attributes[0]] != null) {
            coordinates = entity[attributes[0]];
            if (typeof coordinates === "object") {
                // GeoJSON format: longitude, latitude[, elevation]
                // WireCloud: latitude and longitude
                coordinates = {
                    system: "WGS84",
                    lng: parseFloat(entity.location.coordinates[0]),
                    lat: parseFloat(entity.location.coordinates[1])
                };
            } else {
                coord_parts = entity[attributes[0]].split(new RegExp(',\\s*'));
                if (coord_parts != null && coord_parts.length === 2) {
                    coordinates = {
                        system: "WGS84",
                        lat: parseFloat(coord_parts[0]),
                        lng: parseFloat(coord_parts[1])
                    };
                }
            }
        }

        if (coordinates) {
            return entity2poi(entity, coordinates);
        }
    };

    var entity2poi = function entity2poi(entity, coordinates) {
        var poi = {
            id: entity.id,
            icon: icon,
            tooltip: entity.id,
            data: entity,
            infoWindow: buildInfoWindow.call(this, entity),
            currentLocation: coordinates
        };

        return poi;
    };

    var internalUrl = function internalUrl(data) {
        var url = document.createElement("a");
        url.setAttribute('href', data);
        return url.href;
    };

    var buildInfoWindow = function buildInfoWindow(entity) {
        var infoWindow = "<div>";
        for (var attr in entity) {
            infoWindow += '<span style="font-size:12px;"><b>' + attr + ": </b> " + entity[attr] +  "</span><br />";
        }
        infoWindow += "</div>";

        return infoWindow;
    };

    var updateMarkerIcon = function updateMarkerIcon() {
        icon = MashupPlatform.prefs.get('marker-icon');
        if (icon == '') {
            icon = internalUrl('images/icon.png');
        }
    };

    MashupPlatform.prefs.registerCallback(updateMarkerIcon);
    // Init initial marker icon
    updateMarkerIcon();

})();
