type UserData = {
  id: number;
  name: string;
  email: string;
  password_digest: string;
  remember_digest: string;
};
type State = {
  isSignIn: boolean;
  currentUser: User;
  books: Book[];
  showBooks: Book[];
};
type User = {
  name: string;
  email: string;
};
type Book = {
  id: number;
  title: string;
  category: string;
  url: string;
  user_id: number;
};
type Action =
  | SEARCH_EVENT
  | CREATE_USER_EVENT
  | SIGN_IN_EVENT
  | SIGN_OUT_EVENT
  | SHOW_BOOK_EVENT
  | CREATE_BOOK_EVENT
  | DELETE_BOOK_EVENT;

type SEARCH_EVENT = {
  type: "SEARCH_EVENT";
  searchKeyword: string;
  searchCategory: string;
};
type CREATE_USER_EVENT = User & {
  type: "CREATE_USER_EVENT";
};
type SIGN_IN_EVENT = User & {
  type: "SIGN_IN_EVENT";
};
type SIGN_OUT_EVENT = {
  type: "SIGN_OUT_EVENT";
};
type SHOW_BOOK_EVENT = {
  type: "SHOW_BOOK_EVENT";
  books: Book[];
};
type CREATE_BOOK_EVENT = {
  type: "CREATE_BOOK_EVENT";
  book: Book;
};
type DELETE_BOOK_EVENT = {
  type: "DELETE_BOOK_EVENT";
  id: number;
};

type PieChartFormat = {
  index: number;
  name: string;
  value: number;
};

type Image = {
  data: string | ArrayBuffer | null;
  name: string;
};

declare type PieActiveShape =
  | ReactElement<SVGElement>
  | ((props: any) => ReactElement<SVGElement>)
  | SectorProps;
