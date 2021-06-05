import {
  RefObject,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";

interface UseNumberEditInputFieldProps {
  fieldId?: string;
  onCreate: (field: number) => void;
  onEdit: (id: string, field: number) => void;
  autoFocus?: boolean;
}

interface UseNumberEditInputFieldResult {
  field: number;
  setField: (s: number) => void;
  isEditing: boolean;
  setIsEditing: (bool: boolean) => void;
  onKeyPressed: (event: KeyboardEvent) => void;
  handleBlur: () => void;
  handleChange: (e:any) => void;
  inputRef: any;
}

const useNumberEditInputField = ({
  fieldId,
  onCreate,
  onEdit,
  autoFocus = false,
}: UseNumberEditInputFieldProps): UseNumberEditInputFieldResult => {
  const [field, setField] = useState(0);
  const [isEditing, setIsEditing] = useState(autoFocus);
  const inputRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (isEditing && inputRef?.current) inputRef?.current?.focus();
    }, [isEditing, inputRef]);

    const handleEdit = () => {
      if (fieldId && field> 0) {
        onEdit(fieldId, field);
        setIsEditing(false);
        setField(field);
      } else {
        setIsEditing(false);
      }
    };
    const handleCreate = () => {
      if (field> 0) {
        onCreate(field);
        setIsEditing(false);
        setField(0);
      } else {
        setIsEditing(false);
      }
    };
  
 
    const handleChange = (value:any) =>{
      setField(value);
    }
    const handleBlur = () => {
      if (fieldId) handleEdit();
      else handleCreate();
    };
  
    const onKeyPressed = async (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (fieldId) await handleEdit();
        else await handleCreate();
      }
    };
  
    return {
      field,
      setField,
      isEditing,
      setIsEditing,
      handleChange,
      onKeyPressed,
      handleBlur,
      inputRef,
    };
  };
  
  export default useNumberEditInputField;
  