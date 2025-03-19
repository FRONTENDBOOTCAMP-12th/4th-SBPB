/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import PlaceSearch from './place-search';
import MyPlaceList from './my-place-list';
import PlaceItem from './place-item';
import { useRouter } from 'next/navigation';
import SaveButton from './save-button';

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap() {
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<any[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const psRef = useRef<any>(null);
  const infowindowRef = useRef<any>(null);

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
      // 지도를 생성할 때 필요한 기본 옵션
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
    // CB에서 장소를 검색하는 함수
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
      // displayPagination(pagination);
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

    const newMarkers: any[] = [];

    for (let i = 0; i < places.length; i++) {
      const placePosition = new window.kakao.maps.LatLng(
        places[i].y,
        places[i].x
      );
      const marker = addMarker(placePosition, i);
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
          marker={marker} // marker를 전달
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
    setSelectedPlaces((prev) => {
      const index = prev.findIndex((p) => p.id === place.id);
      if (index === -1) {
        return [...prev, place];
      } else {
        return prev.filter((p) => p.id !== place.id);
      }
    });

    // 마커에 포커스를 맞추고 인포윈도우를 표시하는 함수 호출
    displayInfowindow(marker, place.place_name);
    map.panTo(marker.getPosition());
  };

  const addMarker = (position: any, idx: number) => {
    // 마커를 표시하는 함수
    // const imageSrc =
    //   'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    const imageSrc = '/black-map.svg';
    const imageSize = new window.kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new window.kakao.maps.Size(36, 691),
      spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
      offset: new window.kakao.maps.Point(13, 37),
    };
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    const marker = new window.kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(map);
    return marker;
  };

  const removeMarker = () => {
    // 마커를 제거하는 함수
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  };

  // const displayPagination = (pagination: any) => {
  //   const paginationEl = document.getElementById('pagination')!;
  //   const fragment = document.createDocumentFragment();

  //   while (paginationEl.hasChildNodes()) {
  //     paginationEl.removeChild(paginationEl.lastChild!);
  //   }

  //   for (let i = 1; i <= pagination.last; i++) {
  //     const el = document.createElement('a');
  //     el.href = '#';
  //     el.innerHTML = i.toString();

  //     if (i === pagination.current) {
  //       el.className = 'on';
  //     } else {
  //       el.onclick = (function (i) {
  //         return function () {
  //           pagination.gotoPage(i);
  //         };
  //       })(i);
  //     }

  //     fragment.appendChild(el);
  //   }
  //   paginationEl.appendChild(fragment);
  // };

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

  // PlaceSearch 컴포넌트의 onSearch 핸들러에서 searchPlaces 함수를 호출하도록 변경
  function handleSearch(place: string): void {
    searchPlaces(place);
  }

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  console.log(selectedPlaces);

  return (
    <div className={tm('px-[17px]', 'pt-[24px]', 'relative')}>
      <button
        type="button"
        title="페이지 닫기"
        aria-label="페이지 닫기"
        className={tm('absolute', 'top-[12px]', 'right-[17px]')}
        onClick={handleGoBack}
      >
        <Image
          src="/page-close-icon.svg"
          width={14}
          height={14}
          alt="페이지 닫기"
          priority={true}
        />
      </button>
      <PlaceSearch onSearch={handleSearch} />
      <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
      <div id="menu_wrap" className="bg_white">
        <ul id="placesList"></ul>
      </div>
      <div className="z-10 pt-2">
        <SaveButton
          selectedPlaces={selectedPlaces}
          targetPath="/register-post/post-place" // 원하는 페이지 경로 설정
          disabled={selectedPlaces.length === 0}
        />
      </div>
    </div>
  );
}

export default KakaoMap;
