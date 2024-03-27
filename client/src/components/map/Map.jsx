import PinForm from '../pinForm/PinForm';
import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import { MdMyLocation } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';

import 'mapbox-gl/dist/mapbox-gl.css';

const Mapcomp = () => {
	const [viewState, setViewState] = React.useState({
		width: '100vw',
		height: '100vh',
		longitude: 77.590624,
		latitude: 12.980833,
		zoom: 17,
	});

	console.log(viewState.longitude);
	console.log(viewState.latitude);

	const handleCurrentLocation = async () => {
		const result = navigator.geolocation.getCurrentPosition(
			//success
			(position) => {
				const { latitude, longitude } = position.coords;
				setViewState({
					...viewState,
					longitude: longitude,
					latitude: latitude,
					zoom: 17,
				});
			},
			//rejected
			() => {
				alert('we need location service');
			},
		);
	};

	return (
		<div className='w-[95vw] h-[89vh] bg-[#E0E0CE] m-auto rounded-lg border border-black relative drop-shadow-md overflow-hidden'>
			{/* <PinForm /> */}
			<button
				onClick={handleCurrentLocation}
				className='flex justify-center items-center w-[50px] h-[50px] absolute z-10 bg-[#F2F3D9] rounded-full top-4 left-4 border border-black drop-shadow-md'>
				<MdMyLocation size={25} />
			</button>
			<Map
				{...viewState}
				mapboxAccessToken={import.meta.env.VITE_MapBox}
				onMove={(evt) => setViewState(evt.viewState)}
				mapStyle='mapbox://styles/mapbox/streets-v9'>
				<Marker
					longitude={viewState.longitude}
					latitude={viewState.latitude}
					// longitude={77.590624}
					// latitude={12.980833}
					anchor='bottom'>
					<IoLocationSharp size={50} />
				</Marker>
			</Map>
		</div>
	);
};

export default Mapcomp;
