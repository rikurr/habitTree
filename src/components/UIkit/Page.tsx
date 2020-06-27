import React, { useEffect, FC } from 'react';
import { Layout } from '.';

type PageProps = {
  title: string;
  wide?: boolean;
};

const Page: FC<PageProps> = ({ title, children, wide }) => {
  useEffect(() => {
    document.title = `${title} | Habit Tree`;
    window.scrollTo(0, 0);
  }, [title]);
  return <Layout wide={wide}>{children}</Layout>;
};

export { Page };
