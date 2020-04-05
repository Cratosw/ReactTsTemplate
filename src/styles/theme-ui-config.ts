import hex2rgba from "hex2rgba";
//颜色
interface ImediaQueries {
  [key: string]: any
}
interface Ibreakpoints{
  [key: string]: any
}
const colorConfig = {
  purple: {
    90: "#362066",
    80: "#452475",
    70: "#542c85",
    60: "#663399",
    50: "#8a4baf",
    40: "#b17acc",
    30: "#d9bae8",
    20: "#f1defa",
    10: "#f6edfa",
    5: "#fcfaff"
  },
  orange: {
    90: "#db3a00",
    80: "#e65800",
    70: "#f67300",
    60: "#fb8400",
    50: "#ffb238",
    40: "#ffd280",
    30: "#ffe4a1",
    20: "#ffedbf",
    10: "#fff4db",
    5: "#fffcf7"
  },
  yellow: {
    90: "#8a6534",
    80: "#bf9141",
    70: "#e3a617",
    60: "#fec21e",
    50: "#fed038",
    40: "#ffdf37",
    30: "#ffeb99",
    20: "#fff2a8",
    10: "#fff5bf",
    5: "#fffdf7"
  },
  red: {
    90: "#b80000",
    80: "#ce0009",
    70: "#da0013",
    60: "#ec1818",
    50: "#fa2915",
    40: "#ff5a54",
    30: "#ff8885",
    20: "#ffbab8",
    10: "#fde7e7",
    5: "#fffafa"
  },
  magenta: {
    90: "#690147",
    80: "#7d0e59",
    70: "#940159",
    60: "#a6026a",
    50: "#bc027f",
    40: "#d459ab",
    30: "#e899ce",
    20: "#f2c4e3",
    10: "#ffe6f6",
    5: "#fffafd"
  },
  blue: {
    90: "#004ca3",
    80: "#006ac1",
    70: "#047bd3",
    60: "#0e8de6",
    50: "#0d96f2",
    40: "#3fa9f5",
    30: "#63b8f6",
    20: "#90cdf9",
    10: "#dbf0ff",
    5: "#f5fcff"
  },
  teal: {
    90: "#008577",
    80: "#10a39e",
    70: "#00bdb6",
    60: "#2de3da",
    50: "#05f7f4",
    40: "#73fff7",
    30: "#a6fffa",
    20: "#ccfffc",
    10: "#dcfffd",
    5: "#f7ffff"
  },
  green: {
    90: "#006500",
    80: "#088413",
    70: "#1d9520",
    60: "#2ca72c",
    50: "#37b635",
    40: "#59c156",
    30: "#79cd75",
    20: "#a1da9e",
    10: "#def5dc",
    5: "#f7fdf7"
  },
  grey: {
    90: "#232129",
    80: "#36313d",
    70: "#48434f",
    60: "#635e69",
    50: "#78757a",
    40: "#b7b5bd",
    30: "#d9d7e0",
    20: "#f0f0f2",
    10: "#f5f5f5",
    5: "#fbfbfb"
  },
  white: "#ffffff",
  black: "#000000"
};
//屏幕分辨率
const breakpoints:Ibreakpoints= {
  xxs: 0, // needed for styled-system
  xs: `400px`,
  sm: `550px`,
  md: `750px`,
  lg: `1000px`,
  xl: `1200px`,
  xxl: `1600px`
};

const breakpointsTokens = [];
for (const b in breakpoints) {
  breakpointsTokens.push(breakpoints[b]);
}
breakpointsTokens.splice(0, 1);

const mediaQueries:ImediaQueries = {};
for (const breakpoint in breakpoints) {
  mediaQueries[breakpoint] = `@media (min-width: ${breakpoints[breakpoint]})`;
}
const space = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72];

const spaceTokens = space.map(token => `${token / 16}rem`);

const blackRGB = "35, 33, 41"; // grey.90
const whiteRGB = "255, 255, 255";

export const focusStyle = {
  outline: 0,
  boxShadow: `0 0 0 2px #ffedbf`
};
// form elements
export const formInputFocus = {
  borderColor: "#ffe4a1",
  outline: 0,
  boxShadow: `0 0 0 2px #ffedbf`
};
export const formInput = {
  backgroundColor: colorConfig.white,
  border: `1px solid #d9d7e0`,
  borderRadius: `2px`,
  display: `block`,
  fontSize: "1rem",
  lineHeight: `2.25rem`,
  py: 0,
  px: space[2],
  verticalAlign: `middle`,
  width: `100%`,
  "::placeholder": {
    color: "#d9d7e0",
    opacity: 1
  },
  "&:focus": {
    ...formInputFocus
  },
  "&:disabled": {
    cursor: `not-allowed`,
    opacity: `0.5`
  }
};
const themedInput = {
  ...formInput,
  appearance: `none`,
  bg: `themedInput.background`,
  border: 0,
  color: `text`,
  overflow: `hidden`,
  px: 3,
  ":focus": {
    bg: `themedInput.backgroundFocus`,
    boxShadow: `0 0 0 2px ${colorConfig.green[90]}`,
    outline: 0,
    width: `100%`
  },
  "::placeholder": {
    color: `themedInput.placeholder`
  }
};

