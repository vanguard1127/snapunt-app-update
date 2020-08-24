import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform,
    SafeAreaView,
    ActivityIndicator
  } from 'react-native';
import { connect } from 'react-redux';
import { userSelector } from '../../../store/selectors/UserSelector'; 
import { Formik, Field } from 'formik';
import { TextInputField } from '../../../components/shared/FormFields';
import { DarkOutlineButton, OutlineButton } from '../../../components/shared/Button/Button';
import { cardValidation } from '../../../validation/payment';
import { setLoader, setRefreshLoading, setFlashMessage } from '../../../store/actions/LoaderAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { paymentService } from '../../../services/PaymentService';
import NavigationService from '../../../services/NavigationService';
import Loader from '../../../components/Loader';
import Colors from '../../../constants/Colors';
import { setUpdatedUser } from '../../../store/actions/UserActions';
var stripe = require('stripe-client')('pk_live_9w6ZbguO8VszDTlyis9Ggf3W00exTEtLsm');

class AddCard extends React.Component {
   
    state = {
        loading: true,
        container: 1
    }

    async componentDidMount(){
        try{
            var {data} =  await paymentService.subscribed()
            if(data.subscribed){
                this.setState({ loading: false })
            }else{
                this.setState({ loading: false, container: 2 })
            }
        }catch(e){
            this.props.setFlashMessage("Something went wrong, please try again")
        }
    }

    async processStripe(values){

        if(!this.props.loading){
            var information = {
                card: {
                    number: values.card_number,
                    exp_month: values.expireMonth,
                    exp_year: values.expireYear,
                    cvc: values.cvc,
                    name: values.name
                  }
            }
    
            try{
                this.props.setLoader(true)
                var card = await stripe.createToken(information);
                if(card.error != undefined){
                    alert(card.error.message)
                }else{
                    var {data} = await paymentService.subscribePremium(card)
                    this.props.setUpdatedUser(data)
                    this.props.setFlashMessage("Successfully subscribed!")
                    NavigationService.navigate("CreatePost", {addCard: true})
                }
            }catch(e){
                this.props.setLoader(false)
                this.props.setFlashMessage("Could'nt connet with stripe")
                console.log(e)
            }finally{
                this.props.setLoader(false)
            }
        }else{
            alert("Transaction already in process!")
        }
    }

  render() {
    return (
      <View style={styles.container} >
          {this.state.loading ? (<Loader />) : (
            (() => {
                switch(this.state.container) {
                case 1: 
                return (
                    <View style={{justifyContent: "center", alignItems: "center", flex: 1}} >
                        <Text style={{fontWeight: "bold", fontSize: 18, textAlign: "center", marginBottom: 30, color: "#fff"}} >Payment method already attached, Contact support if you need help.</Text>
                        {/* <DarkOutlineButton text="Go Home" onPress={() => NavigationService.navigate("Home")}  /> */}
                    </View>
                )
                case 2: 
                    return (
                        <KeyboardAwareScrollView enableOnAndroid
                        contentContainerStyle={styles.scorllViewContainer}>
                        {/* <Text style={{fontWeight: "bold", fontSize: 18, textAlign: "center", marginBottom: 3, color: "#fff"}} >Subscription Plan: $2.99 CAD/Month</Text> */}
                        <Text style={{fontWeight: "bold", fontSize: 16,textAlign: "center", color: "grey", marginBottom: 10, color: "#fff"}} >All transactions are secured, powered by Stripe!</Text>
                        <Formik
                            initialValues={{
                                card_number: "",
                                name: "",
                                expireMonth: "",
                                expireYear: "",
                                cvc: ""
                            }}
                            onSubmit={values => this.processStripe(values)}
                            validationSchema={cardValidation}
                        >
                            {({ handleSubmit }) => (
                            <View>
                                <Field
                                name="card_number"
                                component={TextInputField}
                                placeholder={"Enter card number"}
                                style={{backgroundColor: Colors.backgroundColor}}
                                />
                                <Field
                                name="name"
                                component={TextInputField}
                                placeholder={"Enter card owner name"}
                                style={{backgroundColor: Colors.backgroundColor}}
                                />
            
                                <Field
                                name="expireMonth"
                                component={TextInputField}
                                placeholder={"Enter expiry month"}
                                style={{backgroundColor: Colors.backgroundColor}}
                                />
            
                            <Field
                                name="expireYear"
                                component={TextInputField}
                                placeholder={"Enter expire year"}
                                style={{backgroundColor: Colors.backgroundColor}}
                                />
            
                                <Field
                                name="cvc"
                                component={TextInputField}
                                placeholder={"Enter CVC"}
                                style={{backgroundColor: Colors.backgroundColor}}
                                />
            
                                { this.props.loading ? <ActivityIndicator style={{marginTop: 20}}/> : <OutlineButton onPress={handleSubmit} text={"Add"} style={{marginTop: 20}} />}
                            </View>
                            )}
                        </Formik>
                        </KeyboardAwareScrollView>        )
                }
            })()
          ) }

      </View>
    );
  }
}

const mapStateToProps = state => {
  return { 
      user: userSelector(state),
      loading: state.loaderReducer.globalLoader
   };
};

const mapDispatchToProps = {
    setLoader,
    setFlashMessage,
    setUpdatedUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        padding: 20
      },
      scorllViewContainer:{
        flex: 1,
        flexDirection: 'column',
    }
});
