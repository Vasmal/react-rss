import type { RepoParams } from '../components/CardListContainer/CardListContainer';

const BASE_URL = 'https://api.github.com/';

export type FetchedItem = RepoParams & {
  [key: string]: string | number | boolean | null | undefined;
};

type ApiResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: FetchedItem[];
};

const getData = async (
  value?: string | null,
  signal?: AbortSignal
): Promise<FetchedItem[]> => {
  const query = value || 'stars>0';
  const searchParams = new URLSearchParams({
    q: query,
    per_page: '10',
    page: '1',
  });
  const res = await fetch(`${BASE_URL}search/repositories?${searchParams}`, {
    signal,
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
  }
  const data: ApiResponse = await res.json();
  return data.items;
};
export default getData;
