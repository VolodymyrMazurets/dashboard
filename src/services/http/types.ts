export interface AccountResponseType {
  Name?: string;
  MailAddress?: string;
  ImageUrl?: string;
}

export interface ApplicationSuiteResponseType {
  Id?: string;
  Name?: string;
  LogoUrl?: string;
  Applications?: [];
}

export interface ApplicationResponseType {
  Id?: string;
  Name?: string;
  Contexts?: ApplicationContextResponseType[];
  MenuItems?: null;
  Url?: string;
}

export interface ApplicationContextResponseType {
  Text?: string | undefined;
}

export interface NotificationResponseType {
  Id?: string;
  Type?: number;
  Title?: string;
  Text?: string;
  NotifiedOnText?: string;
}

export interface BackgroundTasksResponseType {
  Id?: string;
  Title?: string;
  Text?: string;
  Url?: null;
  StartedOnText?: string;
}

export interface SearchResponseType {
  Groups: SearchGroupResponseType[];
}

export interface SearchGroupResponseType {
  Name?: string
  Action?: string
  Items?: SearchGroupsItemsResponceType[]
}

export interface SearchGroupsItemsResponceType {
  IconUrl?: string;
  Url?: string;
  Text?: string;
  Description?: string;
  Tooltip?: string;
}

export interface PanelResponceType {
  Id: string,
  Docked: boolean,
  Collapsed: boolean,
  ShowIcons: boolean,
  PanelItems: PanelResponceItemType[];
}

export interface PanelResponceItemType {
  Text?: string;
  IconUrl?: string;
  Url?: string | null;
  Children?: PanelResponceItemType[] | null;
}

export interface DefinitionResponceType {
  Id: string;
  Name: string;
  Revisions: RevisionResponceType[];
}

export interface RevisionResponceType {
  Id?: string;
  Text?: string;
  label?: string;
  value?: string;
}



