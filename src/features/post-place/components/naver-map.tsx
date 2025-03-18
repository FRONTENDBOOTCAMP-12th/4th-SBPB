'use client';

import React, { useEffect, useState } from 'react';

function NaverMap() {
  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      new naver.maps.Map('map', mapOptions);
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.onload = () => initMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r9ozyvigfx&submodules=geocoder`;
      document.head.appendChild(mapScript);
    }

    naver.maps.Service.geocode(
      {
        query: '불정동',
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert('Something wrong!');
        }

        const result = response.v2, // 검색 결과의 컨테이너
          items = result.addresses;

        console.log(items); // 검색 결과의 배열

        // do Something
      }
    );
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

export default NaverMap;
