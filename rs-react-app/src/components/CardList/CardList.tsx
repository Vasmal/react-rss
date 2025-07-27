import CardItem from '../CardItem/CardItem';
import type { RepoParams } from '../CardListContainer/CardListContainer';

type Props = {
  repos: RepoParams[];
};

const CardList = (props: Props) => {
  const { repos } = props;
  return (
    <div>
      {repos.map((repo) => (
        <CardItem key={repo.id} {...repo} />
      ))}
    </div>
  );
};

export default CardList;
