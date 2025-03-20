/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { tm } from '@/utils/tw-merge';
import PlaceSearch from './place-search';
import PlaceItem from './place-item';
import SaveButton from './save-button';
import { usePlacesStore } from '@/store/user-place-store';
import CloseButton from './close-button';

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap() {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const psRef = useRef<any>(null);
  const infowindowRef = useRef<any>(null);

  // Zustand에서 places 가져오기
  const { places, addPlace, removePlace } = usePlacesStore();

  useEffect(() => {
    const { kakao }: any = window;
    if (!kakao) return;

    kakao.maps.load(() => {
      initMap();
    });
  }, []);

  const initMap = () => {
    const { kakao }: any = window;
    if (!kakao) console.log('타입에러');

    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(mapRef.current, options); // 지도 생성 및 객체 리턴
    setMap(map);

    psRef.current = new kakao.maps.services.Places();
    infowindowRef.current = new kakao.maps.InfoWindow({ zIndex: 1 });
  };

  // 장소를 검색하는 함수
  const searchPlaces = (keyword: string) => {
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }
    psRef.current.keywordSearch(keyword, placesSearchCB);
  };

  const placesSearchCB = (data: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const displayPlaces = (places: any[]) => {
    const listEl = document.getElementById('placesList')!;
    const menuEl = document.getElementById('menu_wrap')!;
    const fragment = document.createDocumentFragment();
    const bounds = new window.kakao.maps.LatLngBounds();

    removeAllChildNods(listEl);
    removeMarker();

    const newMarkers: any[] = []; // 마커배열

    for (let i = 0; i < places.length; i++) {
      const placePosition = new window.kakao.maps.LatLng(
        places[i].y,
        places[i].x
      );
      const marker = addMarker(placePosition);

      console.log(marker);
      console.log(places[i]);
      newMarkers.push(marker);

      bounds.extend(placePosition);

      (function (marker, title) {
        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
          displayInfowindow(marker, title);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', function () {
          infowindowRef.current.close();
        });
      })(marker, places[i].place_name);

      const placeItem = (
        <PlaceItem
          key={i}
          index={i}
          place={places[i]}
          marker={marker}
          onClick={handlePlaceClick}
        />
      );

      const container = document.createElement('div');
      createRoot(container).render(placeItem);
      fragment.appendChild(container);
    }

    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    map.setBounds(bounds);
    setMarkers(newMarkers);
  };

  const handlePlaceClick = (place: any, marker: any) => {
    const simplifiedPlace = {
      place_name: place.place_name,
      road_address_name: place.road_address_name,
    };

    // 선택된 장소가 이미 places에 있는지 확인하고, 없다면 추가, 있다면 삭제
    if (places.some((p) => p.place_name === place.place_name)) {
      removePlace(place.place_name);
    } else {
      addPlace(simplifiedPlace);
    }

    displayInfowindow(marker, place.place_name);
    map.panTo(marker.getPosition());
  };

  const addMarker = (position: any) => {
    const imageSrc = '/black-map.svg';
    const imageSize = new window.kakao.maps.Size(36, 37);

    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    const marker = new window.kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    return marker;
  };

  const removeMarker = () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  };

  const displayInfowindow = (marker: any, title: string) => {
    const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
    infowindowRef.current.setContent(content);
    infowindowRef.current.open(map, marker);
  };

  const removeAllChildNods = (el: HTMLElement) => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild!);
    }
  };

  function handleSearch(place: string): void {
    searchPlaces(place);
  }

  return (
    <div className={tm('px-[17px]', 'pt-[24px]', 'relative')}>
      <CloseButton />
      <div className="mb-5 mt-4">
        <PlaceSearch onSearch={handleSearch} />
      </div>
      <div
        ref={mapRef}
        className="mb-3"
        style={{ width: '100%', height: '400px' }}
      ></div>
      <div id="menu_wrap" className="bg_white">
        <ul id="placesList"></ul>
      </div>
      <div className="z-10 pt-2">
        <SaveButton
          targetPath="/register-post/post-place"
          disabled={places.length === 0}
        />
      </div>
    </div>
  );
}

export default KakaoMap;
