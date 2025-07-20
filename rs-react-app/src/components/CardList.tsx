import { Component } from 'react';
import getData, { type FetchedItem } from '../features/get-data';
import CardItem from './CardItem/CardItem';
import ErrorButton from './ErrorButton';
import Loader from './Loader/Loader';

export type RepoParams = {
  id: number;
  full_name: string;
  clone_url: string;
  description: string | null;
  homepage?: string | null;
  language?: string | null;
  stargazers_count: number;
};

type State = {
  loading: boolean;
  error: Error | null;
  repos: RepoParams[];
};

type Props = {
  searchQuery: string;
};
class CardList extends Component<Props, State> {
  state: State = {
    loading: true,
    error: null,
    repos: [],
  };

  async componentDidMount() {
    this.fetchData(this.props.searchQuery);
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.fetchData(this.props.searchQuery);
    }
  }

  fetchData = async (query: string) => {
    this.setState({ loading: true, error: null });
    try {
      const data = await getData(query);
      this.setState({ repos: this.formatData(data), error: null });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  formatData = (data: FetchedItem[]) => {
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

  render() {
    const { error, loading, repos } = this.state;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    if (repos.length === 0) {
      return <p>No results found!</p>;
    }

    return (
      <div>
        {repos.map((repo) => (
          <CardItem key={repo.id} {...repo} />
        ))}
        <ErrorButton />
      </div>
    );
  }
}

export default CardList;
