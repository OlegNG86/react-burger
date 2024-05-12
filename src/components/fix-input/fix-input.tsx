import {TPropsInputYa} from "./fix-input.types";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";


const InputYa = (props: TPropsInputYa) => {
  // @ts-ignore
  return (<Input {...props}/>);
};

export default InputYa;