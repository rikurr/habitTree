import meditation from '../assets/create-habit/Meditation.svg';
import studing from '../assets/create-habit/studying.svg';
import reading from '../assets/create-habit/reading_time.svg';
import training from '../assets/create-habit/training.svg';
import yoga from '../assets/create-habit/yoga.svg';
import dev from '../assets/create-habit/dev.svg';

type Habit = {
  title: string;
  image: string;
};

export const featureHabits: Habit[] = [
  {
    title: '勉強する',
    image: studing,
  },
  {
    title: '瞑想する',
    image: meditation,
  },
  {
    title: '本を読む',
    image: reading,
  },
  {
    title: '体幹トレーニング',
    image: training,
  },
  {
    title: 'ヨガ',
    image: yoga,
  },
  {
    title: 'アプリ開発',
    image: dev,
  },
];
