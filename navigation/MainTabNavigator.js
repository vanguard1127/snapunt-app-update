import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from 'react-navigation-stack';
import { fromLeft } from 'react-navigation-transitions';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/main/HomeScreen';
import { addHeaderRightNavigator, addHeaderLeftNavigator } from '../helpers';
import HomeIcon from '../components/shared/Icons/HomeIcon';
import DiscoverIcon from '../components/shared/Icons/DiscoverIcon';
import CameraIcon from '../components/shared/Icons/CameraIcon';
import CacheIcon from '../components/shared/Icons/CacheIcon';
import ChatIcon from '../components/shared/Icons/ChatIcon';
import ProfileScreen from '../screens/main/profile/ProfileScreen';
import Settings from '../screens/main/settings/SettingsScreen';
import PrivacyScreen from '../screens/main/settings/PrivacyScreen';
import SecurityScreen from '../screens/main/settings/SecurityScreen';
import AccountScreen from '../screens/main/settings/AccountScreen';
import HelpScreen from '../screens/main/settings/HelpScreen';
import AboutScreen from '../screens/main/settings/AboutScreen';
import SpotAdsScreen from '../screens/main/settings/SpotAdsScreen';
import CameraIndex from '../screens/main/Camera/CameraIndex';
import CreatePostScreen from '../screens/main/Challenge/CreatePostScreen';
import ChallengeDetail from '../screens/main/Challenge/ChallengeDetail';
import DetailWithComments from '../screens/main/Challenge/DetailWithComments';
import CacheIndex from '../screens/main/Cache/CacheIndex';
import DiscoverScreen from '../screens/main/Discover/DiscoverScreen';
import SeasonOneScreen from '../screens/main/Cache/SeasonOne/SeasonOneScreen';
import ActivityScreen from '../screens/main/Activities/ActivityScreen';
import LeaderBoard from '../screens/main/LeaderBoard/LeaderBoard';
import NotificationScreen from '../screens/main/settings/NotificationScreen';
import MyChallengeScreen from '../screens/main/Cache/MyChallenges/MyChallengeScreen';
import SponsorScreen from '../screens/main/Cache/Sponsored/SponsorScreen';
import SponsorDetail from '../screens/main/Cache/Sponsored/SponsorDetail';
import HostAHuntScreen from '../screens/main/Cache/HostAHunt/HostAHuntScreen';
import CreateHunt from '../screens/main/Cache/HostAHunt/CreateHunt';
import InviteFreinds from '../screens/main/Cache/HostAHunt/InviteFreinds';
import ViewHuntScreen from '../screens/main/Cache/HostAHunt/ViewHuntScreen';
import HuntMembers from '../screens/main/Cache/HostAHunt/HuntMembers';
import QRCodeScreen from '../screens/main/Cache/HostAHunt/QRCodeScreen';
import QRScanner from '../screens/main/Cache/HostAHunt/QRScanner';
import JoinHunt from '../screens/main/Cache/HostAHunt/JoinHunt';
import HuntChallengeDetail from '../screens/main/Cache/HostAHunt/HuntChallengeDetail';
import ProfileIcon from '../components/shared/Icons/ProfileIcon';
import ChallengeMain from '../screens/main/Challenge/ChallengeMain';
import PostPreview from '../screens/main/Challenge/PostPreview';
import EditProfile from '../screens/main/profile/EditProfile';
import FriendProfile from '../screens/main/profile/FriendProfile';
import Colors from '../constants/Colors';
import ViewFollowings from '../screens/main/profile/ViewFollowings';
import ViewFollowers from '../screens/main/profile/ViewFollowers';
import ChallengeIcon from '../components/shared/Icons/ChallengeIcon';
import EditPost from '../components/shared/Challenge/EditPost';
import Terms from '../screens/auth/Terms';
import SinglePost from '../screens/main/Challenge/SinglePost';
import AddCard from '../screens/main/Payment/AddCard';
import GLTest from '../screens/main/GLTest';
import ImageFilter from '../screens/main/Challenge/ImageFilter';
import FeaturedPost from '../screens/main/Challenge/Featured/FeaturedPost';
import CategoryView from '../screens/main/Discover/CategoryView';
import Faq from '../screens/main/settings/Faq';
import normalize from 'react-native-normalize';
let colorGetterFromProps = {};
let darkMode = false;


