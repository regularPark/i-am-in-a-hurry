/*global kakao*/
import React, { useEffect } from "react";
import "./Map.css";

let curLat = 33.450701;
let curLng = 126.570667;

let myLat;
let myLng;

const setLoc = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(curLat, curLng),
    level: 6,
  };

  let locPosition = new kakao.maps.LatLng(myLat, myLng),
    message = "<div>나 여기 있고</div>";

  const map = new kakao.maps.Map(container, options);

  let marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  let iwContent = message,
    iwRemovable = true;

  var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemovable,
  });
  infowindow.open(map, marker);

  map.setCenter(locPosition);
};

const Location = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(curLat, curLng),
      level: 6,
    };

    const map = new kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude,
          lng = position.coords.longitude;

        myLat = lat;
        myLng = lng;

        let locPosition = new kakao.maps.LatLng(lat, lng),
          message = "<div>here? </div>";
        displayMarker(locPosition, message);
      });
    } else {
      let locPosition = new kakao.maps.LatLng(curLat, curLng),
        message = "현 위치 확인 불가합니다...";
      displayMarker(locPosition, message);
    }

    function displayMarker(locPosition, message) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      let iwContent = message,
        iwRemovable = true;

      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemovable,
      });
      infowindow.open(map, marker);

      console.log(locPosition);
      map.setCenter(locPosition);
    }
  }, []);

  return (
    <div>
      <div id="map"></div>
      <button onClick={setLoc}>내 위치</button>
    </div>
  );
};

export default Location;
