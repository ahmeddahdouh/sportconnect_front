import HomePage from "./HomePage";


const myEventPage = ()=>{
    return(
        <HomePage BackendApilink="http://localhost:5000/event/curentEvents"/>
    )
}

export default myEventPage;