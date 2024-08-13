import Header from "../../components/Header/Header";
import {Layout} from "@consta/uikit/Layout";
import InputForm from "../../components/InputForm/InputForm";
import SelectWithAdd from "../../components/SelectWithAdd/SelectWithAdd";
import {Text} from "@consta/uikit/Text";
import Footer from "../../components/Footer/Footer";
import React from "react";

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
                    <Text>Здесь будет график</Text>
                </Layout>
            </Layout>
        </Layout>
        <Footer/>
    </>
}

export default MainPage