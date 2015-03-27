## Frontend Nanodegree Neighborhood Map

When I started to do this project, there is many not goes as I want for me, maybe at that time I don't understand knockoutjs.

Finally, I know knockoutjs now and I did it as I think.

### Process(How I did it)
1. Write Neighbor Model in Model.js
2. Looking for a proper framework that fit nicely in Desktops, Tablets and Mobiles screen.
3. Building View on that framework concept.
4. Building ModelView.
5. Looking for Google Maps API and implement in Knockoutjs..
6. Looking for Wikipedia API and implement in Knockoutjs..
7. Looking for Google Street View API and implement in Knockoutjs.
8. Connect anything together.

### Building Blocks

The building blocks for my project is the following:

* [jquery](http://jquery.com): A DOM(Document Object Model) manipulation and ajax library. 
* [getskeleton](http://getskeleton.com/): A Minimal HTML UI Framework that gives me a Grid system with good organizations toools.
* [knockoutjs(Debug Version)](http://knockoutjs.com/downloads/knockout-3.3.0.debug.js): its a MVVM(Model View ViewModel) library and I spesific debug version because it contains a special functions not available in non-debug versions, those functions are:
	1. ko.utils.arrayFilter: This function used in to return a filtered array with custom conditions.
	2. ko.utils.stringTrim: This function is for Trim white spaces in head and tail of a string values if exists.

### JavaScript File Structure

1. Model.js: Contains every model that Application need and it's just Model.
2. App.js: Contains ModelView Logic and Knockoutjs initialization instance.

### Requirements

To run this Web Application you will need a browser with specific version that fully supports the JavaScript,

which those browsers and versions are:

- Chrome: 4.0+
- IE(Internet Explorer): 9.0+
- Firefox: 2.0+
- Safari: 3.1+
- Opera: 9.0+

### Instructions

When you open this App you will see four sections from left to right and up to down, which are they:
1. Neighbors Map.
2. Neighbors List with filtration capability.
3. Wikipedia about Neighbor you select from list.
4. An image for the Neighbor place on Google Street View if exists.

When application runs at first time it will point to the first Neighbor on the Neighbor's list.
So, you can browse other Neighbors by click on one of them on Neighbor's list.

### Useful Links

Those Links helped me a lot, any programmer should not memorize any code he will write.

So, documentations is my girlfriend.

* [Maps API - Google Developers](https://developers.google.com/maps/)
* [Google Maps API Tutorial](http://www.w3schools.com/googleapi/)
* [Utility Functions in KnockoutJS](http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html)
* [Filtering Table Data with Knockout JS](http://ryanrahlf.com/filtering-table-data-with-knockout-js/)

### Licence

It's Completely Free. But, Do whatever you like to do on your own full responsibility;