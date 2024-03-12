import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFaqProps {
  description: string;
  count:any;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context:WebPartContext;
  fetchedData:any;
}
