import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import userLoginContext from './context/context';
import { useState, useEffect } from 'react';

const App = () => {
	const [userMail, setUserMail] = useState('');

	useEffect(() => {
		const userEmail = localStorage.getItem('userEmail');
		setUserMail(userEmail);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('userEmail');
		setUserMail(null);
	};

	return (
		<userLoginContext.Provider value={{ userMail, handleLogout }}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</userLoginContext.Provider>
	);
};

export default App;
