import Img from '../photos/hospital.jpg'

function Homeimage() {
    return (
        <div
            className="flex flex-wrap">
            <img src={Img} alt="..." style={{ height: '400px', width: '100%' }} />
        </div>);
}


export default Homeimage;