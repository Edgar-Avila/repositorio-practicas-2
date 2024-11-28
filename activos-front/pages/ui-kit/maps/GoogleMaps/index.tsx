import { ComponentContainerCard, PageBreadcrumb2 } from "@/components";
import {
  GoogleApiWrapper,
  Map,
  InfoWindow,
  Marker,
  Polyline,
} from "google-maps-react";
import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";

type MapContainerProps = {
  google: any;
};

const polyline = [
  { lat: 37.789411, lng: -122.422116 },
  { lat: 37.785757, lng: -122.421333 },
  { lat: 37.789352, lng: -122.415346 },
];

const DefaultMap = ({ google }: MapContainerProps) => {
  return (
    <ComponentContainerCard
      title="Default Map"
      description="Example of google maps."
    >
      <div
        className="gmaps"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Map
          google={google}
          initialCenter={{ lat: -12.043333, lng: -77.028333 }}
          zoomControlOptions={{
            position: google.maps.ControlPosition.LEFT_TOP,
          }}
        />
      </div>
    </ComponentContainerCard>
  );
};

const MapWithMarkers = ({ google }: MapContainerProps) => {
  const [activeMarker, setActiveMarker] = useState<any>({});
  const [selectedPlace, setSelectedPlace] = useState<any>({});
  const [showingInfoWindow, setShowingInfoWindow] = useState<boolean>(false);

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };

  // handles operation on marker click
  const onBasicMarkerClick = () => {
    alert("You clicked in this marker");
  };

  // handles operation on marker click
  const onMarkerClick = (props: any, marker: any) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
    setShowingInfoWindow(true);
  };

  return (
    <ComponentContainerCard
      title="Map With Marker"
      description="Example of google maps."
    >
      <div
        className="gmaps"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Map
          google={google}
          zoom={18}
          initialCenter={{ lat: 21.569874, lng: 71.5893798 }}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
          zoomControlOptions={{
            position: google.maps.ControlPosition.LEFT_TOP,
          }}
        >
          <Marker
            title={"This is sweet home."}
            name={"Home sweet home!"}
            position={{ lat: 21.569874, lng: 71.5893798 }}
            onClick={onBasicMarkerClick}
          ></Marker>

          <Marker
            name="Current location"
            title={"Marker with InfoWindow"}
            position={{ lat: 21.56969, lng: 71.5893798 }}
            onClick={onMarkerClick}
          ></Marker>
          <InfoWindow
            marker={activeMarker}
            onClose={onInfoWindowClose}
            visible={showingInfoWindow}
          >
            <div>
              <p>{selectedPlace.name}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    </ComponentContainerCard>
  );
};

const PolyLineMap = ({ google }: MapContainerProps) => {
  return (
    <ComponentContainerCard
      title="Poly Line Map"
      description="Example of google maps."
    >
      <div
        className="gmaps"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Map
          className="map"
          google={google}
          style={{
            height: "100%",
            position: "relative",
            width: "100%",
          }}
          zoom={14}
          zoomControlOptions={{
            position: google.maps.ControlPosition.LEFT_TOP,
          }}
        >
          <Polyline
            fillColor="#0000FF"
            fillOpacity={0.35}
            path={polyline}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
        </Map>
      </div>
    </ComponentContainerCard>
  );
};

const LightStyledMap = ({ google }: MapContainerProps) => {
  const mapStyles = [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }, { lightness: 17 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 18 }],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 16 }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#dedede" }, { lightness: 21 }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }],
    },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#fefefe" }, { lightness: 20 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
    },
  ];

  return (
    <ComponentContainerCard
      title="Ultra Light with Labels"
      description="Example of Google Maps."
    >
      <div
        className="gmaps"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Map
          google={google}
          initialCenter={{ lat: -12.043333, lng: -77.028333 }}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
          styles={mapStyles}
          zoomControlOptions={{
            position: google.maps.ControlPosition.LEFT_TOP,
          }}
        ></Map>
      </div>
    </ComponentContainerCard>
  );
};

const StreetViewMap = ({ google }: MapContainerProps) => {
  let mapRef: any = useRef();

  /**
   * Activate the street view
   */
  const activateStreetView = (position: { lat: number; lng: number }) => {
    if (mapRef) {
      const mapObj = mapRef.map.getStreetView();
      mapObj.setPov({ heading: 34, pitch: 10 });
      mapObj.setPosition(position);
      mapObj.setVisible(true);
    }
  };

  return (
    <ComponentContainerCard
      title="Street View Panoramas Google Map"
      description="Example of google maps."
    >
      <div
        className="gmaps"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Map
          google={google}
          ref={(map: any) => (mapRef = map)}
          zoom={14}
          initialCenter={{ lat: 40.7295174, lng: -73.9986496 }}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
          streetViewControl={true}
          onReady={() => {
            activateStreetView({
              lat: 40.7295174,
              lng: -73.9986496,
            });
          }}
        ></Map>
      </div>
    </ComponentContainerCard>
  );
};

const GoogleMaps = ({ google }: MapContainerProps) => {
  return (
    <>
      <PageBreadcrumb2 appName="Maps" title="Google Maps" />
      <Row>
        <Col lg={6}>
          <DefaultMap google={google} />
        </Col>
        <Col lg={6}>
          <MapWithMarkers google={google} />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <PolyLineMap google={google} />
        </Col>
        <Col lg={6}>
          <LightStyledMap google={google} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <StreetViewMap google={google} />
        </Col>
      </Row>
    </>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA",
})(GoogleMaps);
