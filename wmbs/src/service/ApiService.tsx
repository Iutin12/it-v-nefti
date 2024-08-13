import http from '../http-common'
import IOilfieldData from "../types/oilfield.type";
import IWellsData from "../types/wells.type";
import IWellsAndOilfieldData from "../types/wellsAndOilfield.type";

export default class ApiService {
    static getOilfield() {
        return http.get<Array<IOilfieldData>>("/oilfield");
    }

    static postOilfield(name: string) {
        const data = {
            name: name,
        }
        return http.post<IOilfieldData>('/oilfield', data);
    }

    static postLinkWell(wellName: string, oilfieldId: string) {
        const data = {
            wellName: wellName,
            oilfieldId: oilfieldId
        }
        return http.post<IWellsAndOilfieldData>("/oilfield/linkWell", data);
    }

    static getWells(oilfieldId: string) {
        return http.get<Array<IWellsData>>(`/oilfield/${oilfieldId}/wells`);
    }

    // static postCalc () {
    //     return http.post<Array>("/calc");
    // }
}