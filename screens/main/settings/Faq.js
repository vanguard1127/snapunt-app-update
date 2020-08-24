import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

class Faq extends React.Component {

  render() {

    return (
        <View style={styles.container}>   
            <ScrollView>

            <Text style={{fontWeight: "bold", fontSize: 24, marginBottom: 10}} >SnapHunt FAQ</Text>
            <Text style={{fontWeight: "bold"}} >What is SnapHunt?</Text>
            <Text style={{marginBottom: 10}} >
            SnapHunt is a social media mobile app where users complete and create challenge pictures
            and videos to spread awareness about a cause, fundraise, or to simply have fun.
            </Text>

            <Text style={{fontWeight: "bold"}} >Where can I do challenges?</Text>
            <Text style={{marginBottom: 10}} >
                    Users can find exciting challenges to do in our season 1 challenges section (check the “panels”
                    button, 4th from the left in your apps bottom bar). You can also do other people’s challenges
                    easily, by clicking the SnapOff button, 3rd from the left of your engagement icons. You can also
                    create your own challenges from scratch!
            </Text>

            <Text style={{fontWeight: "bold"}} >How do I create my own challenge?</Text>
            <Text style={{marginBottom: 10}} >
                Simply tap the camera button in the middle of the bottom bar and your camera function will
                open. Follow the prompts to allow SnapHunt access to your camera and microphone and away
                you go. After you have captured your image or video fill out the challenge details form and post
                it for the world to see.
            </Text>

            <Text style={{fontWeight: "bold"}} >What should I caption my challenge?</Text>
            <Text style={{marginBottom: 10}} >
            This is the creative part. Caption your challenge whatever you like. Make sure to make it short
and interesting, to get other users interested in doing your challenge themselves through the
SnapOff feature.
            </Text>

            <Text style={{fontWeight: "bold"}} >How do I get my challenge in featured challenges?</Text>
            <Text style={{marginBottom: 10}} >
            Simply apply in the settings>account section for a featured account. If you are accepted for a
featured account you can then simply toggle the “featured challenges” button when posting a
challenge. We will receive your request and if we deem your challenge acceptable to our
platform you can then see it visibly posted in featured challenges.
            </Text>

            <Text style={{fontWeight: "bold"}} >What’s the difference between Season 1 challenges and Featured challenges?</Text>
            <Text style={{marginBottom: 10}} >
            Season 1 are challenges put out to our users by our staff of creatives who spend their time
coming up with awesome challenges for you to complete in app. Featured challenges are
those put out through our app by companies, celebrities, or any public figure that wishes to
spread the news about their newest challenge to their followers.
            </Text>

            <Text style={{fontWeight: "bold"}} >What is SnapOff?</Text>
            <Text style={{marginBottom: 10}} >
            SnapOff is where you can immediately do another users challenge. You cannot change the
description or category of a SnapOff challenge. After you post that original user will credited as
the creator of the challenge underneath your challenge description.
            </Text>

            <Text style={{fontWeight: "bold"}} >How can I report an issue?</Text>
            <Text style={{marginBottom: 10}} >
            In settings on your profile, tap help>report a problem. We thank you for your submission. If you
don’t hear back from us it’s because we will be working on fixing the problem you have
discovered.
            </Text>



            </ScrollView>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Faq);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
});
