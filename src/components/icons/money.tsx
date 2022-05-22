import React from 'react';
import {Svg, Path, Circle, Rect} from 'react-native-svg';

const MoneyIcon = ({selected}: {selected: boolean}) => {
  return (
    <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
      <Path
        d="M17.4771 3.09583H3.9843C3.65668 3.09654 3.34252 3.22624 3.10982 3.45685C2.87712 3.68746 2.74459 4.00043 2.74091 4.32803C2.41598 4.33166 2.10538 4.46235 1.8756 4.69213C1.64583 4.92191 1.51513 5.23251 1.5115 5.55744C1.18391 5.56111 0.870933 5.69364 0.640321 5.92635C0.409709 6.15905 0.280011 6.47321 0.279297 6.80082V14.6579C0.279296 14.9879 0.410206 15.3045 0.643305 15.5381C0.876405 15.7717 1.19266 15.9033 1.52268 15.9041H15.0183C15.3454 15.9026 15.6588 15.7726 15.8909 15.5421C16.123 15.3115 16.2552 14.999 16.2589 14.6719C16.5843 14.6682 16.8953 14.5371 17.1251 14.3068C17.355 14.0764 17.4854 13.7651 17.4883 13.4396C17.8161 13.4367 18.1295 13.3044 18.3603 13.0715C18.591 12.8387 18.7205 12.5241 18.7205 12.1963V4.33921C18.7197 4.00967 18.5885 3.69384 18.3555 3.46082C18.1225 3.2278 17.8066 3.09656 17.4771 3.09583ZM16.2477 14.113H2.75209C2.57053 14.113 2.39641 14.0409 2.26803 13.9125C2.13966 13.7841 2.06753 13.61 2.06753 13.4285V5.57141C2.06751 5.39178 2.1381 5.21933 2.26407 5.09127C2.39004 4.9632 2.5613 4.88979 2.74091 4.88685V12.1963C2.74091 12.526 2.87191 12.8423 3.10509 13.0755C3.22055 13.1909 3.35762 13.2825 3.50848 13.345C3.65933 13.4075 3.82101 13.4396 3.9843 13.4396H16.9294C16.9272 13.619 16.8544 13.7903 16.7268 13.9163C16.5992 14.0424 16.4271 14.113 16.2477 14.113ZM17.5162 10.4276C17.5162 10.5017 17.4868 10.5728 17.4344 10.6252C17.382 10.6776 17.3109 10.707 17.2368 10.707C16.9056 10.707 16.5879 10.8386 16.3536 11.0728C16.1194 11.307 15.9878 11.6247 15.9878 11.956C15.9878 12.0301 15.9584 12.1011 15.906 12.1535C15.8536 12.2059 15.7825 12.2354 15.7084 12.2354H5.75297C5.67887 12.2354 5.6078 12.2059 5.5554 12.1535C5.503 12.1011 5.47356 12.0301 5.47356 11.956C5.47356 11.6247 5.34197 11.307 5.10775 11.0728C4.87352 10.8386 4.55584 10.707 4.22459 10.707C4.15049 10.707 4.07942 10.6776 4.02702 10.6252C3.97462 10.5728 3.94518 10.5017 3.94518 10.4276V6.11068C3.94518 6.03657 3.97462 5.9655 4.02702 5.9131C4.07942 5.8607 4.15049 5.83127 4.22459 5.83127C4.55584 5.83127 4.87352 5.69968 5.10775 5.46545C5.34197 5.23122 5.47356 4.91354 5.47356 4.5823C5.47356 4.50819 5.503 4.43712 5.5554 4.38472C5.6078 4.33232 5.67887 4.30288 5.75297 4.30288H15.7084C15.7825 4.30288 15.8536 4.33232 15.906 4.38472C15.9584 4.43712 15.9878 4.50819 15.9878 4.5823C15.9878 4.91354 16.1194 5.23122 16.3536 5.46545C16.5879 5.69968 16.9056 5.83127 17.2368 5.83127C17.3109 5.83127 17.382 5.8607 17.4344 5.9131C17.4868 5.9655 17.5162 6.03657 17.5162 6.11068V10.4276Z"
        fill={selected ? 'white' : '#178F4F'}
      />
      <Circle cx="10.6875" cy="8.3125" r="2.375" fill={selected ? 'white' : '#178F4F'} />
      <Rect x="6.14697" y="7.82349" width="1.67647" height="0.838234" rx="0.419117" fill={selected ? 'white' : '#178F4F'} />
      <Rect x="14.25" y="7.82349" width="1.67647" height="0.838234" rx="0.419117" fill={selected ? 'white' : '#178F4F'} />
      <Path
        d="M11.8462 7.69971V7.92822H9.52734V7.69971H11.8462ZM11.8462 8.16113V8.38965H9.52734V8.16113H11.8462ZM11.54 6.99219V9.125H11.1387L10.2305 7.64551V9.125H9.82764V6.99219H10.2305L11.1401 8.47314V6.99219H11.54Z"
        fill={selected ? 'white' : '#178F4F'}
      />
    </Svg>
  );
};

export default MoneyIcon;
