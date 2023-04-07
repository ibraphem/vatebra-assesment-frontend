import FullPageLoader from "./loaders/FullPageLoader";
import AddTaskModal from "./modals/AddTaskModal";


const ReduxLayoutIndex = () => {
    return (
        <>
           <AddTaskModal/> 
           <FullPageLoader/>
        </>
    );
};

export default ReduxLayoutIndex;