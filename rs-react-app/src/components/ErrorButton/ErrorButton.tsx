import { useState } from 'react';

const ErrorButton = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleClick = () => {
    setIsError(!isError);
  };

  if (isError) {
    throw new Error('An error occurred due to Error Button click');
  }

  return (
    <button data-testid="errorButton" onClick={handleClick}>
      Error Button
    </button>
  );
};

export default ErrorButton;