const themeUIConfig = {
  borders: [0, `1px solid`, `2px solid`],
  colors: {
    ...colorConfig,
    ui: {
      background: "#fbfbfb",
      hover: "#fbfbfb",
      border: {
        subtle: "#fbfbfb"
      }
    },
    gatsby: "#f5f5f5",
    link: {
      color: "#8a4baf",
      border: "#d9bae8",
      hoverBorder: "#8a4baf"
    },
    text: {
      header: "#000000",
      primary: "#36313d",
      secondary: "#78757a",
      placeholder: "#b7b5bd"
    },
    input: {
      border: "#d9d7e0",
      focusBorder: "#ffe4a1",
      focusBoxShadow: "#ffedbf"
    },
    blackFade: {
      80: "rgba(" + blackRGB + ", 0.85)",
      70: "rgba(" + blackRGB + ", 0.7)",
      60: "rgba(" + blackRGB + ", 0.6)",
      50: "rgba(" + blackRGB + ", 0.5)",
      30: "rgba(" + blackRGB + ", 0.3)",
      10: "rgba(" + blackRGB + ", 0.1)"
    },
    whiteFade: {
      80: "rgba(" + whiteRGB + ", 0.85)",
      70: "rgba(" + whiteRGB + ", 0.7)",
      60: "rgba(" + whiteRGB + ", 0.6)",
      50: "rgba(" + whiteRGB + ", 0.5)",
      30: "rgba(" + whiteRGB + ", 0.3)",
      10: "rgba(" + whiteRGB + ", 0.1)"
    },
    search: {
      suggestionHighlightBackground: colorConfig.white,
      suggestionHighlightColor: colorConfig.white
    },
    sidebar: {
      itemHoverBackground: hex2rgba(colorConfig.purple[20], 0.275),
      itemBackgroundActive: `transparent`,
      itemBorderColor: `transparent`, // `rgba(0,0,0,0.05)`,
      activeSectionBackground: hex2rgba(colorConfig.purple[20], 0.15),
      itemBorderActive: colorConfig.purple[10]
    },
    code: {
      bgInline: "#fbf2e9",
      bg: "#fdfaf6",
      border: "#faede5",
      text: "#866c5b",
      remove: "#e45c5c",
      add: "#4a9c59",
      selector: "#b3568b",
      tag: "#4084a1",
      keyword: "#538eb6",
      comment: "#6f8f39",
      punctuation: "#53450e",
      regex: "#d88489",
      cssString: "#a2466c",
      invisibles: "#e0d7d1",
      scrollbarThumb: "#f4d1c6",
      lineHighlightBorder: "#f1beb6"
    }
  },
  breakpoints: breakpointsTokens,
  fontWeights: [400, 700, 800],
  fonts: {
    system: {},
    header: {}
  },
  fontSizes: {},
  letterSpacings: {
    normal: `normal`,
    tracked: `0.075em`,
    tight: `-0.015em`
  },
  lineHeights: {
    solid: 1,
    dense: 1.25,
    default: 1.5,
    loose: 1.75
  },
  mediaQueries: mediaQueries,
  radii: [0, 2, 4, 8, 16, 9999, `100%`],
  shadows: {
    raised: `0px 1px 2px rgba(46, 41, 51, 0.08), 0px 2px 4px rgba(71, 63, 79, 0.08)`,
    floating: `0px 2px 4px rgba(46, 41, 51, 0.08), 0px 4px 8px rgba(71, 63, 79, 0.16)`,
    overlay: `0px 4px 8px rgba(46, 41, 51, 0.08), 0px 8px 16px rgba(71, 63, 79, 0.16)`,
    dialog: `0px 4px 16px rgba(46, 41, 51, 0.08), 0px 8px 24px rgba(71, 63, 79, 0.16)`
  },
  sizes: {
    headerHeight: `3.75rem`,
    bannerHeight: `2.5rem`,
    sidebarUtilityHeight: `3.5rem`,
    pageHeadingDesktopWidth: `3.5rem`,
    avatar: `2rem`,
    mainContentWidth: {
      default: `54rem`,
      withSidebar: `42rem`
    },
    sidebarWidth: {
      default: `16.5rem`,
      large: `18rem`,
      mobile: `320px`
    },
    tocWidth: `18rem`,
    pluginsSidebarWidthDefault: `21rem`,
    pluginsSidebarWidthLarge: `24rem`,
    showcaseSidebarMaxWidth: `15rem`
  },
  space: spaceTokens,
  transition: {
    curve: {
      default: `cubic-bezier(0.4, 0, 0.2, 1)`
    },
    speed: {
      default: `250ms`,
      fast: `100ms`,
      slow: `350ms`
    }
  },
  zIndices: {
    widget: 2,
    navigation: 5,
    banner: 10,
    modal: 10,
    sidebar: 10,
    floatingActionButton: 20,
    skipLink: 100
  },
  visuallyHidden: {
    border: 0,
    clip: `rect(0, 0, 0, 0)`,
    height: `1px`,
    margin: `-1px`,
    overflow: `hidden`,
    padding: 0,
    position: "absolute",
    whiteSpace: `nowrap`,
    width: `1px`
  },
  breakpointGutter: `@media (min-width: 42rem)`,
  themedInput: themedInput,
  headerhieght:9.16 //单位vh
};
export default themeUIConfig;
