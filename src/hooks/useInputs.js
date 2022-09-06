import { useState, useCallback } from "react";

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  const [isForm, setIsForm] = useState(initialForm);
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    if (value.length > 0) {
      setIsForm((isForm) => ({ ...isForm, [name]: true }));
    } else {
      setIsForm((isForm) => ({ ...isForm, [name]: false }));
    }
    setForm((form) => ({ ...form, [name]: value }));
    const validationValue = Object.values(isForm);
    const result = validationValue.filter((word) => word !== true);
    if (result.length === 0) {
      setIsSubmit(true);
    }
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset, isForm, isSubmit];
}

export default useInputs;
