import { useState } from 'react';

function useSearchStorage() {
  const [searchQuery, setSearchQueryState] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );

  const setSearchQuery = (value: string) => {
    const trimmedValue = value.trim();
    setSearchQueryState(trimmedValue);
    localStorage.setItem('searchQuery', trimmedValue);
  };

  return { searchQuery, setSearchQuery };
}

export default useSearchStorage;
