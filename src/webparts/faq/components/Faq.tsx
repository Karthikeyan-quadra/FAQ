// import * as React from 'react';
// import styles from './Faq.module.scss';
// import type { IFaqProps } from './IFaqProps';
// import { escape } from '@microsoft/sp-lodash-subset';

// export default class Faq extends React.Component<IFaqProps, {}> {
//   public render(): React.ReactElement<IFaqProps> {
//     const {
//       description,
//       isDarkTheme,
//       environmentMessage,
//       hasTeamsContext,
//       userDisplayName
//     } = this.props;

//     return (
//       <section className={`${styles.faq} ${hasTeamsContext ? styles.teams : ''}`}>
//         <div className={styles.welcome}>
//           <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
//           <h2>Well done, {escape(userDisplayName)}!</h2>
//           <div>{environmentMessage}</div>
//           <div>Web part property value: <strong>{escape(description)}</strong></div>
//         </div>
//         <div>
//           <h3>Welcome to SharePoint Framework!</h3>
//           <p>
//             The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
//           </p>
//           <h4>Learn more about SPFx development:</h4>
//           <ul className={styles.links}>
//             <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
//             <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
//           </ul>
//         </div>
//       </section>
//     );
//   }
// }

// //Faq.tsx
// import * as React from 'react';
// import { IFaqProps } from './IFaqProps';
// import { CaretRightOutlined } from '@ant-design/icons';
// import { Collapse, theme } from 'antd';
// import 'antd/dist/reset.css';
// import { Fetch } from "../helpers/Service";
// import type { CSSProperties } from 'react';
// import type { CollapseProps } from 'antd';

// export default function Faq(props:IFaqProps){
//   const [fetchedData, setFetchedData] = useState<any[]>([]);

//   const fetchAndUpdateData = async () => {
//     const data: any = await Fetch();
//     console.log(data);
//     setFetchedData(data);
//   };

//   const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
//     {
//       key: '1',
//       label: 'This is panel header 1',
//       children: <p>{text}</p>,
//       style: panelStyle,
//     },
//     {
//       key: '2',
//       label: 'This is panel header 2',
//       children: <p>{text}</p>,
//       style: panelStyle,
//     },
//     {
//       key: '3',
//       label: 'This is panel header 3',
//       children: <p>{text}</p>,
//       style: panelStyle,
//     },
//   ];

//   const { token } = theme.useToken();

//   const panelStyle: React.CSSProperties = {
//     marginBottom: 24,
//     background: token.colorFillAlter,
//     borderRadius: token.borderRadiusLG,
//     border: 'none',
//   };
// return(
//   <div>
//   <Collapse
//   bordered={false}
//   defaultActiveKey={['1']}
//   expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} rev={undefined} />}
//   style={{ background: token.colorBgContainer }}
//   items={getItems(panelStyle)}
// />
// </div>
// )
// }

// // Faq.tsx
// import * as React from 'react';
// import { useState, useEffect } from 'react'; // Import useState and useEffect
// import { IFaqProps } from './IFaqProps';
// import { CaretRightOutlined } from '@ant-design/icons';
// import { Collapse, theme } from 'antd';
// import 'antd/dist/reset.css';
// import { Fetch } from "../helpers/Service";
// import type { CSSProperties } from 'react';
// import type { CollapseProps } from 'antd';
// import { Button, Drawer } from 'antd';

// export default function Faq(props: IFaqProps) {
//   const [fetchedData, setFetchedData] = useState<any[]>([]);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data: any = await Fetch();
//       setFetchedData(data);
//     };

//     fetchData();
//   }, []); // Call the fetchData function once when the component mounts

//   const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => {
//     // Map through the fetched data and create Collapse items
//     return fetchedData.map((item: any) => ({
//       key: item.Id, // Assuming you have an 'Id' property in your SharePoint list
//       label: <span style={{ fontWeight: 500 }}>{item.Questions}</span>,
//       children: <p>{item.Answers}</p>,
//       style: panelStyle,
//     }));
//   };

