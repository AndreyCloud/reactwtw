
export type Film = {
  id: number,
  name: string,
  poster_image: string,
  preview_image: string,
  background_image: string,
  background_color: string,
  video_link: string,
  preview_video_link: string,
  description: string,
  rating: number,
  scores_count: number,
  director: string,
  starring: string[],
  run_time: number,
  genre: string,
  released: number,
  is_favorite: boolean,
};

export type ArrFilms = Film[];

export type CommentGet = {
  id: number,
  user: {
    id: number,
    name: string
  },
  rating: number,
  comment: string,
  date: string
}

export type ArrCommentGet = CommentGet[];

export type Login = {
  email: string,
password: string
}

export type User = {
  id: number,
email: string,
name: string,
avatar_url: string,
token: string
}
