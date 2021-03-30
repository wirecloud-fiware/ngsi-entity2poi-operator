# NGSI Entity 2 PoI operator

[![](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/visualization.svg)](https://www.fiware.org/developers/catalogue/)
![](https://img.shields.io/github/license/wirecloud-fiware/ngsi-entity2poi-operator.svg)<br/>
[![Tests](https://github.com/wirecloud-fiware/ngsi-entity2poi-operator/workflows/Tests/badge.svg)](https://github.com/wirecloud-fiware/ngsi-entity2poi-operator/actions?query=workflow%3A%22Tests%22)
[![Coverage Status](https://coveralls.io/repos/github/wirecloud-fiware/ngsi-entity2poi-operator/badge.svg?branch=develop)](https://coveralls.io/github/wirecloud-fiware/ngsi-entity2poi-operator?branch=develop)

This [WireCloud operator](http://wirecloud.readthedocs.org/en/latest/) transforms NGSI entities (as the ones coming from
the NGSI source operator) to Points of Interest. To be able to do so, those entities should contain an attribute
containing the coordinates of the entity. Also, take into account the fact this operator is generic, so marker bubbles
of the PoIs created by this operator will be a mere composition of the attribute/value pairs.

If your are a developer, an option for improving information shown in the associated point of interest bubbles is to
download this operator an use it as an skeleton for your improved version of the operator. _Remember to change the id
metadata_ (vendor, name and version) before uploading it again.

## Build dependencies

Be sure to have installed [Node.js](https://nodejs.org/). For example, you can install it on Ubuntu and Debian running
the following commands:

```console
sudo apt update; sudo apt install curl gnupg
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt install nodejs npm
```

You also have to install the [Grunt](https://gruntjs.com/)'s command line interface (CLI):

```console
sudo npm install -g grunt-cli
```

The remaining dependencies are installed using npm (you have to run this command inside the folder where you downloaded
this repository):

```console
npm install
```

## Build

Once installed all the build dependencies you can build this operator by using grunt:

```console
grunt
```

If everything goes well, you will find a wgt file in the `dist` folder.

## Documentation

Documentation about how to use this operator is available on the [User Guide](src/doc/userguide.md). Anyway, you can
find general information about how to use operators on the
[WireCloud's User Guide](https://wirecloud.readthedocs.io/en/stable/user_guide/) available on Read the Docs.

## Copyright and License

Copyright (c) 2014-2017 CoNWeT Lab., Universidad Politecnica de Madrid Copyright (c) 2018 Future Internet Consulting and
Development Solutions S.L.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the
License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
language governing permissions and limitations under the License.