const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen, navigationOptions: () => {
      return {
        headerShown: false
      }
    }
  },
  LeaderBoard: LeaderBoard,
  DetailWithComments: {
    screen: DetailWithComments, navigationOptions: () => {
      return { tabBarVisible: false }
    }
  },
  FriendProfile: FriendProfile,
  Followings: ViewFollowings,
  Followers: ViewFollowers,
  Detail: {
    screen: ChallengeDetail, navigationOptions: () => {
      return {
        headerShown: false,
      }
    },
  },
  SinglePost: {
    screen: SinglePost, navigationOptions: () => {
      return {
        headerShown: false,
      }
    },
  },
  CameraScreen: {
    screen: CameraIndex, navigationOptions: () => {
      return { headerShown: false }
    }
  },
  CreatePost: {
    screen: CreatePostScreen, navigationOptions: () => {
      return { title: "Create Challenge" }
    }
  },
  AddCard: {
    screen: AddCard, navigationOptions: () => {
      return { title: "Payment Method" }
    }
  },
  EditPost: {
    screen: EditPost, navigationOptions: () => {
      return { title: "Edit Post" }
    }
  },
  PostPreview: {
    screen: PostPreview, navigationOptions: () => {
      return {
        headerShown: false,
        headerBackTitleVisible: false
      }
    }
  },
},
  {
    unmountInactiveRoutes:false,
    defaultNavigationOptions: ({ navigation }) => {
      // const rightIcon = addHeaderRightNavigator(navigation)
      return {
        headerTitleAlign: 'center',
        headerTintColor: colorGetterFromProps.violetXblue,
        headerStyle: {
          backgroundColor: colorGetterFromProps.navigation,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerBackTitleVisible: false
      }
    }
  });


HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    // tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon>
        <HomeIcon focused={focused} />
      </TabBarIcon>
    )
  };
};

const DiscoverStack = createStackNavigator({
  DiscoverScreen: {
    screen: DiscoverScreen,
    navigationOptions: ({ navigation }) => {
      return { title: 'Discover', headerShown: false };
    }
  },
  Detail: {
    screen: ChallengeDetail, navigationOptions: () => {
      return {
        headerShown: false,
      }
    },
  },
  SinglePost: {
    screen: SinglePost, navigationOptions: () => {
      return {
        headerShown: false,
      }
    },
  },
  CategoryView: CategoryView,
  LeaderBoard: LeaderBoard,
  DetailWithComments: {
    screen: DetailWithComments, navigationOptions: () => {
      return { tabBarVisible: false }
    }
  },
  FriendProfile: FriendProfile,
  Followings: ViewFollowings,
  Followers: ViewFollowers,
  CameraScreen: {
    screen: CameraIndex, navigationOptions: () => {
      return { headerShown: false }
    }
  },
  CreatePost: {
    screen: CreatePostScreen, navigationOptions: () => {
      return { title: "Create Challenge" }
    }
  },
  AddCard: {
    screen: AddCard, navigationOptions: () => {
      return { title: "Payment Method" }
    }
  },
  PostPreview: {
    screen: PostPreview, navigationOptions: () => {
      return {
        headerShown: false,
        headerBackTitleVisible: false
      }
    }
  },
  EditPost: {
    screen: EditPost, navigationOptions: () => {
      return { title: "Edit Post" }
    }
  },
},
  {
    defaultNavigationOptions: ({ navigation }) => {
      // const rightIcon = addHeaderRightNavigator(navigation)
      return {
        headerTitleAlign: 'center',
        headerTintColor: colorGetterFromProps.violetXblue,
        headerStyle: {
          backgroundColor: colorGetterFromProps.navigation,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerBackTitleVisible: false
      }
    }
  }
);

DiscoverStack.navigationOptions = ({ navigation }) => {

  var visible = true
  if (navigation.state) {
    navigation.state.routes.map((route) => {
      if (route.params != undefined && !route.params.showTabBar) {
        visible = false
      }
    })
  }

  return {
    tabBarVisible: visible,
    // tabBarLabel: 'Discover',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon>
        <DiscoverIcon focused={focused} />
      </TabBarIcon>
    )
  }
};

const ChallengeStack = createStackNavigator({
  CameraScreen: {
    screen: CameraIndex, navigationOptions: () => {
      return {
        headerShown: false,
        headerBackTitleVisible: false
      }
    }
  },
  LeaderBoard: LeaderBoard,
  CreatePost: {
    screen: CreatePostScreen, navigationOptions: () => {
      return {
        title: "Create Challenge",
        headerBackTitleVisible: false,
      }
    }
  },
  ImageFilter: {
    screen: ImageFilter, navigationOptions: () => {
      return {
        headerShown: false,
      }
    }
  },
  AddCard: {
    screen: AddCard, navigationOptions: () => {
      return { title: "Payment Method" }
    }
  },
  PostPreview: {
    screen: PostPreview, navigationOptions: () => {
      return {
        headerShown: false,
        headerBackTitleVisible: false
      }
    }
  },
  EditPost: {
    screen: EditPost, navigationOptions: () => {
      return { title: "Edit Post" }
    }
  },
},
  {
    unmountInactiveRoutes:false
  });

