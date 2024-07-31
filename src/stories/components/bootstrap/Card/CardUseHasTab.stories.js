import React from 'react';
import CardStories from './Card.stories';
import Card, { CardTabItem } from '../../../../components/bootstrap/Card';

export default {
	...CardStories,
	title: 'Components/<Card>/PROPS/hasTab',
	argTypes: {
		...CardStories.argTypes,
		children: { control: false, table: { category: 'Card' } },
	},
};

const Template = (args) => (
	// eslint-disable-next-line react/jsx-props-no-spreading
	<Card {...args} />
);

export const Default = Template.bind({});
Default.args = {
	hasTab: true,
	children: [
		<CardTabItem key={1} id='tab-one' title='Tab One'>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a augue ac velit
				porttitor auctor. Orci varius natoque penatibus et magnis dis parturient montes,
				nascetur ridiculus mus. Etiam libero mauris, sodales at aliquet ut, sagittis eget
				libero. Suspendisse dictum dignissim lectus at commodo. Aenean porttitor nisi et
				efficitur consequat. Etiam nec dolor vitae felis vestibulum placerat vel eget
				mauris. Maecenas ac nisl dapibus, fermentum massa vel, imperdiet orci. Aenean
				vulputate aliquam velit, nec gravida tellus volutpat sed. Nunc justo eros, vulputate
				id dictum quis, sollicitudin at turpis. Mauris quis tortor fermentum, fringilla
				velit non, placerat sapien. Duis iaculis imperdiet massa at cursus. Praesent
				efficitur ultricies eros at tempus.
			</p>
		</CardTabItem>,
		<CardTabItem key={2} id='tab-two' title='Tab Two'>
			<p>
				Mauris tincidunt magna et scelerisque maximus. Donec eget turpis sed turpis accumsan
				congue non a quam. Ut molestie nibh at ligula convallis posuere. Nullam at placerat
				mi. Nulla non diam condimentum, congue odio eu, posuere dolor. Phasellus convallis
				turpis turpis, semper posuere justo aliquet euismod. Sed convallis sollicitudin
				neque ac cursus. Aliquam porta mauris vitae erat congue fringilla. Morbi nec est
				mattis, pretium ante nec, venenatis velit. Aenean pulvinar gravida porta. Aliquam
				erat volutpat. Aenean et semper nunc. Vivamus sit amet finibus tellus. Praesent
				posuere porta tortor eget facilisis.
			</p>
		</CardTabItem>,
	],
};
