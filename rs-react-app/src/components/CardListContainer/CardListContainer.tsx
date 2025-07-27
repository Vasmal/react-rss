import { useEffect, useState } from 'react';
import getData, { type FetchedItem } from '../../features/get-data';
import ErrorButton from '../ErrorButton/ErrorButton';
import Loader from '../Loader/Loader';
import CardList from '../CardList/CardList';

export type RepoParams = {
  id: number;
  full_name: string;
  clone_url: string;
  description: string | null;
  homepage?: string | null;
  language?: string | null;
  stargazers_count: number;
};

type Props = {
  searchQuery: string;
};

const CardListContainer = ({ searchQuery }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [repos, setRepos] = useState<RepoParams[]>([]);

  useEffect(() => {
    let controller: null | AbortController = null;

    const fetchData = async (query: string) => {
      if (controller) {
        controller.abort();
      }

      controller = new AbortController();
      setLoading(true);
      setError(null);

      try {
        const data = await getData(query, controller.signal);
        setRepos(formatData(data));
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData(searchQuery);

    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [searchQuery]);

  const formatData = (data: FetchedItem[]) => {
    const formattedData: RepoParams[] = data.map((repo) => ({
      id: repo.id,
      full_name: repo.full_name,
      clone_url: repo.clone_url,
      description: repo.description,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
    }));

    return formattedData;
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p data-testid="error">{error.message}</p>;
  }

  if (repos.length === 0) {
    return <p>No results found!</p>;
  }

  return (
    <div data-testid="card-list-container">
      <CardList repos={repos} />
      <ErrorButton />
    </div>
  );
};

export default CardListContainer;
