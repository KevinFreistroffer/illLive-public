import React, { useEffect } from "react";
import { Input } from "antd";
import classNames from "classnames";
//import * as styles from "./styles.scss";

export const Meal = ({
	meal,
	deleteMeal,
	mealsLength,
	saveMealName,
	mealNameOnChange
}) => {

	const [mealName, setMealName] = React.useState("");
	const [showInput, toggleInput] = React.useState(false);
	const [showContent, toggleContent] = React.useState(false);
	const [showEdit, toggleShowEdit] = React.useState(true);
	const [currentMeal, setCurrentMeal] = React.useState({});
	const [componentJustMounted, setMounted] = React.useState(false);

	let MealName;
	let MealNameText;
	let SetTitleInput;
	let WhatsInTheMeal;
	let NoItemsInTheMeal;

	useEffect(() => {
		if (!componentJustMounted) {
			for (let key in currentMeal) {
				if (Object.hasOwnProperty(key)) {
				} else if (currentMeal.id !== meal.id) {
					toggleShowEdit(true);
				}

				setMounted(true);
			}
		}

		setCurrentMeal(meal);
		setTimeout(() => toggleShowEdit(false), 2000);
	});

	if (meal) {
		// TODO shouldn't have to check if meal exists. Something about selecting "ADD >" when no meal is created,
		const mealNameClasses = classNames("edit", { "show-edit": showEdit });

		SetTitleInput = (
			<div className="set-meal-name-input-container">
				<Input
					className="set-meal-name-input"
					autoFocus={true}
					placeholder="My meal name is ..."
					value={mealName}
					onChange={event => {
						// Why stopProgagation?
						event.stopPropagation();
						setMealName(event.target.value);
						mealNameOnChange(event.target.value);
					}}
				/>
				<div className="set-meal-name-controls flex space-between align-center">
					<div
						onClick={() => {
							saveMealName();
							setMealName("");
							toggleInput(false);
						}}
					>
						Save
					</div>
					<div
						onClick={() => {
							toggleInput(false);
							setMealName("");
						}}
					>
						Cancel
					</div>
				</div>
			</div>
		);

		MealNameText = meal.name ? (
			<div className="meal-name-text">
				<span className="selected-meal">Selected Meal</span>: {`${meal.name}`}
				<span className={mealNameClasses}>(edit)</span>
			</div>
		) : (
			<div>
				Meal {`${mealsLength}`} <span className="edit">(edit)</span>
			</div>
		);

		MealName = (
			<h1
				className="meal-header-meal-name flex center-all"
				onClick={() => toggleInput(!showInput)}
			>
				{MealNameText}
			</h1>
		);

		WhatsInTheMeal = meal.foodDrinks.map((foodDrink, index) => {
			return (
				<table key={index}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Serving Size</th>
							<th>Measurement</th>
							<th>Number Of Servings</th>
						</tr>
					</thead>
					<tbody>
						<tr key={index}>
							<td>{foodDrink.name}</td>
							<td>{String(foodDrink.servingSize)}</td>
							<td>{String(foodDrink.selectedMeasurement)}</td>
							<td>{String(foodDrink.numOfServings)}</td>
						</tr>
					</tbody>
				</table>
			);
		});

		if (!meal.foodDrinks.length || meal.foodDrinks.length < 1) {
			NoItemsInTheMeal = (
				<div className="no-items-in-the-meal">
					You haven't made this meal yet
				</div>
			);
		}
	}

	return (
		<div
			className="meal"
			onClick={() => {
				toggleContent(!showContent);
			}}
		>
			<div className="meal-header flex space-between align-center">
				{!showInput ? MealName : ""}
				{showInput && SetTitleInput}
				<i
					className="fa fa-trash"
					onClick={event => {
						event.stopPropagation();
						deleteMeal(meal.id);
					}}
				/>
			</div>
			<div className="meal-main">
				{NoItemsInTheMeal}
				{WhatsInTheMeal}
			</div>
		</div>
	);
};

export default Meal;
