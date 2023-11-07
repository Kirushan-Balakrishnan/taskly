import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Input, InputProps } from "reactstrap";

export const FormInput = <T extends FieldValues>(
  props: UseControllerProps<T> & InputProps
) => {
  const { name, id, rules, control, defaultValue, ...inputProps } = props;

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    field: { ref, ...rest },
  } = useController({ name, control, rules, defaultValue });

  return <Input ref={ref} id={id} {...rest} {...inputProps} />;
};
