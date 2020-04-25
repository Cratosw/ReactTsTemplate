import React,{useState} from 'react';
interface AntdThemeProps{

}

const AntdTheme:React.FC<AntdThemeProps>=()=>{
  let initialValues = {
    '@primary-color': '#1987a7',
    '@secondary-color': '#0000ff',
    '@text-color': '#000000',
    '@text-color-secondary': '#eb2f96',
    '@heading-color': '#fa8c16',
    '@layout-header-background': '#b36e94',
    '@btn-primary-bg': '#397dcc'
  };
  const [initialValue, setInitialValue] = useState(()=>initialValues);
  const [vars,setVars]=useState(()=>{
    let va={};
    let appTheme=localStorage.getItem('app-theme');
    if(appTheme!==null){
      va= Object.assign({}, initialValues, JSON.parse(appTheme));
    }
    return va;
  });
  
  return(
    <div></div>
  )
}
export default AntdTheme;