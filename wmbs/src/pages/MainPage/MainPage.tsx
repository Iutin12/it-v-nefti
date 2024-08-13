import Header from "../../components/Header/Header";
import {Layout} from "@consta/uikit/Layout";
import InputForm from "../../components/InputForm/InputForm";
import SelectWithAdd from "../../components/SelectWithAdd/SelectWithAdd";
import Footer from "../../components/Footer/Footer";
import Chart from "../../components/Chart/Chart";
import '../MainPage/MainPage.css'
import {useState} from "react";
import IWellsAndOilfieldData from "../../types/wellsAndOilfield.type";
import IPointsData from "../../types/points.type";

const MainPage = () => {

    const [selectData, setSelectData] = useState<IWellsAndOilfieldData | null>(null);
    const [points, setPoints] = useState<IPointsData | null>(null);

    return <>
        <Header/>
        <Layout>
            <Layout flex={1}>
                <InputForm disabled={selectData?.field && selectData.well ? false : true} selects={selectData}
                           setPoints={setPoints}/>
            </Layout>
            <Layout flex={2} direction="column" className={'main-left-container'}>
                <SelectWithAdd setSelectData={setSelectData}/>
                <Layout flex={3} direction="column">
                    <Chart points={points}/>
                </Layout>
            </Layout>
        </Layout>
        <Footer/>
    </>
}

export default MainPage