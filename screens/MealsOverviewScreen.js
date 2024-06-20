import { StyleSheet, FlatList, View, Text } from 'react-native'
import { MEALS, CATEGORIES } from '../data/dummy-data'
import MealItem from '../components/MealItem'
import { useLayoutEffect } from 'react'

function MealsOverviewScreen({ route, navigation }) {
	const catId = route.params.categoryId

	const displayedMeals = MEALS.filter(mealItem => {
		return mealItem.categoryIds.indexOf(catId) >= 0
	})

	useLayoutEffect(() => {
		const categoriesTitle = CATEGORIES.find(category => category.id === catId).title

		navigation.setOptions({
			title: categoriesTitle,
		})
	}, [catId, navigation])

	function renderMealItem(itemData) {
		const item = itemData.item

		const mealItemProps = {
			title: item.title,
			imageUrl: item.imageUrl,
			affordability: item.affordability,
			complexity: item.complexity,
			duration: item.duration,
		}
		return <MealItem {...mealItemProps} />
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={displayedMeals}
				keyExtractor={item => item.id}
				renderItem={renderMealItem}
			/>
		</View>
	)
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
})
