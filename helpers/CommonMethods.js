import moment from "moment"
import { Dimensions, Platform, PixelRatio } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 6s's scale
const scale = SCREEN_WIDTH / 375;

export const normalizeFont = (size) => {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}

export const timeAgo = (ts) => {
    return moment(ts).local().fromNow()
}

export const catIds = () => {
    return Object.keys(categories).map((key) => {
        return key
    })  
}

export const generateThumbnail = async (media) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        media,
        {
          time: 10000,
        }
      );
      return uri
    } catch (e) {
      console.log(e);
    }
  };

export const categories = {
    // "1": "Most popular",
    "18": { name: "General", icon: "🎟️"},
    "2": { name: "Top Savage", icon: "🏆"},
    "3": { name:"Pay it Forward", icon: "🙏"},
    "4": { name:"Travel", icon: "✈"},
    "5": { name:"Fails" , icon: "😬"},
    "6": { name:"Extreme Sports", icon: "🏅"},
    "7": { name:"Funny", icon: "😂"},
    "8": { name:"Unique", icon: "🦄"},
    "9": { name:"Social Change", icon: "😇"},
    "10": { name:"Skateboarding", icon: "🏂"},
    "11": { name:"Team Challenges", icon: "👨‍👦‍👦"},
    "12": { name:"Random", icon: "🗿"},
    "13": { name:"Gaming", icon: "🎮"},
    "14": { name:"Food", icon: "🍲"},
    "15": { name:"Animals", icon: "🐒"},
    "16": { name:"Pranks", icon: "😵"},
    "19": { name:"Office", icon: "🖨️"},
    "20": { name:"Nature", icon: "🌲"},
}

export const categories_system = {
    // "1": "Most popular",
    "18": { name: "General", icon: "🎟️"},
    "2": { name: "Top Savage", icon: "🏆"},
    "3": { name:"Pay it Forward", icon: "🙏"},
    "4": { name:"Travel", icon: "✈"},
    "5": { name:"Fails" , icon: "😬"},
    "6": { name:"Extreme Sports", icon: "🏅"},
    "7": { name:"Funny", icon: "😂"},
    "8": { name:"Unique", icon: "🦄"},
    "9": { name:"Social Change", icon: "😇"},
    "10": { name:"Skateboarding", icon: "🏂"},
    "11": { name:"Team Challenges", icon: "👨‍👦‍👦"},
    "12": { name:"Random", icon: "🗿"},
    "13": { name:"Gaming", icon: "🎮"},
    "14": { name:"Food", icon: "🍲"},
    "15": { name:"Animals", icon: "🐒"},
    "16": { name:"Pranks", icon: "😵"},
    "17": { name:"Season1", icon: "👲"},
    "19": { name:"Office", icon: "🖨️"},
    "20": { name:"Nature", icon: "🌲"},
}

export const privacy = {
  public : "Public",
  friends: "Friends",
  only_me: "Only Me"
}

export const addPrefix = (s) => {
    var prefix = 'http://';
    if (s.substr(0, prefix.length) !== prefix)
    {
        s = prefix + s;
    }
    return s
}