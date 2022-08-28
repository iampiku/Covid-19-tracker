import numeral from 'numeral';

// sorting function;
export const sortData = (data) => {
	const sortedData = [...data];
	return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// formatting numerical data using numeral for better data representation;
export const formatStats = (stat) =>
	stat ? `+${numeral(stat).format('0.0a')}` : '+0';
