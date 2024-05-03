import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from '../separator';
import { Button } from 'components/button';
import { useState, useEffect, FormEvent, useRef } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type TUseClose = {
	form: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ form, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!form) return; // останавливаем действие эффекта, если закрыто

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node && // проверяем, что это `DOM`-элемент
				rootRef.current &&
				!rootRef.current.contains(target); // проверяем, что кликнули на элемент, который находится не внутри нашего блока
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		//  обязательно удаляем обработчики в `clean-up`- функции
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
		// обязательно следим за `form`, чтобы срабатывало только при открытии, а не при любой перерисовке компонента
	}, [form, onClose, rootRef]);
}

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
	const ref = useRef<HTMLFormElement | null>(null);

	useClose({
		form,
		onClose: () => setForm(false),
		rootRef: ref,
	});

	function submitSidebar(event: FormEvent) {
		event.preventDefault();
		setDefaultArticle(state);
	}

	function resetSidebar() {
		setState(defaultArticleState);
		setDefaultArticle(defaultArticleState);
	}

	function handleToggleForm() {
		setForm((form) => !form);
	}

	function handleFontFamilyOption(value: OptionType) {
		setState({ ...state, fontFamilyOption: value });
	}

	function handleFontSizeOptions(value: OptionType) {
		setState({ ...state, fontSizeOption: value });
	}

	function handleFontColorOptions(value: OptionType) {
		setState({ ...state, fontColor: value });
	}

	function handleBackgroundColorOptions(value: OptionType) {
		setState({ ...state, backgroundColor: value });
	}

	function handleContentWidthOptions(value: OptionType) {
		setState({ ...state, contentWidth: value });
	}

	return (
		<>
			<ArrowButton form={form} onClick={handleToggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: form })}>
				<form
					className={styles.form}
					onSubmit={submitSidebar}
					onReset={resetSidebar}
					ref={ref}>
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
						onChange={handleFontFamilyOption}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={handleFontSizeOptions}
						title='рАЗМЕР шрифта'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleFontColorOptions}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleBackgroundColorOptions}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleContentWidthOptions}
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
