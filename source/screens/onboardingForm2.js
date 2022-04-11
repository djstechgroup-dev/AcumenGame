import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { handleTextInput, withNextInputAutoFocusForm, withNextInputAutoFocusInput } from 'react-native-formik'
import InputScrollView from 'react-native-input-scroll-view'
import { useRoute, useNavigation } from '@react-navigation/native'
import _ from 'lodash'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { compose } from 'recompose'

import AppStyle from '../other/appearance/appStyle'
import { HeaderLeft, HeaderRight, HeaderCenter } from '../components/header/header_component'
import DropDownForm, { countriesCodes } from '../components/form_components/DropDownForm'
import TextForm from '../components/form_components/TextForm'
import FormStyles from '../components/form_components/FormStyles'
import ButtonForm from '../components/form_components/ButtonForm'
import CM from '../other/appearance/colors_manager'
import t from '../other/languages/localization'
import useStorage from '../other/hooks/use_storage'

import { useApp } from '../other/hooks/appContext'
import NavigationManager from '../navigation/navigation_manager'
import routes from '../navigation/routes'

const styles = FormStyles()

const MyInputDrop = compose(
	handleTextInput,
	withNextInputAutoFocusInput
)(DropDownForm)
const MyInput = compose(
	handleTextInput,
	withNextInputAutoFocusInput
)(TextForm)
const Form = withNextInputAutoFocusForm(View)

const DetailsDataInputs = ({ handleChange, previousVal, touched, errors }) => {
	const detailsPersonalData = [
		{ id: 'Region', title: 'REGION' },
		{ id: 'City', title: 'CITY' },
		{ id: 'Dni', title: 'DNI' },
		{ id: 'PostCode', title: 'POSTCODE' },
		{ id: 'Address', title: 'STREET_ADDRESS' }
	]

	return detailsPersonalData.map(detailsElement => {
		return (
			<MyInput
				key={detailsElement.id}
				onChangeText={handleChange}
				cntStyle={styles.cntView}
				containerStyle={styles.simpleInputContainer}
				returnKeyType="done"
				headingText={t(`USERDATA.${detailsElement.title}`)}
				error={errors[detailsElement.id]}
				touched={touched[detailsElement.id]}
				name={detailsElement.id}
				defaultValue={previousVal[detailsElement.id] || ''}
			/>
		)
	})
}

const CountryDropdownInputs = ({ handleChange, previousVal, touched, errors }) => {
	const countriesInputsData = [
		{ id: 'BornCountry', title: 'BIRTH_PLACE' },
		{ id: 'Nationality', title: 'NATIONALITY' },
		{ id: 'Residency', title: 'COUNTRY_RESIDENCY' }
	]

	const { language } = useApp()

	return countriesInputsData.map(field => {
		return (
			<MyInputDrop
				key={field.id}
				onChangeText={handleChange}
				cntStyle={styles.cntView}
				returnKeyType="done"
				headingText={t(`USERDATA.${field.title}`)}
				formError={errors[field.id]}
				touched={touched[field.id]}
				name={field.id}
				defaultValue={previousVal[field.id] || ''}
				currentLocale={language}
			/>
		)
	})
}

const onBoarding2 = props => {
	const [boardingData, setBoardingData] = useStorage('myFormData', {})

	const route = useRoute()
	const navigation = useNavigation()
	const appStyle = AppStyle()
	const navigateBack = () => {
		navigation.goBack()
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitleAlign: 'center',
			headerStyle: appStyle.headerBackgroundWhite,
			headerTitle: () => (
				<HeaderCenter
					isActivity={true}
					title={route.params?.canGoBack ?? true ? t('USERDATA.DATA') : t('USERDATA.CREATE_YOUR_ACC')}
				/>
			),
			headerRight: () => <HeaderRight iconColor={CM.getColor('white')} />,
			headerLeft: () =>
				route.params?.canGoBack ?? true ? (
					<HeaderLeft actionLeft={navigateBack} />
				) : (
					<HeaderRight iconColor={CM.getColor('white')} />
				)
		})
	})

	const requiredAdvise = t('ONBOARDING_ERR_MSG.REQ')
	const minimumLengthAdvise = t('ONBOARDING_ERR_MSG.MIN_LEN_2')

	const countryType = Yup.string()
		.oneOf(countriesCodes, t('ONBOARDING_ERR_MSG.WRONG_COUNTRY'))
		.required(requiredAdvise)
	const stringType = Yup.string()
		.min(2, minimumLengthAdvise)
		.required(requiredAdvise)

	const yupShape = {
		BornCountry: countryType,
		Nationality: countryType,
		Residency: countryType,
		Region: stringType,
		City: stringType,
		PostCode: stringType,
		Dni: stringType
	}

	const secondFormSchema = Yup.object().shape(yupShape)

	const initialObj = Object.keys(yupShape).reduce((o, key) => {
		return Object.assign(o, { [key]: '' })
	}, {})

	if (!boardingData) {
		return null
	}

	const previousVal = boardingData ? boardingData : {}

	return (
		<Formik
			validateOnBlur={false}
			validateOnChange={false}
			validateOnMount={false}
			initialValues={previousVal ? previousVal : initialObj}
			onSubmit={values => {
				const allValues = Object.assign(previousVal, values)
				setBoardingData(allValues)
				NavigationManager.navigate(routes.userdataOnboarding3)
			}}
			validationSchema={secondFormSchema}
		>
			{({ handleChange, handleSubmit, touched, errors, isSubmitting, values }) => {
				return (
					<>
						<InputScrollView keyboardShouldPersistTaps="handled">
							<Form>
								<View style={styles.inputRow}>
									<CountryDropdownInputs
										handleChange={handleChange}
										previousVal={previousVal}
										touched={touched}
										errors={errors}
									/>
									<DetailsDataInputs
										handleChange={handleChange}
										previousVal={previousVal}
										touched={touched}
										errors={errors}
									/>
								</View>

								<ButtonForm {...isSubmitting} onPress={handleSubmit} text="Continue" />
							</Form>
						</InputScrollView>
					</>
				)
			}}
		</Formik>
	)
}

export default onBoarding2
