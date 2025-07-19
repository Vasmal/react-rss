import styles from './CardItem.module.css';

type Props = {
  full_name: string;
  clone_url: string;
  description: string | null;
  homepage?: string | null;
  language?: string | null;
  stargazers_count: number;
};

const CardItem = ({
  full_name,
  clone_url,
  description,
  homepage,
  language,
  stargazers_count,
}: Props) => {
  return (
    <div className={styles.Cardcontainer}>
      <div className={styles.name}>
        <span className={styles.cardName}>{full_name}</span>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.links}>
        <a
          href={`${clone_url}`}
          className={styles.link}
          target="_blank"
          rel="noreferrer"
        >
          Go to repo
        </a>
        {homepage && (
          <a
            href={homepage}
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            Go to homepage
          </a>
        )}
      </div>
      <div className={styles.language}>{language}</div>
      <div className={styles.stars}>{stargazers_count}</div>
    </div>
  );
};

export default CardItem;
