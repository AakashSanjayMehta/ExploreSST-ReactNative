import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Image,
    ScrollView,
    StyleSheet,
    Modal,
		Alert,
		Animated,
		Linking
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import GeneralOffice from "../../assets/images/go.png";
import LinearGradient from "react-native-linear-gradient";
import { conversations, conversationsSec3 } from "../Conversations";
import Background from "../../assets/images/background.png";
import PriyaProfile from "../../assets/images/Priya_profile.png";
import {ChatIcon, CloseIcon, SendIcon} from "../Components/IconSet"


class IRAP extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.fadeAnimation = new Animated.Value(0);
	}
	state = {
    modalVisible: false
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

	componentDidMount() {
		Animated.timing(this.fadeAnimation, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start()
	}

	// THIS IS THE NEW FUNCTION
  openURL(url) {
		if (url != "") {
      Linking.openURL(url);
      return true;
		} return false;
  }
  
  // THIS IS THE NEW FUNCTION
  prompts(name, prompt_text, sequence, url) {
    const position = 22 + 78*sequence;
    return (
      <TouchableOpacity
        style={[styles.buttonStyle,{bottom: position}]}
        onPress={() => {
          const { navigation } = this.props;
          if (!this.openURL(url)) {
            navigation.navigate(name);
            this.setModalVisible(false);
          }

        }}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={["#84C7C3", "#0084C2"]}
          style={styles.linGrad}
        >
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            flex: 1,
          }}>
            <Text style={{
              color: "white",
              fontFamily: "Avenir Next",
              alignSelf: "center",
              marginLeft: 20,
              flex: 1,
              fontSize: 16,
            }}>{prompt_text}</Text>

<SendIcon />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

	render() {
		const { navigation } = this.props;
		const conversationBubbles = [];

		// CHANGE HERE
		const content = conversationsSec3.IRAP;

		for (let i = 0; i < content.length; i += 1) {
			if (i == 0) {
				conversationBubbles.push(
					<Animated.View style={{ opacity: this.fadeAnimation }}>
						<View style={styles.AskingView}>
							<Text style={styles.AskingText}>{content[0][0]}</Text>
						</View>
					</Animated.View>
				);
			} else {
				conversationBubbles.push(
					<Animated.View style={{ opacity: this.fadeAnimation }}>
						<View style={[styles.ChatViewStyle]}>
							<Text style={styles.ChatTextStyle}
								onPress={this.openURL.bind(this, content[i][1])}>{content[i][0]}</Text>
						</View>
					</Animated.View>
				);
			}
		}
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "black"
				}}
			>
				<ImageBackground
					source={Background}
					style={{
						flex: 1,
						resizeMode: "contain"
					}}
					imageStyle={{ opacity: 0.5 }}
				>
					<SafeAreaView
						style={{
							flex: 1,
							margin: 16
						}}
					>
						<Modal
							animationType="fade"
							transparent={true}
							visible={this.state.modalVisible}
						>
							<View style={{
								flex: 1,
								backgroundColor: "rgba(0, 0, 0, 0.7)",
								margin: 0,
								alignItems: "center",
								justifyContent: "center"
							}}>
								<View style={{
									position: "absolute",
									top: 16,
									bottom: 16,
									left: 16,
									right: 16,
								}}>
									
									{this.prompts("ISS", "Tell me more about ISS", 1, "")}
									{this.prompts("", "Tell me more about other IRAP opportunities", 2, "https://www.facebook.com/ssts.1technologydrive/videos/1437990226211231/?__xts__%5B0%5D=68.ARAZ4mqbfzCC56I-x98G6qymJrSsR9HFTq3xuLToUURFpyL_Q7d6DW8MzBxPX-PtHKNH_h2UEuCwQNi6m6id4f-h_asMG4xq9AvHRXOgGJBaBccOtCdUqszctOOKkxWoi7ZjtbTWTT2_01jyyHgJWNtkQeME_x0MakifmvPRGK0uGJmnol7pXQ&__tn__=-R")}
									{this.prompts("", "Let me take a look at photos of SST students during IRAP!", 3, "https://www.facebook.com/ssts.1technologydrive/posts/1823371601006423?__xts__%5B0%5D=68.ARBD-DuVmdlNyNUsfHEHVM9vVp1QTvz7CBnAHZ7dPyWVSnDPy-LpT40yquUqnlwmLKVPALizyL1z7xMls7UAipMoBGi7CiD7RtFQJiLb2KGUCuvW_3-xHqNqQwH5Yyfr20Qunx6u9T5q-f-7vibPwzEEhNJKF7JHOCJ6j5xD2cMwjBtDt5WhLJDHuDs_k5L2ia-ttA&__tn__=-R")}

									{/* //TODO:1.1.1 */}
									{/* <QuestionButton converseText="How did you get to know SST?" tOffset="70%"  navigation={this.props.navigation} conversation="KnowingSST" onPress={}/>
                  <QuestionButton converseText=" I hear that students come from different primary schools here - how do you make friends?" tOffset="80%" navigation={this.props.navigation} conversation="MakingFriends" action={()=>{this.onNavigate}}/>
                  <QuestionButton converseText="Ask my own question" tOffset="80%"/> */}
								</View>
								<TouchableOpacity
									style={{
										position: "absolute",
										backgroundColor: "#84C7C3",
										position: "absolute",
										height: 60,
										width: 60,
										bottom: 24,
										right: 0,

										alignItems: "center",
										justifyContent: "center",
										borderRadius: 30,
										margin: 16
									}}
									onPress={() => {
										this.setModalVisible(!this.state.modalVisible);
									}}
								>
									<LinearGradient
										start={{ x: 0, y: 1 }}
										end={{ x: 1, y: 0 }}
										colors={["#84C7C3", "#0084C2"]}
										style={{
											alignItems: "center",
											justifyContent: "center",
											borderRadius: 30,
											width: "100%",
											height: "100%",
										}}
									>

<CloseIcon/>
									</LinearGradient>
								</TouchableOpacity>
							</View>

						</Modal>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								paddingBottom: 8
							}}
						>
							<Image
								style={{
									width: 50,
									height: 50,
									borderRadius: 25,
									resizeMode: "cover",
									alignItems: "flex-start"
								}}
								source={PriyaProfile}
							/>
							<Text
								style={{
									fontFamily: "Avenir Next",
									textAlign: "center",
									fontSize: 30,
									fontWeight: "600",
									color: "white",
									paddingLeft: 16
								}}
							>
								Priya
								</Text>
						</View>
						<ScrollView>
							{conversationBubbles}
						</ScrollView>
						<TouchableOpacity
							style={{

								backgroundColor: "#84C7C3",
								position: "absolute",
								height: 60,
								width: 60,
								bottom: 24,
								right: 0,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 30,
							}}
							onPress={() => {
								this.setModalVisible(!this.state.modalVisible);
							}}
						>
							<LinearGradient
								start={{ x: 0, y: 1 }}
								end={{ x: 1, y: 0 }}
								colors={["#84C7C3", "#0084C2"]}
								style={{
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 30,
									width: "100%",
									height: "100%",
								}}
							>

