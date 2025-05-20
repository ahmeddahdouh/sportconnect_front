import HomePage from "../HomePage";


const myEventPage = ()=>{
    return(
        <HomePage BackendApilink={`${process.env.REACT_APP_BASE_URL}/event/curentEvents`}/>
    )
}

export default myEventPage;