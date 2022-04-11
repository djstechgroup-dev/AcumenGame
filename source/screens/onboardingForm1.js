import React, { useState, useLayoutEffect, useEffect } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Platform } from 'react-native'
import InputScrollView from 'react-native-input-scroll-view'
import { handleTextInput, withNextInputAutoFocusForm, withNextInputAutoFocusInput } from 'react-native-formik'
import { useRoute, useNavigation } from '@react-navigation/native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { compose } from 'recompose'
import routes from '../navigation/routes'
import moment from 'moment'
import Modal from 'react-native-modal'

import { Footer } from '../components/layout'
import TextForm from '../components/form_components/TextForm'
import FormStyles from '../components/form_components/FormStyles'
import ButtonForm from '../components/form_components/ButtonForm'
import AppStyle from '../other/appearance/appStyle'
import { HeaderRight, HeaderCenter } from '../components/header/header_component'
import CM from '../other/appearance/colors_manager'
import t from '../other/languages/localization'

import NavigationManager from '../navigation/navigation_manager'
//import { userExist } from 'Modules/customer/customer_module'
import useStorage from '../other/appearance/use_storage'

const styles = FormStyles()
const MyInput = compose(
	handleTextInput,
	withNextInputAutoFocusInput
)(TextForm)
const Form = withNextInputAutoFocusForm(View)

const basicPersonalData = [
	{ id: 'name', title: 'FIRST_NAME', isLowerCase: false },
	{ id: 'lastName', title: 'LAST_NAMES', isLowerCase: false },
	{ id: 'userName', title: 'USER_NAME', isLowerCase: true },
	{ id: 'email', title: 'EMAIL', isLowerCase: true, keyboardType: 'email-address' }
]

const BasicPersonalDataInputs = ({ handleChange, touched, errors }) => {
	return basicPersonalData.map(inputElement => {
		const elementId = inputElement.id
		const specError = errors[elementId]
		return (
			<MyInput
				key={elementId}
				onChangeText={handleChange}
				cntStyle={styles.cntView}
				containerStyle={styles.simpleInputContainer}
				returnKeyType="done"
				headingText={t(`USERDATA.${inputElement.title}`)}
				error={specError}
				touched={touched[elementId]}
				name={elementId}
				keyboardType={inputElement.keyboardType ? inputElement.keyboardType : 'default'}
				autoCapitalize={inputElement.isLowerCase ? 'none' : 'words'}
			/>
		)
	})
}

const onlyCharsRegEx = /^([^0-9!?_*]*)$/

const eighteenYearsAgo = moment().subtract(18, 'years')

const nameTypePattern = Yup.string()
	.min(2, t('ONBOARDING_ERR_MSG.MIN_LEN_2'))
	.matches(onlyCharsRegEx, t('ONBOARDING_ERR_MSG.ONLY_LETTERS'))
	.required(t('ONBOARDING_ERR_MSG.REQ'))

