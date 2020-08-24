import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

class Terms extends React.Component {

  render() {

    return (
        <View style={styles.container}>   
            <ScrollView>
            <Text style={{fontWeight: "bold", fontSize: 24, marginBottom: 10}} >Terms and Conditions</Text>
            <Text style={{marginBottom: 10}} >
                These are the Terms and Conditions governing the use of this Service and the agreement
                that operates between You and the SnapHunt. These Terms and Conditions set out the rights
                and obligations of all users regarding the use of the Service.
                Your access to and use of the Service is conditioned on Your acceptance of and compliance
                with these Terms and Conditions. These Terms and Conditions apply to all visitors, users
                and others who access or use the Service.
                By accessing or using the Service You agree to be bound by these Terms and Conditions. If
                You disagree with any part of these Terms and Conditions then You may not access the
                Service.
                You represent that you are over the age of 18. Snaphunt Inc does not permit those under 18
                to use the Service.
                Your access to and use of the Service is also conditioned on Your acceptance of and
                compliance with the Privacy Policy of Snaphunt Inc. Our Privacy Policy describes Our
                policies and procedures on the collection, use and disclosure of Your personal information
                when You use the Application or the Website and tells You about Your privacy rights and
                how the law protects You. Please read Our Privacy Policy carefully before using Our Service.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Subscriptions</Text>
            <Text style={{fontWeight: "bold"}} >Subscription period</Text>
            <Text style={{marginBottom: 10}} >
                The Service or some parts of the Service are available only with a paid Subscription. You will be billed in advance on a recurring and periodic basis (such as daily, weekly, monthly or annually), depending on the type of Subscription plan you select when purchasing the Subscription.
                At the end of each period, Your Subscription will automatically renew under the exact same conditions unless You cancel it or Snaphunt Inc cancels it.
            </Text>

            <Text style={{fontWeight: "bold",  marginBottom: 10}} >Subscription cancellations</Text>
            <Text style={{marginBottom: 10}} >
                You may cancel Your Subscription renewal either through Your Account settings page or by contacting Snaphunt Inc. You will not receive a refund for the fees You already paid for Your current Subscription period and You will be able to access the Service until the end of Your current Subscription period.
                If the Subscription has been made through an In-app Purchase, You can cancel the renewal of Your Subscription with the Application Store.
            </Text>

            <Text style={{fontWeight: "bold",  marginBottom: 10}} >Billing</Text>
            <Text style={{marginBottom: 10}} >
            You shall provide Snaphunt Inc with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information.
Should automatic billing fail to occur for any reason, Snaphunt Inc will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.
If the Subscription has been made through an In-app Purchase, all billing is handled by the Application Store and is governed by the Application Store's own terms and conditions.
            </Text>


            <Text style={{fontWeight: "bold",  marginBottom: 10}} >Fee Changes</Text>
            <Text style={{marginBottom: 10}} >
            Snaphunt Inc, in its sole discretion and at any time, may modify the Subscription fees. Any Subscription fee change will become effective at the end of the then-current Subscription period.
Snaphunt Inc will provide You with reasonable prior notice of any change in Subscription fees to give You an opportunity to terminate Your Subscription before such change becomes effective.
Your continued use of the Service after the Subscription fee change comes into effect constitutes Your agreement to pay the modified Subscription fee amount.
            </Text>


            <Text style={{fontWeight: "bold",  marginBottom: 10}} >Refunds</Text>
            <Text style={{marginBottom: 10}} >
            Except when required by law, paid Subscription fees are non-refundable.
Certain refund requests for Subscriptions may be considered by Snaphunt Inc on a case-by-case basis and granted at the sole discretion of Snaphunt Inc.
If the Subscription has been made through an In-app purchase, the Application Store's refund policy will apply. If You wish to request a refund, You may do so by contacting the Application Store directly.
            </Text>


            <Text style={{fontWeight: "bold", marginBottom: 10}} >Free Trial</Text>
            <Text style={{marginBottom: 10}} >
            Snaphunt Inc may, at its sole discretion, offer a Subscription with a Free trial for a limited period of time.
You may be required to enter Your billing information in order to sign up for the Free trial.
If You do enter Your billing information when signing up for a Free Trial, You will not be charged by Snaphunt Inc until the Free trial has expired. On the last day of the Free Trial period, unless You cancelled Your Subscription, You will be automatically charged the applicable Subscription fees for the type of Subscription You have selected.
At any time and without notice, Snaphunt Inc reserves the right to (i) modify the terms and conditions of the Free Trial offer, or (ii) cancel such Free trial offer.
            </Text>


            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >In-app Purchases</Text>
            <Text style={{marginBottom: 10}} >
            The Application may include In-app Purchases that allow you to buy products, services or Subscriptions.
More information about how you may be able to manage In-app Purchases using your Device may be set out in the Application Store's own terms and conditions or in your Device's Help settings.
In-app Purchases can only be consumed within the Application. If you make a In-app Purchase, that In-app Purchase cannot be cancelled after you have initiated its download. In-app Purchases cannot be redeemed for cash or other consideration or otherwise transferred.
If any In-app Purchase is not successfully downloaded or does not work once it has been successfully downloaded, we will, after becoming aware of the fault or being notified to the fault by You, investigate the reason for the fault. We will act reasonably in deciding whether to provide You with a replacement In-app Purchase or issue You with a patch to repair the fault. In no event will We charge You to replace or repair the In-app Purchase. In the unlikely event that we are unable to replace or repair the relevant In-app Purchase or are unable to do so within a reasonable period of time and without significant inconvenience to You, We will authorize the Application Store to refund You an amount up to the cost of the relevant In-app Purchase. Alternatively, if You wish to request a refund, You may do so by contacting the Application Store directly.
You acknowledge and agree that all billing and transaction processes are handled by the Application Store from where you downloaded the Application and are governed by that Application Store's own terms and conditions.
If you have any payment related issues with In-app Purchases, then you need to contact the Application Store directly.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Promotions</Text>
            <Text style={{marginBottom: 10}} >
            Any Promotions made available through the Service may be governed by rules that are separate from these Terms.
If You participate in any Promotions, please review the applicable rules as well as our Privacy policy. If the rules for a Promotion conflict with these Terms, the Promotion rules will apply.
            </Text>


            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >User Accounts</Text>
            <Text style={{marginBottom: 10}} >
            When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.
You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.
You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.
You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.
            </Text>


            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Content</Text>
            <Text style={{fontWeight: "bold"}} >Your Right to Post Content</Text>
            <Text style={{marginBottom: 10}} >
            Our Service allows You to post Content. You are responsible for the Content that You post to the Service, including its legality, reliability, and appropriateness.
By posting Content to the Service, You grant Us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of Your rights to any Content You submit, post or display on or through the Service and You are responsible for protecting those rights. You agree that this license includes the right for Us to make Your Content available to other users of the Service, who may also use Your Content subject to these Terms.
You represent and warrant that: (i) the Content is Yours (You own it) or You have the right to use it and grant Us the rights and license as provided in these Terms, and (ii) the posting of Your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
            </Text>

            <Text style={{fontWeight: "bold"}} >Content Restrictions</Text>
            <Text style={{marginBottom: 10}} >
            Snaphunt Inc is not responsible for the content of the Service's users. You expressly understand and agree that You are solely responsible for the Content and for all activity that occurs under your account, whether done so by You or any third person using Your account.
You may not transmit any Content that is unlawful, offensive, upsetting, intended to disgust, threatening, libelous, defamatory, obscene or otherwise objectionable. Examples of such objectionable Content include, but are not limited to, the following:
Unlawful or promoting unlawful activity.
Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups.
Spam, machine – or randomly – generated, constituting unauthorized or unsolicited advertising, chain letters, any other form of unauthorized solicitation, or any form of lottery or gambling.
Containing or installing any viruses, worms, malware, trojan horses, or other content that is designed or intended to disrupt, damage, or limit the functioning of any software, hardware or telecommunications equipment or to damage or obtain unauthorized access to any data or other information of a third person.
Infringing on any proprietary rights of any party, including patent, trademark, trade secret, copyright, right of publicity or other rights.
Impersonating any person or entity including Snaphunt Inc and its employees or representatives.
Violating the privacy of any third person.
False information and features.
Snaphunt Inc reserves the right, but not the obligation, to, in its sole discretion, determine whether or not any Content is appropriate and complies with this Terms, refuse or remove this Content. Snaphunt Inc further reserves the right to make formatting and edits and change the manner any Content. Snaphunt Inc can also limit or revoke the use of the Service if You post such objectionable Content. As Snaphunt Inc cannot control all content posted by users and/or third parties on the Service, you agree to use the Service at your own risk. You understand that by using the Service You may be exposed to content that You may find offensive, indecent, incorrect or objectionable, and You agree that under no circumstances will Snaphunt Inc be liable in any way for any content, including any errors or omissions in any content, or any loss or damage of any kind incurred as a result of your use of any content.
            </Text>

            <Text style={{fontWeight: "bold"}} >Content Backups</Text>
            <Text style={{marginBottom: 10}} >
            Although regular backups of Content are performed, Snaphunt Inc do not guarantee there will be no loss or corruption of data.
Corrupt or invalid backup points may be caused by, without limitation, Content that is corrupted prior to being backed up or that changes during the time a backup is performed.
Snaphunt Inc will provide support and attempt to troubleshoot any known or discovered issues that may affect the backups of Content. But You acknowledge that Snaphunt Inc has no liability related to the integrity of Content or the failure to successfully restore Content to a usable state.
You agree to maintain a complete and accurate copy of any Content in a location independent of the Service.
            </Text>


            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Copyright Policy</Text>
            <Text style={{fontWeight: "bold"}} >Intellectual Property Infringement</Text>
            <Text style={{marginBottom: 10}} >
            We respect the intellectual property rights of others. It is Our policy to respond to any claim that Content posted on the Service infringes a copyright or other intellectual property infringement of any person.
If You are a copyright owner, or authorized on behalf of one, and You believe that the copyrighted work has been copied in a way that constitutes copyright infringement that is taking place through the Service, You must submit Your notice in writing to the attention of our copyright agent via email at contact@snaphunt.ca and include in Your notice a detailed description of the alleged infringement.
You may be held accountable for damages (including costs and attorneys' fees) for misrepresenting that any Content is infringing Your copyright.
            </Text>

            <Text style={{fontWeight: "bold"}} >DMCA Notice and DMCA Procedure for Copyright Infringement Claims</Text>
            <Text style={{marginBottom: 10}} >
            You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):
An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright's interest.
A description of the copyrighted work that You claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work.
Identification of the URL or other specific location on the Service where the material that You claim is infringing is located.
Your address, telephone number, and email address.
A statement by You that You have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.
A statement by You, made under penalty of perjury, that the above information in Your notice is accurate and that You are the copyright owner or authorized to act on the copyright owner's behalf.
You can contact our copyright agent via email at contact@snaphunt.ca. Upon receipt of a notification, Snaphunt Inc will take whatever action, in its sole discretion, it deems appropriate, including removal of the challenged content from the Service.
            </Text>


            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Intellectual Property</Text>
            <Text style={{marginBottom: 10}} >
            The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of Snaphunt Inc and its licensors.
The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.
Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Snaphunt Inc.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Your Feedback to Us</Text>
            <Text style={{marginBottom: 10}} >
            You assign all rights, title and interest in any Feedback You provide Snaphunt Inc. If for any reason such assignment is ineffective, You agree to grant Snaphunt Inc a non-exclusive, perpetual, irrevocable, royalty free, worldwide right and licence to use, reproduce, disclose, sub-licence, distribute, modify and exploit such Feedback without restriction.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Links to Other Websites</Text>
            <Text style={{marginBottom: 10}} >
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Snaphunt Inc.
Snaphunt Inc has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Snaphunt Inc shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.
We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Termination</Text>
            <Text style={{marginBottom: 10}} >
            We may terminate or suspend Your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
            Upon termination, Your right to use the Service will cease immediately. If You wish to terminate Your Account, You may simply discontinue using the Service.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Limitation of Liability</Text>
            <Text style={{marginBottom: 10}} >
            Notwithstanding any damages that You might incur, the entire liability of Snaphunt Inc and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
To the maximum extent permitted by applicable law, in no event shall Snaphunt Inc or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if Snaphunt Inc or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >"AS IS" and "AS AVAILABLE" Disclaimer</Text>
            <Text style={{marginBottom: 10}} >
            The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, Snaphunt Inc, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, Snaphunt Inc provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
Without limiting the foregoing, neither Snaphunt Inc nor any of Snaphunt Inc's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of Snaphunt Inc are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
            </Text>


            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Governing Law</Text>
            <Text style={{marginBottom: 10}} >
            The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Disputes Resolution</Text>
            <Text style={{marginBottom: 10}} >
            If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting Snaphunt Inc.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >For European Union (EU) Users</Text>
            <Text style={{marginBottom: 10}} >
            If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >United States Federal Government End Use Provisions</Text>
            <Text style={{marginBottom: 10}} >
            If You are a U.S. federal government end user, our Service is a "Commercial Item" as that term is defined at 48 C.F.R. §2.101.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >United States Legal Compliance</Text>
            <Text style={{marginBottom: 10}} >
            You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
            </Text>


            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Severability and Waiver</Text>
            <Text style={{fontWeight: "bold", marginBottom: 10}} >Severability</Text>
            <Text style={{marginBottom: 10}} >
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
            </Text>

            <Text style={{fontWeight: "bold", marginBottom: 10}} >Waiver</Text>
            <Text style={{marginBottom: 10}} >
                Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Translation Interpretation</Text>
            <Text style={{marginBottom: 10}} >
            These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.
            </Text>

            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Changes to These Terms and Conditions</Text>
            <Text style={{marginBottom: 10}} >
            We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.
            </Text>


            <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 10}} >Contact Us</Text>
            <Text style={{marginBottom: 10}} >
            If you have any questions about these Terms and Conditions, You can contact us:
By email: contact@snaphunt.ca
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
)(Terms);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
});
