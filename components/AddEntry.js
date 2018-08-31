import React, { Component } from 'react';
import { View, TouchableOpacity,Text } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';

import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader';

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
	slide = (metric, newValue) => {
		this.setState((state) => ({
			[metric]: newValue
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

		// Save to 'DB'

		// Clear local notification to add data
	}
  	render() {
  		const metaInfo = getMetricMetaInfo();

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
									onChange={() => this.slide(key, value)}
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