const FirstForm = props => {
	const route = useRoute()
	const navigation = useNavigation()
	const appStyle = AppStyle()
	const [boardingData, setBoardingData] = useStorage('myFormData')
	const [showPicker, setShowPicker] = useState(false)
	const emailBackendValidation = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

	const yupShape = {
		name: nameTypePattern,
		lastName: nameTypePattern,
		userName: Yup.string()
			.matches(/^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, t('ONBOARDING_ERR_MSG.WRONG_USERNAME'))
			.required(t('ONBOARDING_ERR_MSG.REQ'))
			/*.test('userExist', t('ONBOARDING_ERR_MSG.USR_EXIST'), async function(value) {
				if (!value) return true
				const resp = await props.handleUserExist('username', value)
				return !resp.data.exists
			})*/,
		email: Yup.string()
			.matches(emailBackendValidation, t('ONBOARDING_ERR_MSG.MAIL_WRONG'))
			.required(t('ONBOARDING_ERR_MSG.REQ'))
			/*.test('mailExist', t('ONBOARDING_ERR_MSG.MAIL_EXIST'), async function(value) {
				if (!value) return true
				const resp = await props.handleUserExist('email_address', value)
				return !resp.data.exists
			})*/,
		birthDate: Yup.date()
			.max(eighteenYearsAgo.toDate())
			.required()
	}

	const FirstFormSchema = Yup.object().shape(yupShape)

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
			headerLeft: () => <HeaderRight iconColor={CM.getColor('white')} />
		})
	})

	const initialObj = Object.keys(yupShape).reduce((o, key) => {
		return Object.assign(o, { [key]: '' })
	}, {})

	const previousVal = boardingData ? boardingData : null
	const [birthDate, setBirthDate] = useState(eighteenYearsAgo.toDate())
	const [isDateEmptyDefault, setIsDateEmptyDefault] = useState(true)

	const updateDateBirth = (date, setFieldValue, validateForm) => {
		setBirthDate(date)
		setFieldValue('birthDate', date, true)
		validateForm()
		if (isDateEmptyDefault) setIsDateEmptyDefault(false)
	}

	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={previousVal ? previousVal : initialObj}
				onSubmit={values => {
					values.userName = values.userName.toLowerCase()
					values.email = values.email.toLowerCase()
					setBoardingData(values)
					NavigationManager.navigate(routes.userdataOnboarding2)
				}}
				validationSchema={FirstFormSchema}
				validateOnMount={false}
				validateOnBlur={false}
				validateOnChange={false}
			>
				{({
					handleChange,
					handleSubmit,
					isValid,
					touched,
					errors,
					isSubmitting,
					setFieldValue,
					validateForm,
					values
				}) => {
					return (
						<>
							<InputScrollView keyboardOffset={60} style={styles.onboardingViewer}>
								<Form>
									<View>
										<BasicPersonalDataInputs
											handleChange={handleChange}
											touched={touched}
											errors={errors}
											previousVal={previousVal}
										/>

										<View>
											<TouchableOpacity
												onPress={() => setShowPicker(!showPicker)}
												style={[styles.firstView, styles.birthDateContainer]}
											>
												<View>
													<Text style={styles.groupInputPlaceHolder}>{t('USERDATA.BIRTH_DATE')}</Text>
													<Text style={styles.infoTextView}>
														{!isDateEmptyDefault ? birthDate.toLocaleDateString('es-ES') : ''}
													</Text>
												</View>
											</TouchableOpacity>

											<View style={styles.errorContainer}>
												<Text style={styles.dateErrorInput}>{errors.birthDate}</Text>
											</View>
										</View>
									</View>
									{showPicker && Platform.OS === 'ios' && (
										<Modal
											isVisible={showPicker}
											animationIn="slideInUp"
											animationOut="slideOutDown"
											style={styles.datePickerContainer}
											backdropOpacity={0.3}
											onBackdropPress={() => setShowPicker(!showPicker)}
											coverScreen={true}
										>
											<View>
												<RNDateTimePicker
													display="spinner"
													style={{ backgroundColor: 'white' }}
													value={birthDate}
													maximumDate={eighteenYearsAgo.toDate()}
													onChange={(event, date) => {
														setShowPicker(true)
														updateDateBirth(date, setFieldValue, validateForm)
													}}
												/>
											</View>
										</Modal>
									)}
									{showPicker && Platform.OS === 'android' && (
										<RNDateTimePicker
											display="calendar"
											style={{ backgroundColor: 'white' }}
											value={birthDate}
											maximumDate={eighteenYearsAgo.toDate()}
											onChange={(event, date) => {
												setShowPicker(false)
												// date undefined on android Cancel
												if (date) {
													updateDateBirth(date, setFieldValue, validateForm)
												}
											}}
										/>
									)}
								</Form>
								<Footer>
									<ButtonForm {...isSubmitting} onPress={handleSubmit} text="Continue" disabled={!isValid} />
								</Footer>
							</InputScrollView>
						</>
					)
				}}
			</Formik>
		</>
	)
}

/* const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	//handleUserExist: (mailoruser, username) => dispatch(userExist(mailoruser, username))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FirstForm) */
export default FirstForm