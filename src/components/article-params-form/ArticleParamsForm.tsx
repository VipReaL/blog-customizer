import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from '../separator';
import { Button } from 'components/button';
import { useState, useEffect, FormEvent } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	defaultArticle: ArticleStateType;
	setDefaultArticle: (date: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultArticle,
	setDefaultArticle,
}: ArticleParamsFormProps) => {
	const [form, setForm] = useState(false);
	const [state, setState] = useState(defaultArticle);

	function submitSidebar(event: FormEvent) {
		event.preventDefault();
		setDefaultArticle(state);

		console.log(state); // удалить
	}

	function resetSidebar() {
		setState(defaultArticleState);
		setDefaultArticle(defaultArticleState);

		console.log(state); // удалить, с первого раза в консоле выводяться старые данные
	}

	// открытие сайдбара/ закрытие сайдбара
	function openForm() {
		if (form === false) {
			setForm(true);
		} else if (form === true) {
			setForm(false);
		}
	}

	useEffect(() => {
		function closeForm(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setForm(false);
			}
		}
		document.addEventListener('keydown', closeForm);

		return () => {
			document.removeEventListener('keydown', closeForm);
		};
	});

	return (
		<>
			<ArrowButton form={form} openForm={openForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: form })}>
				<form
					className={styles.form}
					onSubmit={submitSidebar}
					onReset={resetSidebar}>
					<Text
						as='h1'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) => {
							setState({ ...state, fontFamilyOption: selected });
							console.log(selected); // удалить
						}}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={(selected) => {
							setState({ ...state, fontSizeOption: selected });
							console.log(selected); // удалить
						}}
						title='рАЗМЕР шрифта'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected) => {
							setState({ ...state, fontColor: selected });
							console.log(selected); // удалить
						}}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected) => {
							setState({ ...state, backgroundColor: selected });
							console.log(selected); // удалить
						}}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected) => {
							setState({ ...state, contentWidth: selected });
							console.log(selected); // удалить
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
