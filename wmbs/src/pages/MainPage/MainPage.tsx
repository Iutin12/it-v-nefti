import Header from "../../components/Header/Header";
import {Layout} from "@consta/uikit/Layout";
import InputForm from "../../components/InputForm/InputForm";
import SelectWithAdd from "../../components/SelectWithAdd/SelectWithAdd";
import Footer from "../../components/Footer/Footer";
import React from "react";
import Chart from "../../components/Chart/Chart";

const MainPage = () => {
    return <>
        <Header/>
        <Layout>
            <Layout flex={1}>
                <InputForm/>
            </Layout>
            <Layout flex={2} direction="column">
                <Layout>
                    <SelectWithAdd label={'Месторождение'}/>
                    <SelectWithAdd label={'Скважина'}/>
                </Layout>
                <Layout>
                    <Chart/>
                </Layout>
            </Layout>
        </Layout>
        <Footer/>
    </>
}

export default MainPage