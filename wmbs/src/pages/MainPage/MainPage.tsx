import Header from "../../components/Header/Header";
import {Layout} from "@consta/uikit/Layout";
import InputForm from "../../components/InputForm/InputForm";
import SelectWithAdd from "../../components/SelectWithAdd/SelectWithAdd";
import Footer from "../../components/Footer/Footer";
import Chart from "../../components/Chart/Chart";
import '../MainPage/MainPage.css'

const MainPage = () => {

    return <>
        <Header/>
        <Layout>
            <Layout flex={1}>
                <InputForm/>
            </Layout>
            <Layout flex={2} direction="column" className={'main-left-container'}>
                <SelectWithAdd/>
                <Layout flex={3} direction="column">
                    <Chart/>
                </Layout>
            </Layout>
        </Layout>
        <Footer/>
    </>
}

export default MainPage