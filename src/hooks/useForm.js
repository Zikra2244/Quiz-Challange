import { useState, useCallback, useEffect } from "react";
import useDebounce from "./useDebounce";

export const useForm = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const debouncedValues = useDebounce(values, 300);

  const validateField = useCallback(
    (name, value) => {
      if (validationSchema[name]) {
        const rules = validationSchema[name];

        if (rules.required && !value) {
          return rules.required.message || "Field is required";
        }

        if (rules.minLength && value.length < rules.minLength.value) {
          return (
            rules.minLength.message ||
            `Minimum ${rules.minLength.value} characters`
          );
        }

        if (rules.maxLength && value.length > rules.maxLength.value) {
          return (
            rules.maxLength.message ||
            `Maximum ${rules.maxLength.value} characters`
          );
        }

        if (rules.pattern && !rules.pattern.value.test(value)) {
          return rules.pattern.message || "Invalid format";
        }
        if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return rules.email.message || "Invalid email address";
        }

        if (rules.validate) {
          const result = rules.validate(value, values);
          if (result !== true) {
            return result;
          }
        }
      }

      return "";
    },
    [validationSchema, values],
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return { isValid, errors: newErrors };
  }, [validateField, values, validationSchema]);

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [debouncedValues, validateForm, touched]);

  useEffect(() => {
    const { isValid } = validateForm();
    setIsValid(isValid);
  }, [values, validateForm]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      const error = validateField(name, values[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField, values],
  );

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (onSubmit) => {
      setIsSubmitting(true);

      const allTouched = {};
      Object.keys(validationSchema).forEach((field) => {
        allTouched[field] = true;
      });
      setTouched(allTouched);

      const { isValid, errors } = validateForm();

      if (isValid) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Form submission error:", error);
        }
      }

      setIsSubmitting(false);
    },
    [validateForm, values, validationSchema],
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,

    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,

    validateField,
    validateForm,
  };
};

export default useForm;
