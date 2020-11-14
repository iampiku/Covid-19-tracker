import {
	FormControl,
	MenuItem,
	Select,
	Card,
	CardContent,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import StatsBox from './components/StatsBox';
import Table from './components/Table';
import Graph from './components/Graph';
import Map from './components/Map';
import { sortData } from './utils';

import './App.css';
import 'leaflet/dist/leaflet.css';

//https://disease.sh/v3/covid-19/countries/{countryCode}?strict=true
//https://disease.sh/v3/covid-19/all
//https://disease.sh/v3/covid-19/countries
//https://disease.sh/v3/covid-19/historical?lastdays=120

const App = () => {
	const [countries, setCountries] = useState([]);
	const [defaultOption, setDefaultOption] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [casesType, setCasesType] = useState('cases');
	const [mapCoordinates, setMapCoordinates] = useState({
		lat: 20.5937,
		lng: 78.9629,
	});
	const [mapZoom, setMapZoom] = useState(3.8);
	const [mapCountries, setMapCountries] = useState([]);

	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then((responce) => responce.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((i) => ({
						name: i.country,
						value: i.countryInfo.iso2,
					}));
					const sortedCountries = sortData(data);
					setTableData(sortedCountries);
					setCountries(countries);
					setMapCountries(data);
				});
		};
		getCountriesData();
	}, []);

	const onCountryChange = (event) => {
		const countryCode = event.target.value;
		setDefaultOption(countryCode);

		const apiUrl =
			countryCode === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				setDefaultOption(countryCode);
				setCountryInfo(data);
				console.log(data);
				setMapCoordinates([data.countryInfo.lat, data.countryInfo.long]);
				setMapZoom(4);
			});
	};

	return (
		<div className='app'>
			<div className='app__left'>
				<div className='app__header'>
					<h1 style={{ color: '#001858' }}>COVID-19 Tracker</h1>
					<FormControl className='app__dropdown'>
						<Select
							style={{ backgroundColor: '#8bd3dd' }}
							onChange={onCountryChange}
							variant='outlined'
							value={defaultOption}>
							<MenuItem value='worldwide'>World Wide 🌍</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className='app__stats'>
					<StatsBox
						active={casesType === 'cases'}
						onClick={() => setCasesType('cases')}
						title='Covid Cases 🤕'
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
					/>
					<StatsBox
						active={casesType === 'recovered'}
						onClick={() => setCasesType('recovered')}
						title='Recovered 🧑‍⚕️'
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
					/>
					<StatsBox
						active={casesType === 'deaths'}
						onClick={() => setCasesType('deaths')}
						title='Deaths 💀'
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
					/>
				</div>
				<Map
					casesType={casesType}
					countries={mapCountries}
					center={mapCoordinates}
					zoom={mapZoom}
				/>
			</div>

			<div className='app__rigth'>
				<Card style={{ backgroundColor: '#fef6e4' }}>
					<CardContent>
						<div className='table__heading'>
							<h3>Live Cases By Countries</h3>
						</div>
						<Table countries={tableData} />
						<div className='graph'>
							<h3>Worldwide new {casesType}</h3>
							<Graph casesType={casesType} />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default App;
