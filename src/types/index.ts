export type Pane = {
  type: string;
  id: string;
};

/**
 * Enumeration of file types.
 */
export enum FileType {
  /**
   * A regular file.
   */
  File = "FILE",
  /**
   * A directory/folder
   */
  Directory = "DIRECTORY",
}

/**
 * A base interface for nodes, just includes
 * the type of the node and the path, This interface
 * does not expose the node's content/children
 */
export interface FsNode {
  /**
   * Full path of the node relative to the root
   */
  path: string;

  /**
   * node is a file
   */
  type: FileType;
}

export interface WatchFileWatchers {
  onChange: (newContent: string) => void;
  onError: (error: string) => void;
  onMoveOrDelete: (args: {
    eventType: "MOVE" | "DELETE";
    node: FsNode;
  }) => void;
}

export interface WriteChangeArgs {
  from: number;
  to: number;
  insert: string;
}

export interface WatchTextFileWatchers {
  onReady: (readyArgs: {
    initialContent: string;
    version: number;
    writeChange: (writeChangeArgs: WriteChangeArgs) => Promise<void>;
  }) => void;
  onChange: (changeArgs: {
    latestContent: string;
    version: number;
    changeSource: string;
    changes: any; // TODO fix
  }) => void;
  onError: (error: string) => void;
  onMoveOrDelete: (args: {
    eventType: "MOVE" | "DELETE";
    node: FsNode;
  }) => void;
}

/**
 * A unique id for a pane in the layout
 */
export type PaneId = string;

/**
 * A unique id for a pane group in the layout
 */
export type PaneGroupId = string;

/**
 * Represents the Repl's layout and pane data in a serializable manner
 */
export interface LayoutData {
  layout: {
    floating: Array<FloatingPaneGroup>;
    tiling: any;
  };
  data: Record<string, any>;
  sidebarPercent: number;
}

/**
 * The size in pixles within the layout
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * The position in pixles within the layout
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Size and position in pixles within the layout
 */
export interface Rect extends Point, Size {}

/**
 * A floating group of panes
 */
export interface FloatingPaneGroup {
  id: string;
  type: "floatingPaneGroup";
  panes: Array<PaneId>;
  activeIndex: number;
  rect: Rect;
}

export type CssColor = string;

export interface ThemeValues {
  global: {
    backgroundRoot: CssColor;
    backgroundDefault: CssColor;
    backgroundHigher: CssColor;
    backgroundHighest: CssColor;
    backgroundOverlay: CssColor;
    foregroundDefault: CssColor;
    foregroundDimmer: CssColor;
    foregroundDimmest: CssColor;
    outlineDimmest: CssColor;
    outlineDimmer: CssColor;
    outlineDefault: CssColor;
    outlineStronger: CssColor;
    outlineStrongest: CssColor;
    accentPrimaryDimmest: CssColor;
    accentPrimaryDimmer: CssColor;
    accentPrimaryDefault: CssColor;
    accentPrimaryStronger: CssColor;
    accentPrimaryStrongest: CssColor;
    accentPositiveDimmest: CssColor;
    accentPositiveDimmer: CssColor;
    accentPositiveDefault: CssColor;
    accentPositiveStronger: CssColor;
    accentPositiveStrongest: CssColor;
    accentNegativeDimmest: CssColor;
    accentNegativeDimmer: CssColor;
    accentNegativeDefault: CssColor;
    accentNegativeStronger: CssColor;
    accentNegativeStrongest: CssColor;
    redDimmest: CssColor;
    redDimmer: CssColor;
    redDefault: CssColor;
    redStronger: CssColor;
    redStrongest: CssColor;
    orangeDimmest: CssColor;
    orangeDimmer: CssColor;
    orangeDefault: CssColor;
    orangeStronger: CssColor;
    orangeStrongest: CssColor;
    yellowDimmest: CssColor;
    yellowDimmer: CssColor;
    yellowDefault: CssColor;
    yellowStronger: CssColor;
    yellowStrongest: CssColor;
    limeDimmest: CssColor;
    limeDimmer: CssColor;
    limeDefault: CssColor;
    limeStronger: CssColor;
    limeStrongest: CssColor;
    greenDimmest: CssColor;
    greenDimmer: CssColor;
    greenDefault: CssColor;
    greenStronger: CssColor;
    greenStrongest: CssColor;
    tealDimmest: CssColor;
    tealDimmer: CssColor;
    tealDefault: CssColor;
    tealStronger: CssColor;
    tealStrongest: CssColor;
    blueDimmest: CssColor;
    blueDimmer: CssColor;
    blueDefault: CssColor;
    blueStronger: CssColor;
    blueStrongest: CssColor;
    blurpleDimmest: CssColor;
    blurpleDimmer: CssColor;
    blurpleDefault: CssColor;
    blurpleStronger: CssColor;
    blurpleStrongest: CssColor;
    purpleDimmest: CssColor;
    purpleDimmer: CssColor;
    purpleDefault: CssColor;
    purpleStronger: CssColor;
    purpleStrongest: CssColor;
    magentaDimmest: CssColor;
    magentaDimmer: CssColor;
    magentaDefault: CssColor;
    magentaStronger: CssColor;
    magentaStrongest: CssColor;
    pinkDimmest: CssColor;
    pinkDimmer: CssColor;
    pinkDefault: CssColor;
    pinkStronger: CssColor;
    pinkStrongest: CssColor;
    greyDimmest: CssColor;
    greyDimmer: CssColor;
    greyDefault: CssColor;
    greyStronger: CssColor;
    greyStrongest: CssColor;
    brownDimmest: CssColor;
    brownDimmer: CssColor;
    brownDefault: CssColor;
    brownStronger: CssColor;
    brownStrongest: CssColor;
    black: CssColor;
    white: CssColor;
  };
  editor: {
    //   syntaxHighlighting: Array<SyntaxHighlightingSpec>;
    syntaxHighlighting: any;
  };
}

