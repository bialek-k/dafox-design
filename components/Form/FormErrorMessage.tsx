import React from "react";

interface FieldErrorMessageProps {
  message: string | undefined;
}

export default function FormErrorMessage({
  message,
}: FieldErrorMessageProps): React.ReactElement {
  return (
    <p key={message} className="mt-1 text-sm text-red-500">
      {message}
    </p>
  );
}
