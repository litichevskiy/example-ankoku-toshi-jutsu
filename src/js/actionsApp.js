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

    historyStepForward( data ) {
        pubsub.publish( 'next-page', data );
    },

    historyStepBack( data ) {
    	pubsub.publish( 'previous-page', data );
    },

    sliderFullScreen( data ) {
        pubsub.publish( 'slider-full-screen', data );
    },

    replaceStateSound( data ) {
        pubsub.publish( 'replace-state-sound', data );
    },
};

module.exports = actionsApp;