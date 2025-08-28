import { routes } from "../../router";
import { useRoutes } from "react-router-dom";


const AllRouter = () =>{
    const element = useRoutes(routes);
    return (
        <>
            {element}
        </>
    )
}
export default AllRouter;