<ChatIcon />
							</LinearGradient>
						</TouchableOpacity>
					</SafeAreaView>
					<SafeAreaView
						style={{
							marginTop: 16,
							marginLeft: 8,
							position: "absolute"
						}}
					>
						<TouchableOpacity
							onPress={() => {
								const { navigation } = this.props
								navigation.goBack();
							}}
						>
							<Icon name="keyboard-arrow-left" color="white" size={40} />
						</TouchableOpacity>
					</SafeAreaView>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	AskingView: {
		width: "75%",
		backgroundColor: "darkgrey",
		shadowColor: "gray",
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowOpacity: 1,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "flex-end",
		marginTop: 16
	},

	AskingText: {
		padding: 8,
		fontSize: 18,
		fontFamily: "Avenir Next",
		color: "white"
	},
	ChatTextStyle: {
		padding: 8,
		fontSize: 18,
		fontFamily: "Avenir Next"
	},
	ChatViewStyle: {
		width: "75%",
		backgroundColor: "white",
		shadowColor: "gray",
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowOpacity: 1,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: 16
	},
	buttonStyle: {
		position: "absolute",
		opacity: 1,
		backgroundColor: "#84C7C3",
		position: "absolute",
		height: 60,
		width: "100%",
		borderRadius: 30,
		width: "100%",
	},
	linGrad: {
		opacity: 1,
		borderRadius: 20,
		width: "100%",
		height: "100%",
	}
})

export default IRAP