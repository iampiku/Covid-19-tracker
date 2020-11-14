import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { circleMap } from '../utils';
import './Map.css';

function Map({ countries, casesType, center, zoom }) {
	return (
		<div className='map'>
			<MapContainer center={center} zoom={zoom}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				{circleMap(countries, casesType)}
			</MapContainer>
		</div>
	);
}

export default Map;