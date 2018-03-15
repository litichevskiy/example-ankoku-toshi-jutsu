function wheelHandler( event ) {

	let delta = event.deltaY || event.detail || event.wheelDelta;

	container[0].removeEventListener("wheel", func );

	if( event.deltaY > 0 ) {
		if( index >= childs ) {
			container[0].addEventListener("wheel", func, false );
			return
		}

		$(container[0].children[index]).animate({top: '100%', opacity: '0'}, 600, 'swing', function() {
			container[0].addEventListener("wheel", func, false );
		});
		index += 1;
	}
	else {
		if( index < 1 ) {
			container[0].addEventListener("wheel", func );
			return
		}
		index -= 1;
		$(container[0].children[index]).animate({top: '0%', opacity: '1'}, 600, 'swing', function() {
			container[0].addEventListener("wheel", func );
		})
	}
}

module.exports = wheelHandler;