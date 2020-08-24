
const tintColor = '#2f95dc';

const pallete = {
  maroon: '#ccc',
  whiteSmoke: "#fefefe",
  red: 'red',
  white: "#fff",
  lightDarkbackground: "#2D2E44",
  yellow: "#EAEB5E",
  deepYellowGreen: "#666804",
  lightOrange: "#E74C4D",
  lightRed: "#FF5F58",
  lightPink: "#fac0c2",
  lightGrey: "#BEBEBE",
  lightBabyBlue: "#F2F6FA",
  darkGrey: "#404040",
  darkRed: "#CD5C5C",
  lightSalmon: "#e86668",
  darkBlue: "#0645AD",
  accentColor: "rgb(39, 50, 56)",
  lightBlack: 'rgba(0,0,0,.3)',
  lightYellow: "#ffff3f",
  violetXblue: "#717088",
  lightKhaki: "#FCF1E3",
  khaki: "#F3CFA1",
  lightAshWhite: "#efffff",
  brown: "#AF7653",
  darkPinkishRed: "#E74C4D",
  mainDark: "#212233",
  DarkestVioletBlue: "#35323C",
  black: "#000",
  boxColor: "rgba(23,24,39,0.7)",
  golden: "#DAA520"
};

export const lightTheme = {
  tintColor,
  tabIconDefault: pallete.maroon,
  tabIconSelected: tintColor,
  navigation: pallete.white,
  tabBar: pallete.whiteSmoke,
  errorBackground: pallete.red,
  errorText: pallete.white,
  warningBackground: pallete.yellow,
  warningText: pallete.deepYellowGreen,
  noticeBackground: tintColor,
  noticeText: pallete.white,
  backgroundColor: pallete.lightOrange,
  lightBackgroundColor: pallete.lightRed,
  homeBackground: pallete.lightPink,
  lightGrey: pallete.lightGrey,
  white: pallete.white,
  diffrentBack: pallete.lightBabyBlue,
  darkGrey: pallete.darkGrey,
  redError: pallete.darkRed,
  flashColor: pallete.lightSalmon,
  link: pallete.darkBlue,
  darkBlue: pallete.accentColor,
  fade: pallete.lightBlack,
  lightYellow: pallete.lightYellow,
  randColors: [
    "#009292",
    "#F65156",
    "#88070B",
    "#FFCE13"
  ],
  textInputColor: pallete.violetXblue,
  primaryBackgroundColor: pallete.darkPinkishRed,
  text_color_1: pallete.brown,
  light_ash_white: pallete.lightAshWhite,
  khaki: pallete.khaki,
  lightKhaki: pallete.lightKhaki,
  violetXblue: pallete.violetXblue,
  DarkestVioletBlue: pallete.DarkestVioletBlue,
  black: pallete.black,
  mainDark: pallete.mainDark,
  boxColor: pallete.white,
  badgeColor: pallete.black,
  mapStyle: [
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]
};


export const darkTheme = {
  tintColor,
  tabIconDefault: pallete.maroon,
  tabIconSelected: tintColor,
  tabBar: pallete.whiteSmoke,
  errorBackground: pallete.red,
  errorText: pallete.white,
  warningBackground: pallete.yellow,
  warningText: pallete.deepYellowGreen,
  noticeBackground: tintColor,
  noticeText: pallete.white,
  backgroundColor: pallete.lightOrange,
  lightBackgroundColor: pallete.lightRed,
  homeBackground: pallete.lightPink,
  lightGrey: pallete.lightGrey,
  white: pallete.mainDark,
  diffrentBack: pallete.mainDark,
  darkGrey: pallete.darkGrey,
  redError: pallete.darkRed,
  flashColor: pallete.lightSalmon,
  link: pallete.darkBlue,
  darkBlue: pallete.accentColor,
  fade: pallete.lightBlack,
  lightYellow: pallete.lightYellow,
  navigation: pallete.lightDarkbackground,
  randColors: [
    "#009292",
    "#F65156",
    "#88070B",
    "#FFCE13"
  ],
  textInputColor: pallete.violetXblue,
  primaryBackgroundColor: pallete.darkPinkishRed,
  text_color_1: pallete.brown,
  light_ash_white: pallete.lightAshWhite,
  khaki: pallete.khaki,
  lightKhaki: pallete.lightKhaki,
  violetXblue: pallete.violetXblue,
  DarkestVioletBlue: pallete.DarkestVioletBlue,
  black: pallete.violetXblue,
  mainDark: pallete.mainDark,
  boxColor: pallete.boxColor,
  badgeColor: pallete.golden,
  mapStyle: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]
};

export default {
  tintColor,
  tabIconDefault: pallete.maroon,
  tabIconSelected: tintColor,
  tabBar: pallete.whiteSmoke,
  errorBackground: pallete.red,
  errorText: pallete.white,
  warningBackground: pallete.yellow,
  warningText: pallete.deepYellowGreen,
  noticeBackground: tintColor,
  noticeText: pallete.white,
  backgroundColor: pallete.lightOrange,
  lightBackgroundColor: pallete.lightRed,
  homeBackground: pallete.lightPink,
  lightGrey: pallete.lightGrey,
  white: pallete.white,
  diffrentBack: pallete.lightBabyBlue,
  darkGrey: pallete.darkGrey,
  redError: pallete.darkRed,
  flashColor: pallete.lightSalmon,
  link: pallete.darkBlue,
  darkBlue: pallete.accentColor,
  fade: pallete.lightBlack,
  lightYellow: pallete.lightYellow,
  randColors: [
    "#009292",
    "#F65156",
    "#88070B",
    "#FFCE13"
  ],
  textInputColor: pallete.violetXblue,
  primaryBackgroundColor: pallete.darkPinkishRed,
  text_color_1: pallete.brown,
  light_ash_white: pallete.lightAshWhite,
  khaki: pallete.khaki,
  lightKhaki: pallete.lightKhaki,
  violetXblue: pallete.violetXblue,
  DarkestVioletBlue: pallete.DarkestVioletBlue

};