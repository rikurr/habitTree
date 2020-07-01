import '../firebase/index';

type ServerTimestamp =
  | firebase.firestore.Timestamp
  | firebase.firestore.FieldValue;
type IncrementableNumber = number | firebase.firestore.FieldValue;

export interface UserModel {
  username: string;
  email: string;
  created_at: ServerTimestamp;
  updated_at: ServerTimestamp;
  hasHabit: number;
  maxHabit: number;
  likeHabitCount: IncrementableNumber;
  uid: string;
  target: string;
}

export interface HabitModel {
  name: string;
  startDate: string;
  checkDate: string;
  created_at: ServerTimestamp;
  progressCount: number;
  successfulCount: number;
  repeat: number;
  user: {
    uid: string;
    userRef: firebase.firestore.DocumentReference;
  };
  reports: any[];
}

export interface LikedUser {
  id: string;
  createTime: ServerTimestamp;
}

export interface LikedHabit {
  id: string;
  postRef: firebase.firestore.DocumentReference;
  createTime: ServerTimestamp;
}
