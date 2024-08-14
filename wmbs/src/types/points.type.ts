export default interface IPointsData {
    point: number[],
    vlp: {
        pwf: number[],
        q: number[]
    },
    irp: {
        Q: number[],
        p_wf: number[]
    }
}
