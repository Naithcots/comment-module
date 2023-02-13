export type IPost = {
  id: number;
  comments: number[] | null;
};

export type IAuthor = {
  nickname: string;
  avatarUrl: string;
};

export type IComment = {
  id: number;
  content: string;
  votes: number;
  created: string;
  replies: number[] | null;
  author: IAuthor;
};
