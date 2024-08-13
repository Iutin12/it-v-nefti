import http from '../http-common'
import IOilfieldData from "../types/oilfield.type";
import IWellsData from "../types/wells.type";
import IWellsAndOilfieldData from "../types/wellsAndOilfield.type";

const ApiService = () => {
    const getOilfield = () => {
        return http.get<Array<IOilfieldData>>("/oilfield");
    }

    const postOilfield = () => {
        return http.post<IOilfieldData>("/oilfield");
    }

    const postLinkWell = (wellName: string, oilfieldId: string) => {
        return http.post<Array<IWellsAndOilfieldData>>("/oilfield/linkWell");
    }

    const getWells = (oilfieldId: string) => {
        return http.get<Array<IWellsData>>(`${oilfieldId}/wells`);
    }

    // const postCalc = () => {
    //     return http.post<Array>("/calc");
    // }
}
export default ApiService