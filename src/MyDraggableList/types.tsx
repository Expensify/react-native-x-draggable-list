export type Item = {
  id: string;
  content: string;
};

export type Props = {
  items: Item[];
  setData: (data: Item[]) => void;
};
