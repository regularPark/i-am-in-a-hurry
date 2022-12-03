import React, { useEffect } from "react";
import "./MapContainer.css";

const { kakao } = window;

let map;
let locPosition;

let myLat;
let myLon;

// 현 위치로 돌아오기
const setMyLoc = () => {
  map.setCenter(locPosition);
};

const MapContainer = ({ searchPlace }) => {
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
    };
    map = new kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      // 현 위치
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
        setMyLoc(map, locPosition);
      });
    }

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB, {
      useMapCenter: true,
      radius: 2000,
      location: locPosition,
    });

    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 클릭시 장소명 표기
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <>
      <button onClick={setMyLoc}>현위치</button>
      <div
        id="myMap"
        style={{
          width: "500px",
          height: "500px",
        }}
      ></div>
    </>
  );
};

export default MapContainer;
