const options = {
  lat: 20.627024,
  lng: -103.4555531,
  zoom: 11.4,
  style: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  // más estilos de Leaflet: https://leaflet-extras.github.io/leaflet-providers/preview/
  // style: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  // style: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  // style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  // style: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
  // style: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}'

};

const mappa = new Mappa('Leaflet');

let myMap;
let canvas;
let infoLayer;


let data;
let num;
let boliza = [];
let colors = [];

let sizes = [];
let minSize;
let maxSize;

function setup() {
  canvas = createCanvas(windowWidth, 480).parent('canvasContainer01');
  infoLayer = createCanvas(windowWidth, 480).parent('canvasContainer01');

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  data = loadTable("../data/incendios_primavera-ene-abril-2019.csv", 'csv', 'header', gotData);
  myMap.onChange(drawData);

  noFill();
  fill(255, 100, 0, 50);
}

function draw() {

  for (let i = 0; i<num; i++) {
    let lowCol = color(255, 80, 50, 255);
    let highCol = color(255, 255, 255, 255);
    let toolTipBack = color(180, 40, 20, 100);
    let toolTipAlpha = 0;
    boliza[i].highlightMap(mouseX, mouseY, boliza[i].x, boliza[i].y, highCol, lowCol);
    let val = data.getString(i, 'SUPERFICIE AFECTADA TOTAL');
    let label = data.getString(i, "CAUSA") + "\n" + data.getString(i, "FECHA DE REGISTRO");
    
    
    boliza[i].showTooltipLayer(boliza[i].x, boliza[i].y, 300, 200, toolTipBack, val+"ha", label, infoLayer);
  }
}

function gotData() {
    clear();
    num = data.getRowCount();
    console.log("found " + num + " rows");
    for (let i = 0; i<num; i++) {
      let val = data.getString(i, "SUPERFICIE AFECTADA TOTAL");
      // console.log("este smr" + val);
      if (val){
        sizes.push(val);
      }
    };
    // console.log(sizes);
    minSize = min(sizes);
    maxSize = max(sizes);
    // console.log("min/max: " + minSize + "/" + maxSize);
    drawData();
}

function drawData() {
  clear();
  for (let i = 0; i<num; i++) {
    // Get the lat/lng of each data point
    const latitude = Number(data.getString(i, 'LATITUD'));
    const longitude = Number(data.getString(i, 'LONGITUD'));
    const pos = myMap.latLngToPixel(latitude, longitude*-1);
    let val = data.getString(i, 'SUPERFICIE AFECTADA TOTAL');
    size = map(sqrt(val), sqrt(minSize), sqrt(maxSize), 5, 100) + myMap.zoom();
    boliza[i] = new Bola(pos.x, pos.y, size, 5);
    boliza[i].setColor(255, 80, 50, 100);
    boliza[i].setStroke(255, 80, 50, 200, 0);
    boliza[i].show();

    let lowCol = color(255, 80, 50, 255);
    let highCol = color(255, 255, 255, 255);
    boliza[i].setLabelColor(highCol);
    let label = data.getString(i, "CAUSA");
    let labelSize = map(val, minSize, maxSize, 12, 24);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
