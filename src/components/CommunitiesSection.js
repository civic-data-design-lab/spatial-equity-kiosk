import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function CommunitiesSection({}) {
    return (
        <div className={"flex-grow-1 issue-section d-flex flex-column black-border"}>
            <div className={"d-flex flex-row justify-content-center align-items-center align-self-center h-100 col-7"}>
                <div className={"p-4"}><FontAwesomeIcon icon={faArrowLeft} className={"fa-2x"}/></div>
                <p className={"m-0"}>Search for a District, Neighborhood or Address to begin exploring</p>
            </div>
        </div>
    )
}