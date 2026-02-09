import React from 'react';
import { IranMapSvg } from './IranMapSvg';

interface IranMapProps {
  hoveredProvince: string | null;
  selectedProvince: string | null;
  onProvinceHover: (provinceName: string | null) => void;
  onProvinceClick: (provinceName: string) => void;
}

export function IranMap({ hoveredProvince, selectedProvince, onProvinceHover, onProvinceClick }: IranMapProps) {
  return (
    <div onMouseLeave={() => onProvinceHover(null)}>
      <IranMapSvg
        className="w-full h-auto"
        hoveredProvince={hoveredProvince}
        selectedProvince={selectedProvince}
        onProvinceHover={onProvinceHover}
        onProvinceClick={onProvinceClick}
      />
    </div>
  );
}