import { useSiteSlugParam } from '../hooks/use-site-slug-param';
import { recordSubmitStep } from './internals/analytics/record-submit-step';
import type { StepPath } from './internals/steps-repository';
import type { Flow, ProvidedDependencies } from './internals/types';

function redirect( to: string ) {
	window.location.href = to;
}

export const anchorFmFlow: Flow = {
	name: 'anchor-fm',

	useSteps() {
		return [
			'podcastTitle', //This step doesn't exist yet
			'designSetup', //This is the design picker with only three "podcast" themes loaded, no sidebar
			'fontPairing', //This step doesn't exist yet
		] as StepPath[];
	},

	useStepNavigation( currentStep, navigate ) {
		const siteSlug = useSiteSlugParam();

		function submit( providedDependencies: ProvidedDependencies = {} ) {
			recordSubmitStep( providedDependencies, 'anchor-fm', currentStep );

			switch ( currentStep ) {
				case 'options':
					return navigate( 'designSetup' );
				case 'designSetup':
					return navigate( 'fontPairing' );
				case 'fontPairing':
					return redirect( `/page/home/${ siteSlug }` );
			}
		}

		const goBack = () => {
			switch ( currentStep ) {
				case 'designSetup':
					return navigate( 'options' );
				case 'fontPairing':
					return navigate( 'designSetup' );
				default:
					return navigate( 'options' );
			}
		};

		const goNext = () => {
			switch ( currentStep ) {
				case 'options':
					return navigate( 'designSetup' );
				case 'designSetup':
					return navigate( 'fontPairing' );
				case 'fontPairing':
					return redirect( `/page/home/${ siteSlug }` );

				default:
					return navigate( 'options' );
			}
		};

		const goToStep = ( step: StepPath ) => {
			navigate( step );
		};

		return { goNext, goBack, goToStep, submit };
	},
};
