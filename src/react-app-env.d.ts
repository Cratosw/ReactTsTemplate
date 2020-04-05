/// <reference types="react-scripts" />

declare global {
  interface Window { 
    Aurora: { [key: string]: string };
    dojoConfig:{ [key: string]: string }; 
  }
}
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "hex2rgba" {
  const classes: any;
  export default classes;
}

declare namespace Cratosw {

}