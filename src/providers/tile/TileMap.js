// -----------
// Tile Map
// -----------

import parseGeoJSON from '../../utils/parseGeoJSON';
import GUID from './../../utils/GUID';

class TileMap {
  constructor(options) {
    this.options = options;
    this.id = GUID();

    this.canvas = this.mappaDiv = null;
    this.scriptSrc = this.styleSrc = this.scriptTag = null;
    this.srcLoaded = false;
  }

  loadSrc() {
    const scriptPromise = new Promise((resolve, reject) => {
      this.scriptTag = document.createElement('script');
      document.body.appendChild(this.scriptTag);

      this.scriptTag.id = this.options.provider;
      this.scriptTag.onload = resolve;
      this.scriptTag.onerror = reject;
      this.scriptTag.async = true;
      this.scriptTag.src = this.scriptSrc;

      if (this.styleSrc) {
        const styleTag = document.createElement('link');
        document.head.appendChild(styleTag);
        styleTag.rel = 'stylesheet';
        styleTag.href = this.styleSrc;
      }
    });

    scriptPromise.then(() => this.srcLoaded = true);
    return this;
  }

  overlay(canvas, callback) {
    const cnv = this.canvas = canvas.elt || canvas;

    this.scriptTag.onload = () => {
      const md = this.mappaDiv = document.createElement('div');

      if (cnv.parentElement)  cnv.parentElement.appendChild(md);
      else                    document.body.appendChild(md);

      md.setAttribute('style', `width:${cnv.width}px;height:${cnv.height}px;`);
      md.setAttribute('id', this.id);

      this.createMap();

      if (typeof callback === 'function')  callback();
      return this;
    };
  }

  createMap() {
    return this;
  }

  latLngToPixel(...args) {
    return this.fromLatLngToPixel(...args);
  }

  fromLatLngToPixel(...args) {
    return { x: -100, y: -100 };
  }

  pixelToLatLng(...args) {
    return this.fromPointToLatLng(...args);
  }

  fromPointToLatLng(...args) {
    return { lat: -100, lng: -100 };
  }

  zoom() {
    return this.getZoom() | 0;
  }

  getZoom() {
    return 0;
  }

  geoJSON(data, type) {
    return parseGeoJSON(data, type);
  }
}

export default TileMap;
