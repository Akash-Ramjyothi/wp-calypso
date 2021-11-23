import { isEnabled } from '@automattic/calypso-config';
import { translate } from 'i18n-calypso';
import page from 'page';
import { decodeURIComponentIfValid } from 'calypso/lib/url';
import SectionMigrate from 'calypso/my-sites/migrate/section-migrate';
import { getSiteId } from 'calypso/state/sites/selectors';

export function ensureFeatureFlag( context, next ) {
	if ( isEnabled( 'tools/migrate' ) ) {
		return next();
	}
	page.redirect( '/' );
}

export function migrateSite( context, next ) {
	if ( isEnabled( 'tools/migrate' ) ) {
		const sourceSiteId =
			context.params.sourceSiteId &&
			getSiteId( context.store.getState(), context.params.sourceSiteId );
		const fromSite =
			( context.query &&
				context.query[ 'from-site' ] &&
				decodeURIComponentIfValid( context.query[ 'from-site' ] ) ) ||
			'';

		context.primary = (
			<SectionMigrate
				sourceSiteId={ sourceSiteId }
				step={ context.migrationStep }
				url={ fromSite }
			/>
		);
		return next();
	}

	page.redirect( '/' );
}

export function setStep( migrationStep ) {
	return ( context, next ) => {
		context.migrationStep = migrationStep;
		next();
	};
}

export function setSiteSelectionHeader( context, next ) {
	context.getSiteSelectionHeaderText = () => translate( 'Select a site to import into' );
	next();
}
