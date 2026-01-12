import {FC} from "react";

export const LongSection: FC = () => {
  const items = [];

  for (let i = 0; i < 50; i++) {
    items.push(<li key={i}>Item #{i} (keep scrolling)</li>);
  }

  return <ul>{items}</ul>;
};