import { useCallback, useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, onChangeHandler, reset];
};

export default useInput;
