import { useState } from 'react';
import styles from './Search.module.css';

type Props = {
  searchQuery: string;
  onButtonClick: (value: string) => void;
};

const Search = ({ searchQuery, onButtonClick }: Props) => {
  const [input, setInput] = useState<string>(searchQuery);
  const handleClick = (value: string) => {
    if (!value) {
      return;
    }
    onButtonClick(value);
  };

  return (
    <div className={styles.container} data-testid="search">
      <input
        className={styles.search_field}
        type="text"
        placeholder="Search repositories..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className={styles.search_button}
        onClick={() => handleClick(input)}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
