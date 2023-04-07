import { useSelector } from "react-redux";
import "../../assets/css/fullPageLoader.css"

const FullPageLoader = () => {
    const loader = useSelector((state) => state.layout?.loader)

    console.log(loader);
    return (
        loader?.status ? (
            <div className="page_processing_modal ">
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ): null
      );
};

export default FullPageLoader;