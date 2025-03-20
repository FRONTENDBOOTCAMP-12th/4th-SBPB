/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Place {
  road_address_name: string;
  place_name: string;
}

export interface MyPlaceListProps {
  initialPlaces: Place[];
}

export interface PlaceInfo {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string; // 경도 (문자열로 받음)
  y: string; // 위도 (문자열로 받음)
}

export interface PlaceItemProps {
  index: number;
  place: PlaceInfo;
  onClick: (place: PlaceInfo, marker: any) => void;
  marker: any; // marker를 추가로 전달받음
}

export interface PlaceSearchProps {
  onSearch: (place: string) => void;
  disabled?: boolean;
}
