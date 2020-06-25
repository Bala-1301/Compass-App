import React from 'react'
import {ImageBackground, Image, Text, View, StyleSheet, ActivityIndicator} from 'react-native'
import { Magnetometer } from 'expo-sensors'

const styles = StyleSheet.create({
	container :{
		flex : 1,
		alignItems: "center",
		justifyContent: "center",
		
	},
	
	north :{
		backgroundColor : "white",
		fontSize : 40,
		color : "black",
		fontWeight : "bold",
		marginBottom : "20%",
		padding : "3%",
		borderRadius : 30,
	},
	footerView : {
		
		borderTopWidth : 0.5,
		borderColor : "white",
		marginBottom : "3%",
	},
	footer : {
		fontSize : 20,
		color : "white",
		
		padding : 10,
		marginLeft : "30%"
	}

})

export default class Compass extends React.Component{
	state = {
		deg : "0",
		direction: "N",
		coordinates : null,
	}
	
	componentDidMount(){
		const isAvailable = this.checkAvailable();
		if(isAvailable)
			this.setUpMagnetometer()
	}

	componentDidUpdate(prevProps,prevState){
		if(this.state != prevState){
			let theta = "0"
			let direction = "N"
			if(this.state.coordinates){
				let {x, y, z} = this.state.coordinates
				theta = Math.atan(x/y)
				if(x < 0 && y > 0){}
				else if(y > 0)
					theta += Math.PI
				else
					theta += Math.PI * 2
			}
			let thetaDeg = theta * (180/Math.PI)
			
			if(thetaDeg > 180 && thetaDeg < 270)
				thetaDeg -= 180
			else if(thetaDeg > 270)
				thetaDeg -= 180
			if(thetaDeg < 0)
				thetaDeg += 360
		
			if(thetaDeg > 337 && thetaDeg < 24)
				direction = "N"
			else if(thetaDeg > 24 && thetaDeg <= 69)
				direction = "NW"
			else if(thetaDeg > 69 && thetaDeg <= 116)
				direction = "W"
			else if(thetaDeg > 116 && thetaDeg <= 160)
					direction = "SW"
			else if(thetaDeg > 160 && thetaDeg <= 205)
				direction = "S"
			else if(thetaDeg > 205 && thetaDeg <= 249)
				direction = "SE"
			else if(thetaDeg > 249 && thetaDeg <= 295)
				direction = "E"
			else if(thetaDeg > 295 && thetaDeg <= 337)
				direction = "NE"
	
			if(Math.abs(thetaDeg - prevState.deg) > 3)
				this.setState({deg : thetaDeg, direction : direction})
		}
	}

	componentWillUnmount(){
		Magnetometer.removeAllListeners()
	}

	checkAvailable = async () => {
		const isAvailable = await Magnetometer.isAvailableAsync()
		return isAvailable
	}

	setUpMagnetometer = async () => {
		Magnetometer.addListener((result) => {
			this.setState({coordinates : result})
		})
	}
	
	render(){
		return(
			<View>
				{this.state.coordinates ?
				<View style = {styles.container}>
					<Text style = {styles.north}>{this.state.direction}</Text>
					<Image 
						source={require('./assets/CompassNeedle.png')}
						style= {{
							transform: [{rotate : `${this.state.deg}deg`}],
							height : 300,
							width : 300,	
						}}
					/>
				</View> 
				: <ActivityIndicator />}
				<View style = {styles.footerView}>
					<Text style = {styles.footer}>Degree : {Math.floor(Math.abs(this.state.deg-360))}</Text>
				</View>
			 
			</View>
			
		)
	}
}