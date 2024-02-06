import Image from "../../node_modules/next/image";
import HeaderPicture from "../assets/images/image-header.png";

export default function Header() {

    return (
        <div>
        <h2 className="title-header">Plus qu'un <span className="header-title-orange">trajet</span>, une <span className="header-title-orange">expérience</span> !</h2>
        <Image src={HeaderPicture} alt="header" className="image-header" />
        </div>
    )
}