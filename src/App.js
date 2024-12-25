import './App.css';
import PopupAdd from './comps/PopupAdd.js';
import PopupHelp from './comps/PopupHelp.js';
import { useEffect, useState } from 'react';
import { db, ref, get } from "./utils/firebase.js";

function App() {
	const [popupOne, setPopupOne] = useState(false);
	const [popupTwo, setPopupTwo] = useState(false);
	const [userData, setUserData] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const dbRef = ref(db, 'users');
			const snapshot = await get(dbRef);

			if (snapshot.exists()) {
				const data = snapshot.val();
				const users = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}));

				setUserData(users);
			} else {
				console.log("No data available");
			}
		};
		fetchData();
		// eslint-disable-next-line
	}, []);

	const size = userData.length;

	useEffect(() => {
		if (size > 0) {
			const index = Math.floor(Math.random() * size);
			setCurrentIndex(index);
		}
	}, [userData]);

	const handleDir = (offset) => {
		setCurrentIndex((currentIndex) => (currentIndex + offset + size) % size);
	};

	const currentUser = userData[currentIndex];

	return (
		<div className="App">
			<header className='nav-bar-header'>
				<div className='title'>theDevilWebs</div>
				<div className='url-viewer'>
					<input className='url-input-place' value={currentUser?.url} readOnly />
					<button onClick={() => window.open(currentUser?.url, "_blank")} className='link-btn last-one'>
						<img className='custom-icon' width="16" height="16" src="https://img.icons8.com/sf-regular/480/external-link.png" alt="external-link" />
					</button>
				</div>
				<div className='btn-grp'>
					<button className='add-new-btn' onClick={() => setPopupOne(true)}>Click here to add your website</button>
					<PopupAdd trigger={popupOne} setTrigger={setPopupOne} liveData={userData}></PopupAdd>
					<button className='help-btn last-one' onClick={() => setPopupTwo(true)}>Help</button>
					<PopupHelp trigger={popupTwo} setTrigger={setPopupTwo}></PopupHelp>
				</div>
			</header>
			<div className='main-class'>
				<button className='prev-btn' onClick={() => handleDir(-1)}>
					<img width="20" height="20" src="https://img.icons8.com/sf-regular/100/left.png" alt="right" />
				</button>
				<iframe className='the-main-web' title='portfolio-website' src={currentUser?.url}></iframe>
				<button className='next-btn' onClick={() => handleDir(1)}>
					<img width="20" height="20" src="https://img.icons8.com/sf-regular/100/right.png" alt="right" />
				</button>
			</div>
		</div>
	);
}

export default App;
