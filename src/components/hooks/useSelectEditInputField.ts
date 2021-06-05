import {
  RefObject,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";

interface UseSelectEditInputFieldProps {
  fieldId?: string;
  onCreate: (field: string) => void;
  onEdit: (id: string, field: string) => void;
  autoFocus?: boolean;
}

interface UseSelectEditInputFieldResult {
  field: string;
  setField: (s: string) => void;
  isEditing: boolean;
  setIsEditing: (bool: boolean) => void;
  handleBlur: () => void;
  handleChange: (e:any) => void;
  inputRef: any;
}

const useSelectEditInputField = ({
  fieldId,
  onCreate,
  onEdit,
  autoFocus = false,
}: UseSelectEditInputFieldProps): UseSelectEditInputFieldResult => {
  const [field, setField] = useState("");
  const [isEditing, setIsEditing] = useState(autoFocus);
  const inputRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (isEditing && inputRef?.current) inputRef?.current?.focus();
    }, [isEditing, inputRef]);

    const handleEdit = () => {
      if (fieldId && field.length> 0) {
        onEdit(fieldId, field);
        setIsEditing(false);
        setField(field);
      } else {
        setIsEditing(false);
      }
    };
    const handleCreate = () => {
      if (field.length> 0) {
        onCreate(field);
        setIsEditing(false);
        setField("");
      } else {
        setIsEditing(false);
      }
    };
  
 
    const handleChange = (value:any) =>{
      console.log(value)
      setField(value);
    }
    const handleBlur = () => {
      if (fieldId) handleEdit();
      else handleCreate();
    };
  
    return {
      field,
      setField,
      isEditing,
      setIsEditing,
      handleChange,
      handleBlur,
      inputRef,
    };
  };
  
  export default useSelectEditInputField;
  