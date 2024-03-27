import PinForm from '../pinForm/PinForm';
import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MdMyLocation } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import axios from 'axios';
import config from '../../config/workspace';

import 'mapbox-gl/dist/mapbox-gl.css';

import { format } from 'timeago.js';

const Mapcomp = () => {
	const [pins, setPins] = React.useState([]);
	const [currentPopUpOpen, setCurrentPopUpOpen] = React.useState([]);
	const [newPlace, setNewPlace] = React.useState(null);
	const [viewState, setViewState] = React.useState({
		width: '100vw',
		height: '100vh',
		longitude: 77.590624,
		latitude: 12.980833,
		zoom: 17,
	});

	React.useEffect(() => {
		const getPins = async () => {
			try {
				const { data } = await axios.get(
					config.endPoint + '/api/createpins',
				);
				setPins(data);
			} catch (error) {
				console.log(error);
			}
		};
		getPins();
	}, []);

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

	const handleCurrentOpenPopUp = (id, long, lat) => {
		setCurrentPopUpOpen(id);
		setViewState({ ...viewState, longitude: long, latitude: lat });
	};

	const handleNewPin = (e) => {
		// console.log(e);
		let latitude = e.lngLat.lat;
		let longitude = e.lngLat.lng;
		// console.log(longitude, latitude);
		setNewPlace({
			longitude,
			latitude,
		});
		setViewState({
			...viewState,
			longitude,
			latitude,
		});
	};

	console.log(pins);

	return (
		<div className='w-[95vw] h-[89vh] bg-[#E0E0CE] m-auto rounded-lg border border-black relative drop-shadow-md overflow-hidden'>
			<button
				onClick={handleCurrentLocation}
				className='flex justify-center items-center w-[50px] h-[50px] absolute z-10 bg-[#F2F3D9] rounded-full top-4 left-4 border border-black drop-shadow-md'>
				<MdMyLocation size={25} />
			</button>
			<Map
				{...viewState}
				mapboxAccessToken={import.meta.env.VITE_MapBox}
				onMove={(evt) => setViewState(evt.viewState)}
				mapStyle='mapbox://styles/mapbox/streets-v9'
				onDblClick={handleNewPin}>
				{pins.map((p) => {
					return (
						<div key={p._id}>
							<Marker
								longitude={p.longitude}
								latitude={p.latitude}
								anchor='bottom'>
								<IoLocationSharp
									className='cursor-pointer'
									size={50}
									onClick={() => {
										handleCurrentOpenPopUp(
											p._id,
											p.longitude,
											p.latitude,
										);
									}}
								/>
							</Marker>

							{currentPopUpOpen === p._id && (
								<Popup
									className='w-[500px]'
									longitude={p.longitude}
									latitude={p.latitude}
									anchor='top'
									onClose={() => setCurrentPopUpOpen(null)}
									closeOnClick={false}>
									<h1 className='text-sm'>Safety Concern</h1>
									<h2 className='font-bold text-2xl mb-1'>
										{p.safetyConcern === 'others'
											? p.safetyConcernExpirence
											: p.safetyConcern}
									</h2>
									<hr />
									<h1 className='text-sm mt-3'>
										Safety Zone Level
									</h1>
									<h2 className='bg-yellow-500 p-1 rounded-md font-bold text-white text-2xl'>
										{p.safetyZone}
									</h2>

									<h3 className='mt-3 text-sm'>
										Information
									</h3>
									<h4>
										created by{' '}
										<span className='font-bold'>
											{p.userMail}
										</span>
									</h4>
									<h4>{format(p.createdAt)}</h4>
								</Popup>
							)}
						</div>
					);
				})}
				{newPlace && (
					<>
						<Popup
							longitude={newPlace.longitude}
							latitude={newPlace.latitude}
							anchor='top'
							closeOnClick={false}
							onClose={() => setNewPlace(null)}>
							<PinForm
								onClose={() => setNewPlace(null)}
								longitude={newPlace.longitude}
								latitude={newPlace.latitude}
							/>
						</Popup>
					</>
				)}
			</Map>
		</div>
	);
};

export default Mapcomp;
