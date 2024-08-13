import {Text} from "@consta/uikit/Text";
import {TextField} from "@consta/uikit/TextField";
import {GridItem} from "@consta/uikit/Grid";
import React, {useState} from "react";
import './ParamAndValue.css'


interface ParamAndValueProps {
    text: string;
    min: number;
    max: number;
    step: number;
    value: string;
}

const ParamAndValue: React.FC<ParamAndValueProps> = (props) => {
    const [value, setValue] = useState<string>(props.value);

    return <>
        <GridItem><Text size={'s'}>{props.text}</Text></GridItem>
        <GridItem className={'flex'}><TextField size={'s'} min={props.min} max={props.max} step={props.step}
                                                type={'number'} incrementButtons={false}/>
        </GridItem>
    </>
}

export default ParamAndValue