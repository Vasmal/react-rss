import type { RepoParams } from '../CardListContainer';
import styles from './CardItem.module.css';

const CardItem = ({
  full_name,
  clone_url,
  description,
  homepage,
  language,
  stargazers_count,
}: RepoParams) => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.name}>
        <span className={styles.label}>repo name:</span>{' '}
        <h2 className={styles.cardName}>{full_name}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.links}>
        <span className={styles.label}>links:</span>
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
      <div className={styles.language}>
        {' '}
        <span className={styles.label}>programming language: </span>
        {language}
      </div>
      <div className={styles.stars}>
        <span className={styles.label}>stars: </span> {stargazers_count}
      </div>
    </div>
  );
};

export default CardItem;