export enum ColorScheme {
  Light = "light",
  Dark = "dark",
}

export interface Theme {
  id: string;
  description: string;
  values: ThemeValues;
  colorScheme: ColorScheme;
  name: string;
  isOfficial: boolean;
}

export type ExtensionPortAPI = {
  // init Function
  handshake: () => void;

  // fs Module
  readFile: (
    path: string,
    encoding: "utf8" | "binary" | null
  ) => Promise<{ content: string } | { error: string }>;
  writeFile: (
    path: string,
    content: string | Blob
  ) => Promise<{ success: boolean } | { error: string }>;
  readDir: (path: string) => Promise<{
    children: Array<{ filename: string; type: "FILE" | "DIRECTORY" }>;
    error: string;
  }>;
  createDir: (path: string) => Promise<{} | { error: string }>;
  deleteFile: (path: string) => Promise<{} | { error: string }>;
  deleteDir: (path: string) => Promise<{} | { error: string }>;
  move: (path: string, to: string) => Promise<{ error: string | null }>;
  copyFile: (path: string, to: string) => Promise<{ error: string | null }>;
  watchFile: (path: string, watcher: WatchFileWatchers) => () => void;
  watchTextFile: (path: string, watcher: WatchTextFileWatchers) => () => void;

  // replDb Module
  setReplDbValue: (key: string, value: string) => Promise<void>;
  getReplDbValue: (key: string) => Promise<string | null>;
  listReplDbKeys: (
    prefix: string
  ) => Promise<{ keys: string[] } | { error: string }>;
  deleteReplDbKey: (key: string) => Promise<void>;

  activatePane: () => Promise<void>;

  // theme
  getCurrentTheme: () => Promise<Theme>;
  onThemeChange: (callback: (theme: Theme) => void) => Promise<() => void>;

  filePath: string;

  // messages Module
  showConfirm: (text: string, length?: number) => string;
  showError: (text: string, length?: number) => string;
  showNotice: (text: string, length?: number) => string;
  showWarning: (text: string, length?: number) => string;
  hideMessage: (id: string) => void;
  hideAllMessages: () => void;

  // data Module
  currentUser: (args: UserDataInclusion) => UserQueryOutput;
  userById: (args: { id: string } & UserDataInclusion) => UserQueryOutput;
  userByUsername: (
    args: { username: string } & UserDataInclusion
  ) => UserByUsernameQueryOutput;
  currentRepl: (args: ReplDataInclusion) => ReplQueryOutput;
  replById: (args: { id: string } & ReplDataInclusion) => ReplQueryOutput;
  replByUrl: (args: { url: string } & ReplDataInclusion) => ReplQueryOutput;

  // session Module
  watchActiveFile: (callback: (path: string) => void) => () => void;
};

export interface UserDataInclusion {
  includeSocialData?: boolean;
  includeRoles?: boolean;
}

export interface ReplDataInclusion {
  includeSocialData?: boolean;
  includeComments?: boolean;
  includeOwner?: boolean;
  includeMultiplayers?: boolean;
}

export enum HandshakeStatus {
  Ready = "ready",
  Error = "error",
  Loading = "loading",
}

export interface User {
  id: number;
  username: string;
  image: string;
  bio?: string;

  // SocialUserData fragment
  url?: string;
  socials?: Array<UserSocial>;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  fullName?: string;
  followCount?: number;
  followerCount?: number;

  // RolesUserData fragment
  roles?: UserRole;
}

export interface UserSocial {
  id: number;
  url: string;
  type: UserSocialType;
}

export enum UserSocialType {
  twitter = "twitter",
  github = "github",
  linkedin = "linkedin",
  website = "website",
  youtube = "youtube",
  twitch = "twitch",
  facebook = "facebook",
  discord = "discord",
}

export interface UserRole {
  id: number;
  name: string;
  key: string;
  tagline: string;
}

export interface Repl {
  id: string;
  url: string;
  title: string;
  description: string;
  timeCreated: string;
  slug: string;
  isPrivate: boolean;

  // SocialReplData fragment
  likeCount?: number;
  publicForkCount?: number;
  runCount?: number;
  commentCount?: number;
  tags?: Array<Tag>;

  // CommentsReplData fragment
  comments?: {
    items?: Array<ReplComment>;
  };

  // OwnerData fragment
  owner?: {
    __typename: string;
    id: number;
    username: string;
    image: string;
    bio?: string;
    description?: string;
  };

  // MultiplayersData fragment
  multiplayers?: Array<User>;
}

export interface Tag {
  id: string;
  isOfficial: boolean;
}

export interface ReplComment {
  id: number;
  body: string;
  user: User;
}

// Response types

export type GraphResponse<T> = Promise<T | never>;

export type ReplQueryOutput = GraphResponse<{
  repl: Repl;
}>;

export type UserByUsernameQueryOutput = GraphResponse<{
  userByUsername: User;
}>;

export type UserQueryOutput = GraphResponse<{
  user: User;
}>;
