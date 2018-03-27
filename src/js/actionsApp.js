const pubsub = new ( require('./utils/PubSub.js') );

const actionsApp = {

    setActiveTab( key ) {
        pubsub.publish( 'set-active-tab', { index: key });
    },

    setStateMenu( key ) {
        pubsub.publish( 'set-state-menu', { state: key });
    },

    changeLocation( path ) {
    	pubsub.publish( 'change-location', { path: path });
    },

    clickedScroll( data ) {
    	pubsub.publish( 'clicked-scroll', data );
    },

    sliderFullScreen( data ) {
        pubsub.publish( 'slider-full-screen', data );
    },
};

module.exports = actionsApp;