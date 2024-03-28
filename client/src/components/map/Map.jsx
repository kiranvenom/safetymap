import PinForm from '../pinForm/PinForm';
import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MdMyLocation } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import axios from 'axios';
import config from '../../config/workspace';

import 'mapbox-gl/dist/mapbox-gl.css';

import { format } from 'timeago.js';

import safetyColors from '../../data/safeColors';

import { FaSearchLocation } from 'react-icons/fa';

import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const Mapcomp = () => {
	const [pins, setPins] = React.useState([]);
	const [currentPopUpOpen, setCurrentPopUpOpen] = React.useState([]);
	const [newPlace, setNewPlace] = React.useState(null);
	const [searchLocation, setSearchLocation] = React.useState('');
	const [viewState, setViewState] = React.useState({
		longitude: 77.60491575678515,
		latitude: 12.874669599860255,
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

	const handleSearchLocation = (e) => {
		setSearchLocation(e.target.value);
	};

	const submitSearchLocation = async (e) => {
		e.preventDefault();

		const { data } = await axios.get(
			`https://api.mapbox.com/search/searchbox/v1/forward?q=${searchLocation}&access_token=${
				import.meta.env.VITE_MapBox
			}`,
		);

		let slatitude = data.features[0].properties.coordinates.latitude;
		let slongitude = data.features[0].properties.coordinates.longitude;

		setViewState({
			...viewState,
			longitude: slongitude,
			latitude: slatitude,
		});

		setSearchLocation('');
	};

	return (
		<div className='w-full h-screen lg:w-[95vw] lg:h-[89vh] bg-[#E0E0CE] m-auto rounded-lg border border-black relative drop-shadow-md overflow-hidden'>
			<button
				onClick={handleCurrentLocation}
				className='flex justify-center items-center w-[50px] h-[50px] absolute z-10 bg-[#F2F3D9] rounded-full top-4 left-4 border border-black drop-shadow-md'>
				<MdMyLocation size={25} />
			</button>
			<div className='absolute z-10 right-4 top-4 bg-[#F2F3D9] flex justify-center items-center rounded-full border border-black overflow-hidden px-2 py-2 gap-2'>
				<FaSearchLocation size={25} />
				<form onSubmit={(e) => submitSearchLocation(e)}>
					<input
						onChange={handleSearchLocation}
						value={searchLocation}
						name='searchLocation'
						type='text'
						placeholder='Search Location'
						className='bg-[#F2F3D9] outline-none border-none w-[130px]'
					/>
					<button
						className='border border-black px-4 py-1 rounded-full bg-slate-500 text-white'
						type='submit'>
						Search
					</button>
				</form>
			</div>
			<a
				target='_blank'
				className='absolute top-[4.5rem] right-[1.2rem] z-10 bg-[#F2F3D9] px-4 py-1 rounded-full font-bold border border-black'
				href='https://github.com/kiranvenom/safetymap'>
				Created by KIRAN
			</a>
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
								id='tt'
								longitude={p.longitude}
								latitude={p.latitude}
								anchor='bottom'>
								<Tooltip id='tt' />
								<a
									data-tooltip-id='tt'
									data-tooltip-content={p.comments}
									data-tooltip-place='top'>
									<IoLocationSharp
										id='tt'
										color={safetyColors[p.safetyZone]}
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
								</a>
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
									<h2
										style={{
											backgroundColor:
												safetyColors[p.safetyZone],
										}}
										className={`p-1 px-2 rounded-md font-bold text-2xl shadow-lg text-white`}>
										{p.safetyZone}
									</h2>

									<h3 className='mt-3 text-sm'>
										Information
									</h3>
									<h4>
										created by{'  '}
										<span className='font-bold bg-slate-200 px-2 rounded-full'>
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
