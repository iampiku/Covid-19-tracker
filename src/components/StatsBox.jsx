import { Card, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import React from 'react';
import { formatStats } from '../utils';
import './StatsBox.css';

const statsBox = ({ title, cases, active, total, ...props }) => {
	return (
		<Card
			onClick={props.onClick}
			className={`info-box ${active && 'info-box-active'}`}
			style={{ cursor: 'pointer' }}>
			<CardContent>
				<Typography className='infoBox__total'>
					<strong>{title}</strong>
				</Typography>
				<div className='infoBox__cases'>
					<CountUp end={cases} duration='2' />
				</div>
				<Typography className='infoBox__total' color='textPrimary'>
					Total : {formatStats(total)}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default statsBox;
