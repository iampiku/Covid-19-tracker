import React from 'react';
import { Map as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

import './Map.css';
import '../Popup.css';

const circleColor = {
	cases: {
		hex: '#CC1034',
		multiplier: 550,
	},
	recovered: {
		hex: '#c2ffc2',
		multiplier: 800,
	},
	deaths: {
		hex: '#fb4443',
		multiplier: 1000,
	},
};

function Map({ countries, casesType, center, zoom }) {
	return (
		<div className='map'>
			<LeafletMap center={center} zoom={zoom}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				{countries.map((country, index) => (
					<Circle
						key={index}
						center={[
							country.countryInfo.lat,
							country.countryInfo.long,
						]}
						color={circleColor[casesType].hex}
						fillColor={circleColor[casesType].hex}
						fillOpacity={0.3}
						radius={
							Math.sqrt(country[casesType]) *
							circleColor[casesType].multiplier
						}>
						<Popup>
							<div className='info-container'>
								<div
									className='info-flag'
									style={{
										backgroundImage: `url(${country.countryInfo.flag})`,
									}}></div>
								<div className='info-name'>
									{country.country}
								</div>
								<div className='info-confirmed'>
									Cases:{' '}
									{numeral(country.cases).format('0,0')}
								</div>
								<div className='info-recovered'>
									Recovered:{' '}
									{numeral(country.recovered).format('0,0')}
								</div>
								<div className='info-deaths'>
									Deaths:{' '}
									{numeral(country.deaths).format('0,0')}
								</div>
							</div>
						</Popup>
					</Circle>
				))}
			</LeafletMap>
		</div>
	);
}

export default Map;
