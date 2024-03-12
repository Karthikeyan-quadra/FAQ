// import * as React from 'react';
// import * as ReactDom from 'react-dom';
// import { Version } from '@microsoft/sp-core-library';
// import {
//   type IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-property-pane';
// import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import { IReadonlyTheme } from '@microsoft/sp-component-base';

// import * as strings from 'FaqWebPartStrings';
// import Faq from './components/Faq';
// import { IFaqProps } from './components/IFaqProps';
// import { getSP } from './helpers/Pnpconfig';

// export interface IFaqWebPartProps {
//   description: string;
// }

// export default class FaqWebPart extends BaseClientSideWebPart<IFaqWebPartProps> {

//   private _isDarkTheme: boolean = false;
//   private _environmentMessage: string = '';

//   public render(): void {
//     const element: React.ReactElement<IFaqProps> = React.createElement(
//       Faq,
//       {
//         description: this.properties.description,
//         isDarkTheme: this._isDarkTheme,
//         environmentMessage: this._environmentMessage,
//         hasTeamsContext: !!this.context.sdks.microsoftTeams,
//         userDisplayName: this.context.pageContext.user.displayName,
//         context:this.context
//       }
//     );

//     ReactDom.render(element, this.domElement);
//   }

//   protected onInit(): Promise<void> {
//     return this._getEnvironmentMessage().then(message => {
//       this._environmentMessage = message;
//       getSP(this.context);
//     });
//   }



//   private _getEnvironmentMessage(): Promise<string> {
//     if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
//       return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
//         .then(context => {
//           let environmentMessage: string = '';
//           switch (context.app.host.name) {
//             case 'Office': // running in Office
//               environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
//               break;
//             case 'Outlook': // running in Outlook
//               environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
//               break;
//             case 'Teams': // running in Teams
//             case 'TeamsModern':
//               environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
//               break;
//             default:
//               environmentMessage = strings.UnknownEnvironment;
//           }

//           return environmentMessage;
//         });
//     }

//     return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
//   }

//   protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
//     if (!currentTheme) {
//       return;
//     }

//     this._isDarkTheme = !!currentTheme.isInverted;
//     const {
//       semanticColors
//     } = currentTheme;

//     if (semanticColors) {
//       this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
//       this.domElement.style.setProperty('--link', semanticColors.link || null);
//       this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
//     }

//   }

//   protected onDispose(): void {
//     ReactDom.unmountComponentAtNode(this.domElement);
//   }

//   protected get dataVersion(): Version {
//     return Version.parse('1.0');
//   }

//   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
//     return {
//       pages: [
//         {
//           header: {
//             description: strings.PropertyPaneDescription
//           },
//           groups: [
//             {
//               groupName: strings.BasicGroupName,
//               groupFields: [
//                 PropertyPaneTextField('description', {
//                   label: strings.DescriptionFieldLabel
//                 })
//               ]
//             }
//           ]
//         }
//       ]
//     };
//   }
// }

//FaqWebPart.ts
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  // PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FaqWebPartStrings';
import Faq from './components/Faq';
import { IFaqProps } from './components/IFaqProps';
import { getSP } from './helpers/Pnpconfig';
import { Fetch } from './helpers/Service';

export interface IFaqWebPartProps {
  description: string;
  sliderproperty: number; // Add this property for managing the count

}

export default class FaqWebPart extends BaseClientSideWebPart<IFaqWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _fetchedData: any[] = []; // Declare fetchedData at the class level


  public render(): void {
    const fetchData = async () => {
      this._fetchedData = await Fetch(); // Assign fetchedData to the class variable
      const element: React.ReactElement<IFaqProps> = React.createElement(
        Faq,
        {
          description: this.properties.description,
          isDarkTheme: this._isDarkTheme,
          environmentMessage: this._environmentMessage,
          hasTeamsContext: !!this.context.sdks.microsoftTeams,
          userDisplayName: this.context.pageContext.user.displayName,
          context: this.context,
          count: this.properties.sliderproperty,
          fetchedData: this._fetchedData, // Pass fetchedData as a prop
        }
      );

      ReactDom.render(element, this.domElement);
    };

    fetchData();
  }


  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
      getSP(this.context);
      
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const maxSliderValue = Math.min(20, this._fetchedData.length);

    
        return {
          pages: [
            {
              // header: {
              //   description: strings.PropertyPaneDescription
              // },
              groups: [
                {
                  // groupName: strings.BasicGroupName,
                  groupFields: [
                    PropertyPaneSlider('sliderproperty', {
                      label: "Manage Count",
                      min: 3,
                      max: maxSliderValue,
                      value: 5,
                      showValue: true,
                      step: 1
                    })
                  ]
                }
              ]
            }
          ]
        };
      }
    }