ChallengeStack.navigationOptions = ({ navigation }) => {

  return {
    tabBarVisible: false,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon >
        <ChallengeIcon focused={focused} />
      </TabBarIcon>
    )
  }
};


const CameraStack = createStackNavigator({
  ChallengeMain: {
    screen: ChallengeMain, navigationOptions: () => {
      return {
        headerShown: false,
        headerBackTitleVisible: false
      }
    }
  },
  LeaderBoard: LeaderBoard,
  CameraScreen: {
    screen: CameraIndex, navigationOptions: () => {
      return {
        headerShown: false,
        headerBackTitleVisible: false
      }
    }
  },
  CreatePost: {
    screen: CreatePostScreen, navigationOptions: () => {
      return {
        title: "Create Challenge",
        headerBackTitleVisible: false,
      }
    }
  },
  ImageFilter: {
    screen: ImageFilter, navigationOptions: () => {
      return {
        headerShown: false,
      }
    }
  },
  AddCard: {
    screen: AddCard, navigationOptions: () => {
      return { title: "Payment Method" }
    }
  },
  PostPreview: {
    screen: PostPreview, navigationOptions: () => {
      return {
        headerShown: false,
        headerBackTitleVisible: false
      }
    }
  },
  EditPost: {
    screen: EditPost, navigationOptions: () => {
      return { title: "Edit Post" }
    }
  },
  SeasonOne: SeasonOneScreen,
  FeaturedScreen: {
    screen: FeaturedPost, navigationOptions: () => {
      return {
        animationEnabled: false
      }
    },
  },
  Profile: ProfileScreen,
  EditProfile: EditProfile,
  FriendProfile: FriendProfile,
  DetailWithComments: {
    screen: DetailWithComments, navigationOptions: () => {
      return { tabBarVisible: false }
    }
  },
  Detail: {
    screen: ChallengeDetail, navigationOptions: () => {
      return {
        headerShown: true,
      }
    },
  },
  SinglePost: {
    screen: SinglePost, navigationOptions: () => {
      return {
        headerShown: false,
      }
    },
  },
},
  {
    unmountInactiveRoutes:false,
    animationEnabled: false,
    defaultNavigationOptions: ({ navigation }) => {
      // const rightIcon = addHeaderRightNavigator(navigation)
      return {
        headerTitleAlign: 'center',
        headerTintColor: colorGetterFromProps.violetXblue,
        headerStyle: {
          backgroundColor: colorGetterFromProps.navigation,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerBackTitleVisible: false
      }
    }
  }
  );

CameraStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon >
        <CameraIcon focused={focused} />
      </TabBarIcon>
    )
  }
};
// const ChatStack = createStackNavigator({
//   Settings: {
//     screen: HomeScreen,
//     navigationOptions: ({ navigation }) => {
//       return { title: 'Chat' };
//     }
//   }
// });

const ProfileStack = createStackNavigator({
  Profile:{
    screen: ProfileScreen, navigationOptions: () => {
      return{
        headerTransparent: true,
        navigationOptions: {
          headerStyle: {
            height: normalize(50),
            backgroundColor: "transparent",
          }
        },
      }
    }
  },
  EditProfile: EditProfile,
  Settings: Settings,
  Notifications: NotificationScreen,
  Privacy: PrivacyScreen,
  Security: SecurityScreen,
  Account: AccountScreen,
  Help: HelpScreen,
  Faq: Faq,
  About: AboutScreen,
  LeaderBoard: LeaderBoard,
  SpotAds: SpotAdsScreen,
  Activity: ActivityScreen,
  Followings: ViewFollowings,
  Followers: ViewFollowers,
  FriendProfile: FriendProfile,
  DetailWithComments: {
    screen: DetailWithComments, navigationOptions: () => {
      return { tabBarVisible: false }
    }
  },
  Terms: {
    screen: Terms, navigationOptions: () => {
      return { title: "Terms and Conditions" }
    }
  },
  MyChallenge: {
    screen: MyChallengeScreen, navigationOptions: () => {
      return { title: "DRAFTS" }
    }
  },
  Detail: {
    screen: ChallengeDetail, navigationOptions: () => {
      return {
        headerShown: false
      }
    },
  },
  SinglePost: {
    screen: SinglePost, navigationOptions: () => {
      return {
        headerShown: false,
      }
    },
  },
},
  {
    defaultNavigationOptions: ({ navigation }) => {
      // const rightIcon = addHeaderRightNavigator(navigation)
      return {
        headerTitleAlign: 'center',
        headerTintColor: colorGetterFromProps.violetXblue,
        headerStyle: {
          backgroundColor: colorGetterFromProps.navigation,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerBackTitleVisible: false
      }
    }
  }
);

ProfileStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon  >
        <ProfileIcon focused={focused} />
      </TabBarIcon>
    ),
  }

};