//   const { token } = theme.useToken();

//   const panelStyle: React.CSSProperties = {
//     marginBottom: 24,
//     background: token.colorFillAlter,
//     borderRadius: token.borderRadiusLG,
//     border: 'none',
//   };

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   return (

//     <div>
//       <div>
//         <Button type="primary" onClick={showDrawer}>
//           Open
//         </Button>

//         <Drawer title="Basic Drawer" onClose={onClose} open={open}>
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//         </Drawer>
//       </div>

//         <div>
//         <Collapse accordion
//           bordered={false}
//           defaultActiveKey={fetchedData.map((item: any) => item.Id)} // Use Id as the defaultActiveKey
//           expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} rev={undefined} />}
//           style={{ background: token.colorBgContainer }}
//           items={getItems(panelStyle)}
//         />
//       </div>
//     </div>

//   );
// }


// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { IFaqProps } from './IFaqProps';
// import { CaretRightOutlined } from '@ant-design/icons';
// import { Collapse, theme, Button, Drawer, Row, Col, Slider, InputNumber } from 'antd';
// import 'antd/dist/reset.css';
// import { Fetch } from '../helpers/Service';
// import type { CSSProperties } from 'react';
// import type { CollapseProps } from 'antd';

// export default function Faq(props: IFaqProps) {
//   const [fetchedData, setFetchedData] = useState<any[]>([]);
//   const [open, setOpen] = useState(false);
//   const [inputValue, setInputValue] = useState(1);

//   const onChange = (newValue: number) => {
//     setInputValue(newValue);
//   };


//   useEffect(() => {
//     const fetchData = async () => {
//       const data: any = await Fetch();
//       setFetchedData(data);
//     };

//     fetchData();
//   }, []);

//   const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => {
//     return fetchedData.map((item: any) => ({
//       key: item.Id,
//       label: <span style={{ fontWeight: 500 }}>{item.Questions}</span>,
//       children: <p>{item.Answers}</p>,
//       style: panelStyle,
//     }));
//   };

//   const { token } = theme.useToken();

//   const panelStyle: React.CSSProperties = {
//     marginBottom: 24,
//     background: token.colorFillAlter,
//     borderRadius: token.borderRadiusLG,
//     border: 'none',
//   };

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Row justify="end">
//         <Col>
//           <Button type="primary" onClick={showDrawer}>
//             Edit
//           </Button>
//         </Col>
//       </Row>

//       <Row>
//       <Col span={24}>
//       <Drawer title="Basic Drawer" onClose={onClose} open={open}>
//       <Row>
//       <Col span={12}>
//         <Slider
//           min={1}
//           max={20}
//           onChange={onChange}
//           value={typeof inputValue === 'number' ? inputValue : 0}
//         />
//       </Col>
//       <Col span={4}>
//         <InputNumber
//           min={1}
//           max={20}
//           style={{ margin: '0 16px' }}
//           value={inputValue}
//           onChange={onChange}
//         />
//       </Col>
//     </Row>
//       </Drawer>
//       </Col>

//       </Row>


//       <div style={{marginTop:"10px"}}>
//         <Row>
//         <Col span={24}>
//         <Collapse
//           accordion
//           bordered={false}
//           defaultActiveKey={fetchedData.map((item: any) => item.Id)}
//           expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} rev={undefined} />}
//           style={{ background: token.colorBgContainer }}
//           items={getItems(panelStyle)}
//         />
//         </Col>
//         </Row>
//       </div>
//     </div>
//   );
// }

//code works good
// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { IFaqProps } from './IFaqProps';
// import { CaretRightOutlined } from '@ant-design/icons';
// import { Collapse, theme, Button, Drawer, Row, Col, Slider, InputNumber, } from 'antd';
// import 'antd/dist/reset.css';
// import { Fetch } from '../helpers/Service';
// import type { CSSProperties } from 'react';
// import type { CollapseProps } from 'antd';

// export default function Faq(props: IFaqProps) {
//   const [fetchedData, setFetchedData] = useState<any[]>([]);
//   const [open, setOpen] = useState(false);
//   const [inputValue, setInputValue] = useState(0);
//   const [visibleData, setVisibleData] = useState<any[]>([]);

//   const onChange = (newValue: number) => {
//     setInputValue(newValue);
//     updateVisibleData(newValue);
//   };

//   const updateVisibleData = (value: number) => {
//     const slicedData = fetchedData.slice(0, value);
//     setVisibleData(slicedData);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const data: any = await Fetch();
//       setFetchedData(data);
//       updateVisibleData(inputValue);
//     };

//     fetchData();
//   }, [inputValue]);

//   const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => {
//     return visibleData.map((item: any) => ({
//       key: item.Id,
//       label: <span style={{ fontWeight: 500 }}>{item.Questions}</span>,
//       children: <p style={{ marginLeft: "24px" }}>{item.Answers}</p>,
//       style: panelStyle,
//     }));
//   };

//   const { token } = theme.useToken();

//   const panelStyle: React.CSSProperties = {
//     marginBottom: 24,
//     background: token.colorFillAlter,
//     borderRadius: token.borderRadiusLG,
//     border: 'none',
//   };

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Row justify="end">
//         <Col>
//           <Button type="primary" onClick={showDrawer}>
//             Edit
//           </Button>
//         </Col>
//       </Row>

//       <Row>
//         <Col span={24}>
//           <Drawer title="Edit" onClose={onClose} open={open}>
//             <Row>
//               <Col span={24}>
//                 <span style={{fontSize:"18px"}}><label htmlFor="Manage count">Manage count:</label></span>
//               </Col>
//               <Col span={12}>
//                 {/* <Form.Item
//                   label="Manage Count"
//                   name="Manage Count"
//                    /> */}

//                 <Slider
//                   min={0}
//                   // max={fetchedData.length}
//                   max={Math.min(20, fetchedData.length)} // Set the maximum limit to 20 or the length of the data, whichever is smaller

//                   onChange={onChange}
//                   value={typeof inputValue === 'number' ? inputValue : 0}
//                 />
//               </Col>
//               <Col span={4}>
//                 <InputNumber
//                   min={0}
//                   // max={fetchedData.length}
//                   max={Math.min(20, fetchedData.length)} // Set the maximum limit to 20 or the length of the data, whichever is smaller

//                   style={{ margin: '0 16px' }}
//                   value={inputValue}
//                   onChange={onChange}
//                 />
//               </Col>
//             </Row>
//           </Drawer>
//         </Col>
//       </Row>

//       <div style={{ marginTop: '10px' }}>
//         <Row>
//           <Col span={24}>
//             <Collapse
//               accordion
//               bordered={false}
//               defaultActiveKey={visibleData.map((item: any) => item.Id)}
//               expandIcon={({ isActive }) => (
//                 <CaretRightOutlined rotate={isActive ? 90 : 0} rev={undefined} />
//               )}
//               style={{ background: token.colorBgContainer }}
//               items={getItems(panelStyle)}
//             />
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// }

// //Faq.tsx
// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { IFaqProps } from './IFaqProps';
// import { CaretRightOutlined } from '@ant-design/icons';
// import { Collapse, theme,Row, Col} from 'antd';
// import 'antd/dist/reset.css';
// import { Fetch } from '../helpers/Service';
// import type { CSSProperties } from 'react';
// import type { CollapseProps } from 'antd';

// export default function Faq(props: IFaqProps) {
//   const [fetchedData, setFetchedData] = useState<any[]>([]);
//   const [visibleData, setVisibleData] = useState<any[]>([]);
//   // const [inputValue, setInputValue] = useState<number>(5); // Initialize with a default value

//   useEffect(() => {
//     const fetchData = async () => {
//       const data: any = await Fetch();
//       setFetchedData(data);
//     };

//     fetchData();
//   }, []);

//   //   const updateVisibleData = (value: number) => {
// //     const slicedData = fetchedData.slice(0, value);
// //     setVisibleData(slicedData);
// //   };
// const updateVisibleData = (data: any[], count: number) => {
//   setVisibleData(data.slice(0, Math.min(20, count)));
// };

//   useEffect(() => {
//     // Update the visibleData based on the inputValue
//     const slicedData = fetchedData.slice(0, props.count);
//     setVisibleData(slicedData);
//   }, [props.count, fetchedData]);

//   const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => {
//     // Check if the number of items is greater than or equal to 3
//     if (fetchedData.length < 3) {
//       return [];
//     }
  
//     // Map through the fetched data and create Collapse items
//     return fetchedData.map((item: any) => ({
//       key: item.Id,
//       label: <span style={{ fontWeight: 500 }}>{item.Questions}</span>,
//       children: <p style={{ marginLeft: "24px" }}>{item.Answers}</p>,
//       style: panelStyle,
//     }));
//   };
  

//   const { token } = theme.useToken();

//   const panelStyle: React.CSSProperties = {
//     marginBottom: 24,
//     background: token.colorFillAlter,
//     borderRadius: token.borderRadiusLG,
//     border: 'none',
//   };

//   // const onChange = (newValue: number) => {
//   //   setInputValue(newValue);
//   // };

//   return (
//     <div>
//       {/* <Row>
//         <Col span={24}>
//           <Row>
//             <Col span={24}>
//               <span style={{ fontSize: "18px" }}><label htmlFor="Manage count">Manage count:</label></span>
//             </Col>
//             <Col span={12}>
//               <Slider
//                 min={0}
//                 max={Math.min(20, fetchedData.length)}
//                 onChange={onChange}
//                 value={inputValue}
//               />
//             </Col>
//             <Col span={4}>
//               <InputNumber
//                 min={0}
//                 max={Math.min(20, fetchedData.length)}
//                 style={{ margin: '0 16px' }}
//                 value={inputValue}
//                 onChange={onChange}
//               />
//             </Col>
//           </Row>
//         </Col>
//       </Row> */}

//       <div style={{ marginTop: '10px' }}>
//         <Row>
//           <Col span={24}>
//             <Collapse
//               accordion
//               bordered={false}
//               defaultActiveKey={visibleData.map((item: any) => item.Id)}
//               expandIcon={({ isActive }) => (
//                 <CaretRightOutlined rotate={isActive ? 90 : 0} rev={undefined} />
//               )}
//               style={{ background: token.colorBgContainer }}
//               items={getItems(panelStyle)}
//             />
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// }


//Faq.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { IFaqProps } from './IFaqProps';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import { Fetch } from '../helpers/Service';
import type { CSSProperties } from 'react';
import type { CollapseProps } from 'antd';

export default function Faq(props: IFaqProps) {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [visibleData, setVisibleData] = useState<any[]>([]);
  // const [inputValue, setInputValue] = useState<number>(3);

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await Fetch();
      setFetchedData(data);
      updateVisibleData(data, props.count);
    };

    fetchData();
  }, [props.count]);
  

  const updateVisibleData = (data: any[], count: number) => {
    setVisibleData(data.slice(0, Math.min(20, count)));
  };

  useEffect(() => {
    updateVisibleData(fetchedData, props.count);
  }, [props.count, fetchedData]);

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => {
    // Check if the number of items is greater than or equal to 3
    if (fetchedData.length < 3) {
      return [];
    }

    // Map through the fetched data and create Collapse items
    return visibleData.map((item: any) => ({
      key: item.Id,
      label: <span style={{ fontWeight: 500 }}>{item.Questions}</span>,
      children: <p style={{ marginLeft: "24px" }}>{item.Answers}</p>,
      style: panelStyle,
    }));
  };

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <div>
      <div style={{ marginTop: '10px' }}>
        <Row>
          <Col span={24}>
            <Collapse
              accordion
              bordered={false}
              defaultActiveKey={visibleData.map((item: any) => item.Id)}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} rev={undefined} />
              )}
              style={{ background: token.colorBgContainer }}
              items={getItems(panelStyle)}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
