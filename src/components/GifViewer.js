import '../styles/GifViewer.css';

const GifViewer = (props) => (
    //props.removeGifs
    <div className='gifs-container'>
        {props.gifs.map((gif, index) => {
            return (
                <div key={index} className='gif-container'  style={{ display: 'grid', alignContent: 'center'}}>
                    <img src={gif.images.fixed_width.url} />
                    <button onClick={() => props.buttonAction(gif)}>{props.buttonText}</button>
                </div>
            )
        })}
    </div>
);

export default GifViewer;