const CacheStack = createStackNavigator({
  // CacheMain: {
  //   screen: CacheIndex,
  //   navigationOptions: ({ navigation }) => {
  //     return { title: 'Cache' };
  //   }
  // },
  // ChallengeMain: { screen:ChallengeMain, navigationOptions: () => {
  //   return {headerShown:false}
  // }},
  // PostPreview: { screen:PostPreview, navigationOptions: () => {
  //   return {headerShown:false}
  // }},
  SeasonOne: {
    screen: SeasonOneScreen, navigationOptions: () => {
      return {
        animationEnabled: false,

      }
    },
  },
  MyChallenge: {
    screen: MyChallengeScreen, navigationOptions: () => {
      return { title: "My Challenges" }
    }
  },
  LeaderBoard: LeaderBoard,
  Sponsored: {
    screen: SponsorScreen, navigationOptions: () => {
      return { title: "Sponsored Challenges" }
    }
  },
  CameraScreen: {
    screen: CameraIndex, navigationOptions: () => {
      return { headerShown: false }
    }
  },
  CreatePost: {
    screen: CreatePostScreen, navigationOptions: () => {
      return { title: "Create Challenge" }
    }
  },
  AddCard: {
    screen: AddCard, navigationOptions: () => {
      return { title: "Payment Method" }
    }
  },
  EditPost: {
    screen: EditPost, navigationOptions: () => {
      return { title: "Edit Post" }
    }
  },
  SponsorDetail: {
    screen: SponsorDetail, navigationOptions: () => {
      return { title: "Detail" }
    }
  },
  HostAHuntScreen: {
    screen: HostAHuntScreen, navigationOptions: () => {
      return { title: "Host Hunt" }
    }
  },
  CreateHuntScreen: {
    screen: CreateHunt, navigationOptions: () => {
      return { title: "New Hunt" }
    }
  },
  InviteFriendsScreen: {
    screen: InviteFreinds, navigationOptions: () => {
      return { title: "Invite Friends" }
    }
  },
  ViewHuntScreen: {
    screen: ViewHuntScreen, navigationOptions: () => {
      return { title: "" }
    }
  },
  HuntMembers: {
    screen: HuntMembers, navigationOptions: () => {
      return { title: "Members" }
    }
  },
  QRCodeScreen: {
    screen: QRCodeScreen, navigationOptions: () => {
      return { title: "Share SH Code" }
    }
  },
  QRScanner: {
    screen: QRScanner, navigationOptions: () => {
      return { title: "Scan SH Code" }
    }
  },
  JoinHunt: {
    screen: JoinHunt, navigationOptions: () => {
      return { title: "Join Hunt" }
    }
  },
  HuntChallengeDetail: {
    screen: HuntChallengeDetail, navigationOptions: () => {
      return { title: "Challenge Detail" }
    }
  },
  Detail: {
    screen: ChallengeDetail, navigationOptions: () => {
      return {
        headerShown: false,
        tabBarVisible: false
      }
    },
  },
  SinglePost: {
    screen: SinglePost, navigationOptions: () => {
      return {
        headerShown: false,
      }
    },
  },
  DetailWithComments: {
    screen: DetailWithComments, navigationOptions: () => {
      return { tabBarVisible: false }
    }
  },
},
{
  unmountInactiveRoutes:false,
  animationEnabled: false,
}
);

CacheStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Cache',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon  >
        <CameraIcon focused={focused} />
      </TabBarIcon>
    ),
    
  }
};



const TabBarComponent = (props) => {
  return (<BottomTabBar {...props} />)
};



const BottomTabNavigator = createBottomTabNavigator({
  HomeStack,
  DiscoverStack,
  ChallengeStack,
  CameraStack,
  ProfileStack
  // ChatStack,
  // CacheStack
},
  {
    tabBarComponent: props => <TabBarComponent {...props} style={{
      ...console.log("pops in style = " + JSON.stringify(colorGetterFromProps)),
      height: normalize(60),
      margin: 8,
      marginBottom: normalize(10),
      backgroundColor: colorGetterFromProps.navigation,
      color: colorGetterFromProps.white,
      borderRadius: 100,
      borderColor: "transparent",
      borderTopWidth: 0,
      position: 'absolute',
      shadowColor: "rgba(0,0,0,0.02)",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
      justifyContent: "center"
    }} />,
    lazy: true,
    tabBarOptions: {
      showLabel: false,
    },

  }
);

const mapStateToProps = state => {
  // console.log(state)
  return {
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {

};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomTabNavigator);
BottomTabNavigator;