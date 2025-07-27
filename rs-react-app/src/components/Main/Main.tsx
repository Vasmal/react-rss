import Search from '../Search/Search';

import ErrorBoundary from '../ErrorBoundary';
import styles from './Main.module.css';
import CardListContainer from '../CardListContainer/CardListContainer';
import useSearchStorage from '../../custom-hooks/useSearchStorage';

const Main = () => {
  const { searchQuery, setSearchQuery } = useSearchStorage();

  const handleStateChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Here you can find any repo from the GitHub.</h1>
        <p>
          Search repositories by name or topic and select your preferred one
        </p>
        <p className={styles.search_examples}>
          {`Try: 'javascript framework', 'python bot', 'mobile game', or any
            tech stack`}
        </p>
        <Search
          searchQuery={searchQuery || ''}
          onButtonClick={handleStateChange}
        />
      </header>
      <main>
        <ErrorBoundary>
          <CardListContainer searchQuery={searchQuery || ''} />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Main;
