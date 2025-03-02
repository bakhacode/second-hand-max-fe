import { useState } from "react";

type Props = {
  initialValue?: string;
  validators?: Array<(value: string) => void>;
};

export default function useText(options?: Props) {
  const { initialValue = "", validators } = options || {};

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (newVal: string) => {
    if (!validators) {
      setValue(newVal);
      return;
    }

    // Reverse the order of validators to show the first error.
    validators.reverse().forEach((validator) => {
      try {
        validator(newVal);
        setError("");
      } catch (error) {
        setError((error as Error).message);
        return;
      }
    });

    setValue(newVal);
  };

  return {
    value,
    error,
    isError: error !== "",
    onChange,
  };
}
