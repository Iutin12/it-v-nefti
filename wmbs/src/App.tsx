import React from 'react';
import './App.css';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Layout } from '@consta/uikit/Layout';
import InputForm from "./components/InputForm/InputForm";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Text} from "@consta/uikit/Text";
import Authorization from './pages/Authorization/Authorization';


function App() {
  return (
      <Theme preset={presetGpnDefault}>
            <Header/>
          <Layout>
            <Layout flex={1}>
                <InputForm/>
            </Layout>
            <Layout flex={1}>
                <Text align={'center'} >Здесь будет график</Text>
            </Layout>
          </Layout>
          <Footer/>
      </Theme>
      // <Authorization login='' password={121} />
  );
}

export default App;
