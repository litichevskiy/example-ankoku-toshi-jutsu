const MIN_DESKTOP_WIDTH = 800; //px
const pubsub = new ( require('./utils/PubSub.js') );
const pages = ['/','/product','/items','/journey','/gallery'];
const linksColors = ['/howtobuy','/howtobuy/detail','/credits'];
const pathName = {

	show_fixed_link: [
		'/credits',
		'/imprint',
		'/product_detail',
		'/items_detail',
		'/journey_details',
		'/howtobuy',
		'/howtobuy/detail',
	],
	show_social_link: [
		'/howtobuy',
		'/howtobuy/detail',
		'/credits','/imprint',
		'/product_detail',
		'/items_detail',
		'/journey_details'
	],
	show_button_menu: [
		'/howtobuy',
		'/howtobuy/detail',
		'/credits',
		'/imprint',
		'/product_detail',
		'/items_detail',
		'/journey_details'
	],
	show_button_scroll: [
		'/howtobuy',
		'/howtobuy/detail',
		'/credits',
		'/imprint',
		'/product_detail',
		'/items_detail',
		'/journey_details'
	],
	show_button_sound: [
		'/howtobuy',
		'/howtobuy/detail'
	],
	show_fixed_button: [
		'/howtobuy',
		'/howtobuy/detail',
		'/credits',
		'/imprint',
		'/product_detail',
		'/items_detail',
		'/journey_details'
	],
	show_indicator: [
		'/howtobuy',
		'/howtobuy/detail',
		'/credits',
		'/imprint',
		'/product_detail',
		'/items_detail',
		'/journey_details'
	],
};

const Store = {

	buttons: [
		'show_indicator',
		'show_fixed_button',
		'show_button_sound',
		'show_button_scroll',
		'show_button_menu',
		'show_social_link',
		'show_fixed_link'
	],
	active_tab: 0,
	is_open_menu: false,
	active_item_menu: -1,
	total_pages: pages.length,
	index_current_page: 0,
	name_current_page: '',
	show_indicator: true,
	show_fixed_button: true,
	show_button_sound: true,
	show_button_scroll: true,
	show_button_menu: true,
	show_social_link: true,
	show_fixed_link: true,
	color_fixed_link: 'white',
	is_play_video: true,
	slider_full_screen: false,
	device: ( document.body.clientWidth > MIN_DESKTOP_WIDTH ) ? 'desktop' : 'mobile',

	setStateButtons() {
		let index;
		this.buttons.forEach( item => {
			index = pathName[item].indexOf( this.name_current_page );
			this[item] = ( index > -1 ) ? false : true;
		});

		if( this.total_pages === this.index_current_page ) this.show_button_scroll = false;
	},

	setColorLink() {
		let index = linksColors.indexOf( this.name_current_page );
		this.color_fixed_link = ( index > -1 ) ? 'black' : 'white';
	},

	checkIsChangePage( data ) {
		let index;
		if( this.slider_full_screen || this.is_open_menu ) return false;
			else
				index = pages.indexOf( this.name_current_page );
				if( index < 0 ) return false;
					else
						if( data && data.history.location.pathname === '/' ) return false;

		else return true
	},

	init() {

		window.addEventListener('resize', ( event ) => {
			let window_width = document.body.clientWidth;

			if( window_width < MIN_DESKTOP_WIDTH ) {
				if( this.device != 'mobile' ) {
					this.device = 'mobile';
					pubsub.publish('change');
				}
			}
			else
				if( window_width > MIN_DESKTOP_WIDTH ) {
					if( this.device != 'desktop' ) {
						this.device = 'desktop';
						pubsub.publish('change');
					}
				}
		});

		document.addEventListener('keydown', ( event ) => {
			pubsub.publish('keydown', event );
		});

		pubsub.subscribe('set-active-tab', ( data ) => {
			this.active_tab = data.index;
			pubsub.publish('change');
		});

		pubsub.subscribe('set-state-menu', ( data ) => {
			this.is_open_menu = data.state;
			pubsub.publish('change');
		});

		pubsub.subscribe('change-location', ( data ) => {
			let index = pages.indexOf( data.path );

			this.name_current_page = data.path;

			if( index > -1 ) {
				this.index_current_page = index + 1;
				this.active_item_menu = index;
			}

			this.is_open_menu = false;
			this.setColorLink();
			this.setStateButtons();
			pubsub.publish('change');
		});

		pubsub.subscribe('next-page', ( data ) => {
			let is_change = this.checkIsChangePage();

			if( !is_change ) return;

			let next_page = pages[this.index_current_page];
			data.history.push( next_page );
			pubsub.publish('change');
		});

		pubsub.subscribe('previous-page', ( data ) => {
			let is_change = this.checkIsChangePage( data );

			if( !is_change ) return;
			data.history.goBack();
			pubsub.publish('change');
		});

		pubsub.subscribe('slider-full-screen', ( data ) => {
			this.slider_full_screen = data.fullScreen;

			if( this.slider_full_screen ) {
				this.show_indicator = false;
				this.show_fixed_button = false;
				this.show_button_sound = false;
				this.show_button_scroll = false;
				this.show_button_menu = false;
				this.show_social_link = false;
				this.show_fixed_link = false;
			}

			else{
				this.show_indicator = true;
				this.show_fixed_button = true;
				this.show_button_sound = true;
				this.show_button_scroll = true;
				this.show_button_menu = true;
				this.show_social_link = true;
				this.show_fixed_link = true;
			}

			pubsub.publish('change');
		});
	}
};

module.exports = Store;