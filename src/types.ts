// FOR GLOBAL TYPES

export type Video = {
  title: string;
  creator: string;
  url: string;
  description: string;
  video_id: string;
};

export type CommentData = {
  username: string;
  text: string;
  liked: boolean;
};