import {Text} from "@consta/uikit/Text";
import {TextField} from "@consta/uikit/TextField";
import {GridItem} from "@consta/uikit/Grid";
import React, {useRef} from "react";
import {Tooltip} from '@consta/uikit/Tooltip';
import './ParamAndValue.css'

interface ParamAndValueProps {
    id: string;
    text: string;
    min: number;
    max: number;
    measure: string;
    value: number | null;
    disabled?: boolean;
    onChange: (name: string, value: number | null) => void
}

const ParamAndValue: React.FC<ParamAndValueProps> = (props) => {
    const anchorRef = useRef<HTMLInputElement>(null);

    return <>
        {/* Поле текста */}
        <GridItem>
            <Text size={'s'}>{props.text}</Text>
        </GridItem>
        {/* Поле ввода */}
        <GridItem className={'flex'}>
            <TextField size={'s'} min={props.min} max={props.max} value={props.value ? props.value.toString() : null}
                       type={'number'}
                       incrementButtons={false}
                       status={props.value && ((props.value < props.min) || (props.value > props.max)) ? 'alert' : undefined}
                // caption={`От ${props.min} до ${props.max}`}
                       onChange={(value) => {
                           props.onChange(props.id, value ? parseFloat(value) : null)
                       }}
                       ref={anchorRef}
                       rightSide={props.measure}
                       disabled={props.disabled}
            />

            <Tooltip
                placeholder="" onPointerEnterCapture={() => {
            }} onPointerLeaveCapture={() => {
            }}
                isOpen={props.value && ((props.value < props.min) || (props.value > props.max)) ? true : false}
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