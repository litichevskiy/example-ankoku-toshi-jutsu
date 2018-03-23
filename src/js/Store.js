const pubsub = new ( require('./utils/PubSub.js') );
const pages = ['/','/product','/items','/journey','/gallery'];

const Store = {

	active_tab: 0,
	is_open_menu: false,
	active_item_menu: -1,
	total_pages: pages.length,
	index_current_page: 0,
	name_current_page: '',

	init() {

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
			pubsub.publish('change');
		});

		pubsub.subscribe('clicked-scroll', ( data ) => {
			let next_page = pages[this.index_current_page];
			data.history.push( next_page );
			pubsub.publish('change');
		});
	}
};

module.exports = Store;