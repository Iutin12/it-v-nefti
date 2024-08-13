import {Text} from "@consta/uikit/Text";
import {TextField} from "@consta/uikit/TextField";
import {GridItem} from "@consta/uikit/Grid";
import React, {useRef, useState} from "react";
import { Tooltip } from '@consta/uikit/Tooltip';
import './ParamAndValue.css'
import {useFlag} from "@consta/uikit/useFlag";


interface ParamAndValueProps {
    text: string;
    min: number;
    max: number;
    // setValid: (value:boolean) => void
}

const ParamAndValue: React.FC<ParamAndValueProps> = (props) => {
    const [value, setValue] = useState<number | null>();
    const handleChange = (value:string|null) => setValue(value? parseFloat(value): null);

    const anchorRef = useRef<HTMLInputElement>(null);
    const [isTooltipVisible, setIsTooltipVisible] = useFlag();

    return <>
    {/* Поле текста */} 
        <GridItem>
            <Text size={'s'}>{props.text}</Text>
        </GridItem>
     {/* Поле ввода */}
        <GridItem className={'flex'}>
            <TextField size={'s'} min={props.min} max={props.max} type={'number'} 
            incrementButtons={false} 
            status={ value && ((value < props.min) || (value >= props.max)) ? 'alert' : undefined} 
            // caption={`От ${props.min} до ${props.max}`}
            onChange={handleChange}
            ref={anchorRef}/>

        <Tooltip
                placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}
                isOpen={value && ((value < props.min) || (value >= props.max)) ? true : false}
                direction="upCenter"
                spareDirection="downStartLeft"
                anchorRef={anchorRef}
                
            >
                <Text view="primary" lineHeight="m" size="xs">
                От {props.min} до {props.max}
                </Text>
            </Tooltip>
        </GridItem>
    </>
}

export default ParamAndValue