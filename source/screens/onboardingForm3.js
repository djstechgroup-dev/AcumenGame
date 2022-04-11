import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import toLower from 'lodash/toLower'

import DropDownFormArr from '../components/form_components/DropDownFormArr'
import FormStyles from '../components/form_components/FormStyles'
import ButtonForm from '../components/form_components/ButtonForm'
//import ConfirmationModal from '../components/confirmation/confirmation_component'
import { HeaderLeft, HeaderRight, HeaderCenter } from '../components/header/header_component'
import AppStyle from '../styleguide/appStyle'
import CM from '../other/appearance/colors_manager'
import t from '../other/languages/localization'
import { useApp } from '../other/storage/appContext'
import useStorage from '../other/storage/use_storage'

import { reasonList } from './resources/reasonList'
import { ocupationList } from './resources/ocupationList'

const FormSchema = Yup.object().shape({
	Occupation: Yup.string()
		.min(2, t('ONBOARDING_ERR_MSG.MIN_LEN_2'))
		.required(t('ONBOARDING_ERR_MSG.REQ')),
	Reason: Yup.string()
		.min(2, t('ONBOARDING_ERR_MSG.MIN_LEN_2'))
		.required(t('ONBOARDING_ERR_MSG.REQ'))
})

const styles = FormStyles()
const appStyle = AppStyle()

const onBoarding3 = () => {
	const route = useRoute()
	const navigation = useNavigation()
	const { language } = useApp()
	//const { user } = useUser()
	const [boardingData] = useStorage('myFormData')

	const currentLanguage = language.toUpperCase()

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

	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(false)
	const [allValuesState, setAllValues] = React.useState({})

	if (!boardingData) {
		return null
	}

	const previousVal = boardingData

	const formatData = data => {
		return {
			first_name: data.name,
			last_name: data.lastName,
			email_address: data.email,
			username: toLower(data.userName),
			occupation: data.Occupation,
			usage_reason: data.Reason,
			nationality: data.Nationality,
			birth_city: data.City,
			birth_country: data.BornCountry,
			tax_residence: data.Residency,
			birthday: data.birthDate.toString(),
			language_app: ['EN', 'ES'].includes(currentLanguage) ? currentLanguage : null,
			address: {
				line_1: data.Address,
				postal_code: data.PostCode,
				city: data.City,
				region: data.Region,
				country: data.Residency
			},
			id_number: data.Dni
		}
	}

	return (
		<View>
			{/* <ConfirmationModal
				action={{
					func: editCustomer,
					params: { body: allValuesState }
				}}
				trackSuccess={() => {
				}}
				isOpen={isConfirmationModalOpen}
				text={t('USERDATA.SAVED_SUCCESSFULLY')}
				trackError={error => {
					if (error.message === 'USERNAME_EXISTS') {
						console.log('Username exists')
					}
				}}
				onContinue={() => {
					setIsConfirmationModalOpen(false)
				}}
				doNotAllowContinue
				closeModal={() => setIsConfirmationModalOpen(false)}
			/> */}
			<Formik
				initialValues={previousVal}
				onSubmit={values => {
					const allValues = Object.assign(previousVal, values)
					const formattedData = formatData(allValues)
					setAllValues(formattedData)
					setIsConfirmationModalOpen(true)
				}}
				validationSchema={FormSchema}
			>
				{({ handleChange, handleSubmit, isSubmitting, values, setFieldValue }) => {
					return (
						<View style={{ justifyContent: 'space-around', height: '100%' }}>
							<View style={styles.onBoardingForm}>
								<DropDownFormArr
									onChange={value => {
										setFieldValue('Occupation', value, false)
									}}
									cntStyle={styles.cntView}
									returnKeyType="done"
									headingText={t('USERDATA.OCUPATION')}
									name="Occupation"
									list={ocupationList}
									defaultValue={previousVal && previousVal.Occupation ? previousVal.Occupation : ''}
									currentLanguage={language}
								/>
								<DropDownFormArr
									onChange={reasonValue => {
										setFieldValue('Reason', reasonValue, false)
									}}
									cntStyle={styles.cntView}
									returnKeyType="done"
									headingText={t('USERDATA.DESCRIPTION')}
									name="Reason"
									list={reasonList}
									defaultValue={previousVal && previousVal.Reason ? previousVal.Reason : ''}
									currentLanguage={language}
								/>
							</View>

							<ButtonForm {...isSubmitting} onPress={handleSubmit} text="Continue" />
						</View>
					)
				}}
			</Formik>
		</View>
	)
}

export default onBoarding3
