<hr>
# Maptime!
### Geoprocessing with turf.js
<hr>
July 27, 2016

---

Me: Bill Morris 
- Cartographer at [Faraday Inc](http://faraday.io)
<hr>
![nola](https://www.dropbox.com/s/sf87ts86y2h4mog/Screenshot%202016-06-01%2009.43.33.png?dl=1)

---

using [turf.js](http://turfjs.org/) for spatial data crunching

---

Plan:
- *How we got here*
- Client side geoprocessing
- Server side geoprocessing
- Where next?

---

GIS + the internet: a lightning history

---

1993: Xerox PARC

---

![xerox](https://pbs.twimg.com/media/CjP7iSwUgAAJ0Ib.jpg)

---

~2000: 

- GeoServer
- ArcIMS
![arcims](http://webhelp.esri.com/arcims/9.3/general/mergedprojects/arcxmlguide/elements/images/config_file_d1.gif)

---

2004: Complexity increases

- ArcGIS Server
- PostGIS + UMN MapServer
- Others catching on . . .

---

2005: Year G

![goog](http://blogoscoped.com/files/google-museum/48.jpg)

---

[a.k.a. Year of The Tile, a.k.a. The Resurrection of Gerardus]

---

"GIS in the browser"

2010:

---

![gis](https://www.dropbox.com/s/jt77sl10fv1dzkj/Screenshot%202016-05-31%2022.06.17.png?dl=1)
*via [Dave Bouwman](http://www.slideshare.net/dbouwman/usability-in-the-geoweb-presentation/22-most_WebGIS_sites_are)*

---

![biden](http://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/giphy.gif)

---

2016: 

It's actually a thing: 

---

![buffer](https://www.dropbox.com/s/71c9b3yyibimmnm/dropchop1.gif?dl=1)

---

*[Try it out on the great state of Vermont](http://dropchop.io/?gist=e1028889229343fa8ed8a6e74d21f5d0)*

---

Powered by [turf.js](http://turfjs.org/)

---

A javascript library for live, client-side geoprocessing

---

Instead of this:

---

![arcpro](http://pro.arcgis.com/en/pro-app/help/analysis/geoprocessing/basics/GUID-8C7480F4-4E44-4E9E-89BE-421E823B767C-web.png)

---

This:

---

![hull](https://www.dropbox.com/s/ggkw3j7q1npp24t/Screenshot%202016-05-31%2017.13.16.png?dl=1)

---

Javascript

---

![afraid](https://66.media.tumblr.com/3946cce1923abd7bb5e1c5bc16681d6d/tumblr_nwr31xQQLL1thdow0o1_500.gif)

---

```
function bidenize() {
  document.getElementById('topbar').innerHTML = 'Random Biden quote'
}
```

---

GeoJSON

---

Looks like this in a text editor:

```
{
  "type": "Feature",
  "properties": {
    "marker-color": "#ab4ca9",
    "marker-size": "large",
    "marker-symbol": "alcohol-shop",
    "name": "Geobeers @ Parlor Sports"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      -71.10146641731262,
      42.374473211292404
    ]
  }
}
```

---

Looks like [this](http://geojson.io/#id=gist:wboykinm/a63dd6d26cd8feb84623b18f8e5e581c&map=14/42.3715/-71.1038) in a web browser:

---

![cap](https://www.dropbox.com/s/y9r5x9j32i0ig9b/Screenshot%202016-07-25%2023.27.33.png?dl=1)

---

- How we got here
- *Client side geoprocessing*
- Server side geoprocessing
- Where next?

---

Let's do a quick project, starting with [data creation](http://geojson.io/#map=8/43.930/-72.724):

---

![draw1](https://www.dropbox.com/s/gqeza9d01holk84/draw1.gif?dl=1)

---

Then we [bring the data over to dropchop](http://dropchop.io/) and do some basic turf geoprocessing on it:

---

![process2](https://www.dropbox.com/s/ffr8zeabo5pulc8/process1.gif?dl=1)

---

Could you spot the server in there?

---

Again, GIS in the web browser. LOL.

---

![biden2](https://media.giphy.com/media/Kwi0Iu9MxxOgg/giphy.gif)

---

_What do end users care about geoprocessing?_

---

Geoprocessing as part of a layperson's user experience:

- in support of a task
- telling a story

---
Nearest neighbor: [Post-swimming brews](https://wboykinm.github.io/maptime-turfjs/brewswim/)
![near](https://www.dropbox.com/s/0dq4ima6l3402kw/Screenshot%202016-05-31%2022.52.32.png?dl=1)

---

Distance along a line: [Meet me halfway](http://wboykinm.github.io/midpoint/)
![distance](https://www.dropbox.com/s/6359nswwvbkw2iw/Screenshot%202016-05-31%2022.48.35.png?dl=1)

---
Buffering: [Race route water fountains](https://www.mapbox.com/bites/00082/?embed=true)
![water](https://www.dropbox.com/s/3flhucj3h77etg9/Screenshot%202016-05-31%2022.45.16.png?dl=1)
*via [Morgan Herlocker](https://twitter.com/morganherlocker)*
---

Intersection and grids: [Neighborhood mapping](https://wboykinm.github.io/maptime-turfjs/neighborhoods/)
![hoods](https://www.dropbox.com/s/4186m5l40ne0kxx/Screenshot%202016-07-27%2016.40.21.png?dl=1)

---

- How we got here
- Client side geoprocessing
- *Server side geoprocessing*
- Where next?

---

[node.js](http://nodejs.org/) is javascript, just built for servers. *turf works the same way [when used as a server-side tool](https://github.com/mapbox/turf-server-example)*

---

But . . .
![Data from hell](https://www.dropbox.com/s/g5njqmvgmr2udoj/Screenshot%202016-05-31%2022.16.45.png?dl=1)

---

A more complicated problem, wth bigger data, needs more power than a browser can provide.

---

[tile-reduce](https://github.com/mapbox/tile-reduce)

---

![tiles](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Tiled_web_map_Stevage.png/640px-Tiled_web_map_Stevage.png)
*via [Stevage](https://en.wikipedia.org/wiki/Tiled_web_map#/media/File:Tiled_web_map_Stevage.png)*

---

[Comparing two gigantic datasets](https://www.mapbox.com/blog/updating-map-runkeeper/)

---

![run](https://farm1.staticflickr.com/697/20479186309_df83c4d759_b.jpg)
*via [Alex Barth](https://twitter.com/lxbarth)*

---

[A time-sensitive analysis to save lives](https://github.com/morganherlocker/nepal-damage-analysis). . .

---

![nepal](https://www.dropbox.com/s/fk4b1drr1xcma7q/Screenshot%202016-05-24%2017.10.57.png?dl=1)
*via [Morgan Herlocker](https://twitter.com/morganherlocker)*
---

- How we got here
- Client side geoprocessing
- Server side geoprocessing
- *Where next?*

---

[Offline geoprocessing](http://www.fulcrumapp.com/blog/advanced-geospatial-calculations-with-turf/)
![off](http://www.fulcrumapp.com/assets/img/blog/turf-js-libs.png)
*via [Bryan McBride](https://twitter.com/brymcbride)*

---

[Linear referencing](http://openlayers.org/en/latest/examples/turf.html)
![ref](https://www.dropbox.com/s/4dsv1ew8vzb249w/Screenshot%202016-05-31%2021.40.39.png?dl=1)
*via [Tobias Sauerwein](https://twitter.com/tsauerwein)*

---

[Realtime](https://www.mapbox.com/blog/geofencing-london/) [geoprocessing](https://www.mapbox.com/bites/00223/)
![rt](https://www.dropbox.com/s/p4yrcusbrj0b532/Screenshot%202016-05-31%2021.42.37.png?dl=1)
*via [Molly Lloyd](https://twitter.com/mollymerp)*

---

Resources to get you started:

- [javascript](https://www.codecademy.com/courses/getting-started-v2/0/1?curriculum_id=506324b3a7dffd00020bf661)
- [node.js](http://nodeschool.io/#workshopper-list)
- [turf.js](https://www.mapbox.com/help/analysis-with-turf/)
- [dropchop.io](http://dropchop.io/)
- [github](https://github.com/)

---

Questions? Hit me up:

- [bill@faraday.io](mailto:bill@faraday.io)
- [@vtcraghead](https://twitter.com/vtcraghead)