import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

import './Popup.css';

// sorting function;
export const sortData = (data) => {
	const sortedData = [...data];
	return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// defining circle color;
const circleColour = {
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

// building circle popups on the map with respect to cases, recoverd & deaths;
export const circleMap = (data, casesType) =>
	data.map((country) => (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			color={circleColour[casesType].hex}
			fillColor={circleColour[casesType].hex}
			fillOpacity={0.3}
			radius={
				Math.sqrt(country[casesType]) * circleColour[casesType].multiplier
			}>
			<Popup>
				<div className='info-container'>
					<div
						className='info-flag'
						style={{
							backgroundImage: `url(${country.countryInfo.flag})`,
						}}></div>
					<div className='info-name'>{country.country}</div>
					<div className='info-confirmed'>
						Cases: {numeral(country.cases).format('0,0')}
					</div>
					<div className='info-recovered'>
						Recovered: {numeral(country.recovered).format('0,0')}
					</div>
					<div className='info-deaths'>
						Deaths: {numeral(country.deaths).format('0,0')}
					</div>
				</div>
			</Popup>
		</Circle>
	));

// formating numeraical data using numeral for better data representation;
export const formatStats = (stat) =>
	stat ? `+${numeral(stat).format('0.0a')}` : '+0';
