import { useState, useCallback } from "react";

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  const [isForm, setIsForm] = useState(initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
    if (value.length > 0) {
      setIsForm((isForm) => ({ ...isForm, [name]: true }));
    } else {
      setIsForm((isForm) => ({ ...isForm, [name]: false }));
    }
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset, isForm];
}

export default useInputs;
