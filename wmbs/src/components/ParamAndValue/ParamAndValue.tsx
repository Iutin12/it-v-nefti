import {Text} from "@consta/uikit/Text";
import {TextField} from "@consta/uikit/TextField";
import {GridItem} from "@consta/uikit/Grid";

interface ParamAndValueProps {
    text: string;
}


const ParamAndValue = (props: ParamAndValueProps) => {
    return <>
        <GridItem><Text size={'s'} align={'center'}>{props.text}</Text></GridItem>
        <GridItem><TextField size={'s'} type={'number'}/></GridItem>
    </>
}

export default ParamAndValue