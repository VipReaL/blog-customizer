import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
// import { Select } from 'components/select';
// import { RadioGroup } from 'components/radio-group';
import { Separator } from '../separator';
import { Button } from 'components/button';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [form, setForm] = useState(false);

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
				<form className={styles.form}>
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

					<Separator />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
