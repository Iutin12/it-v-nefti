import IOilfieldData from "./oilfield.type";
import IWellsData from "./wells.type";

export default interface IWellsAndOilfieldData {
    well: IWellsData,
    field: IOilfieldData
}
