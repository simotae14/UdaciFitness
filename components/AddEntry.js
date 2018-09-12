import React, { Component } from 'react';
import { View, TouchableOpacity,Text } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';

import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';

function SubmitButton ({ onPress }) {
	return (
		<TouchableOpacity
			onPress={onPress}
		>
			<Text>SUBMIT</Text>
		</TouchableOpacity>
	);
}

export default class AddEntry extends Component {
	state = {
		run: 0,
		bike: 0,
		swim: 0,
		sleep: 0,
		eat: 0
	}
	increment = (metric) => {
		const { max, step } = getMetricMetaInfo(metric);
		this.setState((state) => {
			const count = state[metric] + step;
			return {
				...state,
				[metric]: count > max ? max : count
			}
		});
	}
	decrement = (metric) => {
		const { step } = getMetricMetaInfo(metric);
		this.setState((state) => {
			const count = state[metric] - step;
			return {
				...state,
				[metric]: count < 0 ? 0 : count
			}
		});
	}
	slide = (metric, value) => {
		this.setState(() => ({
		  [metric]: value
		}))
	}
	submit = () => {
		// create the key
		const key = timeToString();
		// get the data from the state
		const entry = this.state;

		// Update Redux

		// reset the state
		this.setState(() => ({
			run: 0,
			bike: 0,
			swim: 0,
			sleep: 0,
			eat: 0
		}));

		// Navigate to home

		submitEntry({ key, entry });

		// Clear local notification to add data
	}
	reset = () => {
		const key = timeToString();

		// Update Redux

		// Route to the Home

		removeEntry(key);
	}
  	render() {
  		const metaInfo = getMetricMetaInfo();

		// if user already has logged infos we will show him the message
		if (this.props.alreadyLogged) {
			return (
				<View>
					<Ionicons
						name='ios-happy-outline'
						size={100}
					 />
					<Text>You already logged your information for today</Text>
					<TextButton onPress={this.reset}>
						Reset
					</TextButton>
				</View>
			);
		}
    	return (
      		<View>
      			<DateHeader date={(new Date()).toLocaleDateString()} />
				{ Object.keys(metaInfo).map((key) => {
					const { getIcon, type, ...rest } = metaInfo[key];
					const value = this.state[key]

					return (
						<View key={key}>
							{ getIcon() }
							{ type === 'slider'
								? <UdaciSlider
									value={value}
									onChange={(value) => this.slide(key, value)}
									{...rest}
								  />
								: <UdaciSteppers
									value={value}
									onIncrement={() => this.increment(key)}
									onDecrement={() => this.decrement(key)}
									{...rest}
								  />
							}
						</View>
					);
				})}
			</View>
		);
		<SubmitButton
			onPress={this.submit}
		/>
	}
}