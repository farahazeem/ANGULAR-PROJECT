import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Map, LatLngTuple, map, tileLayer, icon, Marker, LatLng, marker, LatLngExpression, LeafletMouseEvent } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';
@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {
  @Input()
  order!:Order;

  //Created this later when we needed a readOnly map for payment page
  @Input()
  readOnly = false;

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];
  //the responsibility of @ViewChild decorator is selecting a
  //tag from the
  //view file i.e. html file and putting it inside the field
  //& since we have declared an angular reference(template ref variable) in html file we
  //directly write name of the reference here i.e map
  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  //& by writing {static:true} makes it available
  //inside ngOnInit()
  //but only condition we need to make sure that the div with map ref
  //doesn't have any conditional statements e.g. ngIf, ngFor etc on it.

  //by line 14 and 15 we are making sure when the map component
  //is showing, we have access to the div.map of view file here
  map!:Map;
  currentMarker!:Marker;
  constructor(private locationService:LocationService) { }


  //While working on the payment page, we change this lifeCycle hook
  //from ngOnInit() to ngOnChanges()
  ngOnChanges(): void {
    if(!this.order) return;
    this.initializeMap();

    if(this.readOnly && this.addressLatLng){
      this.showLocationOnReadonlyMode();
    }
  }

  showLocationOnReadonlyMode(){
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    //disabling all the map option so user can't edit it anyway
    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  initializeMap() {
    if(this.map) return; //this line covers when the map has already been initialized

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlng)
      }
    })
  }

  setMarker(latlng:LatLngExpression){
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker)
    {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    //after the marker drag is finished we have to capture
    //the address of the location as
    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  //this method is not that much needed for frontend but
  //might be helpful for mongoDB since it doesn't accept float values
  set addressLatLng(latlng: LatLng){
    if(!latlng.lat.toFixed) return; // if the address is coming from server (i.e. in case of payment Page) its already in string format, so we exit from this function

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }

}
