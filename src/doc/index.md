## Introduction

NGSI entities provided by the NGSI source operator cannot be injected directly
to map viewer widgets. This is due to the fact that map viewers expect data
coming through the endpoints to have an especific format.

This operator transforms those NGSI entities into Points of Interest suitable
for map viewer widgets. To be able to do so, those entities should contain an
attribute containing the coordinates of the entity or two attributes, one
providing the latitude and other one providing the longitude. Also, take into
account the fact this operator is generic, so marker bubbles of the PoIs created
by this operator will be a mere composition of the attribute/value pairs.

If your are a developer, an option for improving the information shown in the
associated point of interest bubbles is to download this operator an use it as
an skeleton for your improved version of the operator. **Remember to change the
id metadata** (vendor, name and version) before uploading it again.


## Settings

-  **Coordinates attribute**: Name of the entity attribute where the coordinates are stored. If the entity provides the coordinates through a pair of attributes, you can pass those names using a comma (e.g. `latitude, longitude`). `location` by default.
-  **Marker Icon**: Absolute URL pointing to an image that will be used for the markers created by this operator. Leave this setting empty for using the default marker icon. Empty by default.
