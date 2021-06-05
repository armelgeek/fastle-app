import {
  RefObject,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";

interface UseAddFieldProps {
  onCreate: (field: string) => void;
  autoFocus?: boolean;
}

interface UseAddFieldResult {
  field: string;
  setField: (s: string) => void;
  onKeyPressed: (event: KeyboardEvent) => void;
  handleBlur: () => void;
  handleChange: (e: ChangeEvent<HTMLElement>) => void;
  inputRef: any;
}

const useAddField = ({
  onCreate,
  autoFocus = false,
}: UseAddFieldProps): UseAddFieldResult => {
  const [field, setField] = useState("");
  const inputRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (inputRef?.current) inputRef?.current?.focus();
  }, [inputRef]);

  const handleCreate = () => {
    if (field.length > 0) {
      onCreate(field);
      setField("");
    } else {
      
    }
  };
  const handleChange = (e: any) =>
    setField(e.target.value);

  const handleBlur = () => {
      handleCreate();
  };

  const onKeyPressed = async (event: KeyboardEvent) => {
    if (event.key === "Enter") {
     await handleCreate();
    }
  };

  return {
    field,
    setField,
    onKeyPressed,
    handleBlur,
    handleChange,
    inputRef,
  };
};

export default useAddField;
