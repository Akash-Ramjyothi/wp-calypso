/* eslint-disable wpcalypso/jsx-classname-namespace */
import { Button } from '@automattic/components';
import { StepContainer } from '@automattic/onboarding';
import { useTranslate } from 'i18n-calypso';
import FormattedHeader from 'calypso/components/formatted-header';
import { recordTracksEvent } from 'calypso/lib/analytics/tracks';
import type { Step } from '../../types';

const FontPairingStep: Step = function FontPairingStep( { navigation } ) {
	const { goBack, submit } = navigation;
	const translate = useTranslate();
	const headerText = translate( 'Pick a font pairing' );
	const subHeaderText = translate(
		'Customize your design with typography that best suits your podcast. You can always fine-tune it later.'
	);

	const submitFontPairing = ( fontPairing: string ) => {
		const providedDependencies = { fontPairing };
		recordTracksEvent( 'calypso_signup_font_pairing_select', providedDependencies );
		//setFontPairing( fontPairing );
		submit?.( providedDependencies, fontPairing );
	};

	return (
		<StepContainer
			stepName={ 'font-pairing-step' }
			goBack={ goBack }
			hideSkip
			isHorizontalLayout={ true }
			formattedHeader={
				<FormattedHeader
					id={ 'font-pairing-header' }
					headerText={ headerText }
					subHeaderText={ subHeaderText }
					align={ 'left' }
				/>
			}
			stepContent={
				<Button type="submit" primary onClick={ submitFontPairing }>
					{ translate( 'Continue' ) }
				</Button>
			}
			recordTracksEvent={ recordTracksEvent }
		/>
	);
};

export default FontPairingStep;
