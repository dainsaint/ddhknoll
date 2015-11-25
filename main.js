window.addEventListener( 'resize', resize, false );

function init()
{
	// Setup Stage
    stage = new createjs.Stage( element_id.canvas );
    stage.enableMouseOver();
    stage.mouseMoveOutside = true;

    // Resize
    resize();

    // Enable Touch
    createjs.Touch.enable(stage);

    // Center
    center();   

    // Update
    createjs.Ticker.addEventListener( "tick", tick );
    createjs.Ticker.setFPS( 60 );

    // Debug
    if(debug)
    {
    	start();
    }else{
    	// Create
    	create( itemData );	
    }
}

function start()
{
	var intro = document.getElementById(element_id.intro);
		intro.parentNode.removeChild(intro);

	var header = document.getElementById(element_id.header);
		header.style.visibility = "visible";

	stupid();
}

function load()
{
	removeItems();
	create( itemData );
}

function exportCanvas()
{
 	var canvas = document.getElementById( element_id.canvas );
    var bitmap = new createjs.Bitmap( canvas );
    
    bitmap.cache( 0, 0, canvas.width, canvas.height, 1 );
    var base64 = bitmap.getCacheDataURL();

    print(base64);
    //return base64;
}

function create( data )
{
	items = new createjs.Container();
	items.x = items.y = 0;	
	for( var i = 0 ; i < data.length; i++)
	{
		var item = new Item( data[i].img, data[i] );
       		item.setAlignment();
        	items.addChild( item );		
	}
    stage.addChild(items);
}

function stupid()
{
	removeItems();
	createItems();
}

function share()
{
	alert("Shared");
}

function save()
{
	console.log("Save");
	itemData = new Array();
	for( var i = 0; i < items.children.length; i++)
	{
		var item = items.children[i];
		var data = {
			img: item.name,
			x: item.x,
			y: item.y,
			rotation: item.rotation
		}
		itemData[i] = data;
	}
	//console.log(itemData);
	//console.trace(itemData);
	console.log(JSON.stringify(itemData));
	alert((JSON.stringify(itemData) ));
}


function createItems()
{
	items = new createjs.Container();
	items.x = items.y = 0;
	
    var myItems = new Array();
    var imageCount = images.length;
    imageCount = 5; // Debugging.
    for( var i = 0; i < imageCount; i++ )
    {
        var item = new Item( images[i], null );
        myItems.push( item );
        item.setAlignment();        
        items.addChild( item );
    }

    stage.addChild(items);
}

function removeItems()
{
	if(!items)
		return;

	stage.removeChild( items );	
}

function tick( event ) {
    var deltaTime = event.delta/1000;
    stage.update();
    center();
}

function center()
{
	if(!items)
		return;

	items.x = window.innerWidth * 0.5;
	items.y = window.innerHeight * 0.5;
}

function resize() {
    stage.clear();
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    var units = 30;
    var xGridSize = stage.canvas.height / units;
    var yGridSize = stage.canvas.width / units;

    gridSize = ( xGridSize < yGridSize ) ? xGridSize : yGridSize;
}
