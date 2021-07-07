import { useEffect, useState } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import axios from 'axios';

import { ProvideAuth } from './ProvideAuth';
import PrivateRoute from './PrivateRoute';
import LoginPage from './LoginPage';
import Navi from './Navi';
import GifViewer from './GifViewer';

function App() {
    const [gifs, setGifs] = useState([]);
    const [savedGifs, setSavedGifs] = useState([]);
    const [gifInput, setGifInput] = useState('');

    useEffect(() => {
        const savedGifs = localStorage.getItem('savedGifs');

        if (savedGifs) setSavedGifs(JSON.parse(savedGifs));
    }, []);

    const handleInput = (event) => {
        setGifInput(event.target.value);
    };

    const handleRemoveGif = (gif) => {
        const newArray = savedGifs.filter((savedGif) => savedGif !== gif);

        setSavedGifs(newArray);
        localStorage.setItem('savedGifs', JSON.stringify(newArray));
    };

    const handleSaveGif = (gif) => {
        const newArray = [...savedGifs, gif];

        setSavedGifs(newArray);
        localStorage.setItem('savedGifs', JSON.stringify(newArray));
    };

    const handleSearchGifs = async () => {
        if (!gifInput) return;

        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?&q=${gifInput}&api_key=APIKEYGOESHERE&rating=g&limit=10`);

        setGifs(res.data.data);
    };

    return (
        <ProvideAuth>
            <Router>
                <div>
                    <Navi />

                    <Switch>
                        <PrivateRoute path='/saved'>
                            <GifViewer
                                gifs={savedGifs}
                                buttonAction={handleRemoveGif}
                                buttonText={'remove'}
                            />
                        </PrivateRoute>
                        <PrivateRoute path='/search'>
                            <input onChange={handleInput} value={gifInput} />
                            <button onClick={handleSearchGifs}>search</button>
                            <GifViewer
                                gifs={gifs}
                                buttonAction={handleSaveGif}
                                buttonText={'save'}
                            />
                        </PrivateRoute>

                        <Route path='/login' exact>
                            <LoginPage />
                        </Route>

                        <Route path='/'>
                            <h1>Homepage</h1>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
}

export default App;
