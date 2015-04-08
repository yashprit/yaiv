*exported from code.google.com/p/yapi-viewer*

# YAPI Viewer (Yet Another PIcture Viewer)
A web image viewer that can be easily added to any web site. In-line picture editing is also supported. Its implementation is based solely on the canvas element of HTML5, javascript and CSS. It works in all major browsers: Internet Explorer, Firefox, Safari, Opera, Konqueror. In addition, it offers a range of customisation options to suit the needs of any website.

YAPI Viewer displays your images into a box consisting of specific buttons for zoom/pan and rotation and sliders for brightness/contrast adjustment. It can be typically added to any HTML page in no more than 5 minutes. It has been developed by the [Hellenic National Documentation Center (EKT/NHRF)](http://www.ekt.gr) as part of an internally funded project.

You can view and test YAPI Viewer by navigating in the various digital collections of the PANDEKTIS repository, the digital repository of the National Hellenic Research Foundation containing primary sources of Greek history and culture. For example, you can check YAPI Viewer in action here, inside a collection of ancient Greek and Roman inscriptions.

## Basic Functions

Τhe available functions for rendering an image can be summarized as follows:

* Zoom/Pan
* Rotate
* Adjust brightness and contrast.
* Advantages

## Easy to integrate/use into any website.
Ability for on/off switching of functionality (zoom/pan, rotate and brightness/contast adjustment). Highly configurable zoom function (e.g., zoom step and min/max allowable scale). Fast zoom/pan and rotate functions, working smoothly with large images.

## Usage

Use index.htm file including all other files that are defined

* js/jquery-1.3.2-drag-slider.min.js js/jquery-ui-1.7-drag-slider.custom.min.js
* css/jquery-ui-1.7-drag-slider.custom.css
* js/excanvas.js
* js/pixastic.custom.js
* js/rotator.js
* js/img_adjust.js
* css/general.css
* js/conf.js
* js/conf_adjust.js

In the conf.js set appropriate values to the variables:
* img_path, the name of the image.
* path, the path of the image in relation to the index.htm file.
* img_act_height AND img_act_weight in order to define the size of the frame that the image would be displayed.
* max_width, min_width AND step in order to define:
  `max_width // Max allowable scale for image zoom`
  `min_width // Min allowable scale for image zoom`
  `step // Scale step for zoom The original image is supposed to be of scale 1.`
* displayZ, displayR AND displayBC in order to include or exclude specific functionality:
`displayZ --------> //Set to 'true' if you wanted to display the zoom controls`
`//Set to 'false' if you wanted to hide the zoom controls`
`displayR --------> //Set to 'true' if you wanted to display the rotate controls`
`//Set to 'false' if you wanted to hide the rotate controls`
`displayBC --------> //Set to 'true' if you wanted to display the brightness/contrast controls`
`//Set to 'false' if you wanted to hide the brightness/contrast controls`

> For the script js/pixastic.custom.js to work you should place the application inside a web server (apache)

> You have to comment the DOCTYPE in index.htm in order for the application to work properly in IE7.*

> Brightness/Contrast transformations doesn't work in IE.

## Third party software used

YAPI Viewer utilises the following third party open source software elements:

* jQuery (jquery.com) for image panning & brightness/contrast sliders.
* Canvas element of the HTML5 specifications for rotation and zoom.
* ExplorerCanvas (http://excanvas.sourceforge.net/) for canvas support in IE.
* [Pixastic](www.pixastic.com) for brightness/contrast adjustments.
* People behind the tool

## People behind this
* Christina Paschou (development).
* Spyridon Kakouris (development).
* Nikos Houssos (technical supervision).
