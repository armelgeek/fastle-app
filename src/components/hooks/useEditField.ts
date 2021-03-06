import {
  RefObject,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";

interface UseEditFieldProps {
  fieldId?: string;
  onCreate: (field: string) => void;
  onEdit: (id: string, field: string) => void;
  autoFocus?: boolean;
}

interface UseEditFieldResult {
  field: string;
  setField: (s: string) => void;
  isEditing: boolean;
  setIsEditing: (bool: boolean) => void;
  onKeyPressed: (event: KeyboardEvent) => void;
  handleBlur: () => void;
  handleChange: (e:any) => void;
  inputRef: any;
}

const useEditField = ({
  fieldId,
  onCreate,
  onEdit,
  autoFocus = false,
}: UseEditFieldProps): UseEditFieldResult => {
  const [field, setField] = useState("");
  const [isEditing, setIsEditing] = useState(autoFocus);
  const inputRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isEditing && inputRef?.current) inputRef?.current?.focus();
  }, [isEditing, inputRef]);

  const handleCreate = () => {
    if (field.length > 0) {
      onCreate(field);
      setIsEditing(false);
      setField("");
    } else {
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    if (fieldId && field.length > 0) {
      onEdit(fieldId, field);
      setIsEditing(false);
      setField(field);
    } else {
      setIsEditing(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setField(e.target.value);

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
    onKeyPressed,
    handleBlur,
    handleChange,
    inputRef,
  };
};

export default useEditField;
