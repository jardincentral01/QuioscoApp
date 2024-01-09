import FronteraContext from "@/context/FronteraProvider";
import { useContext } from "react";

function useFrontera(){
    return useContext(FronteraContext);
}

export default useFrontera;