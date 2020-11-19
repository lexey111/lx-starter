import React from 'react';
import {Link} from 'react-router-dom';
import {LipsumPara} from '../../../../engine/ui-components/examples-related/lipsum';

export const BasicLayout = (props: { sideMenu?: boolean }): JSX.Element => {
	return <div className={'application-layout-example' + (props.sideMenu ? ' has-side-menu' : '')}>
		<div className={'apl-container'}>
			<div className={'apl-top-panel'}>
				<Link to={'/layout/top-panel'}><i>Top panel</i></Link> [optional]
			</div>
			{!props.sideMenu && <div className={'apl-main-menu'}>
				<Link to={'/layout/main-menu'}><i>Main menu</i></Link> [sticky]
			</div>
			}
			{props.sideMenu && <div className={'apl-side-menu'}>
				<Link to={'/layout/main-menu'}><i>Main menu</i></Link>
			</div>
			}
			<div className={'apl-breadcrumbs'}>
				<Link to={'/layout/breadcrumbs'}><i>Breadcrumbs</i></Link> or <Link to={'/layout/page-submenu'}><i>Page submenu</i></Link> [optional, sticky]
			</div>
			<div className={'apl-page'}>
				<div className={'apl-page-content'}>
					<Link to={'/layout/page'}><i>Page content</i></Link>
					<LipsumPara/>
				</div>
				<div className={'apl-page-nav'}>
					<Link to={'/layout/page-navigation'}><i>in-page navigation</i></Link>
					<p>
						[optional]
					</p>
				</div>
			</div>
			<div className={'apl-footer'}>
				<Link to={'/layout/footer'}><i>Footer</i></Link>
			</div>

			<div className={'apl-dimension'}>
				<span className={'apld-left-arrow'}></span>
				<b>page content area</b>
				<span className={'apld-right-arrow'}></span>
			</div>
		</div>

		<div className={'apl-dimension'}>
			<span className={'apld-left-arrow'}></span>
			<b>viewport</b>
			<span className={'apld-right-arrow'}></span>
		</div>
	</div>;
};
