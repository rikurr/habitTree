export const format = (date: any): string => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`.replace(
    /\n|\r/g,
    ''
  );
};

export const getDate = (day: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + day);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`.replace(
    /\n|\r/g,
    ''
  );
};

// firestoretimeStamp
export const dateToString = (dt: any) => {
  return (
    dt.getFullYear() +
    '-' +
    ('00' + (dt.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + dt.getDate()).slice(-2)
  );
};
