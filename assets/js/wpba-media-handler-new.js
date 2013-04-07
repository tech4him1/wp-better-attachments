// @codekit-prepend wpba-attachment.js
jQuery(function($){
	$(window).load(function(){
		var file_frame,
			saveElem = $('.wpba-saving');

		/**
		* Attach Image
		*/
		// Uploading files
		$('#wpba_attachments_button, #wpba_form_attachments_button').on('click', function( event ){

			event.preventDefault();
			var that = $(this);
			// If the media frame already exists, reopen it.
			if ( file_frame ) {
				file_frame.open();
				return;
			}

			// Create the media frame.
			file_frame = wp.media.frames.file_frame = wp.media({
				title: $( this ).data( 'uploader_title' ),
				button: {
					text: $( this ).data( 'uploader_button_text' )
				},
				multiple: true
			});

			file_frame.on( 'select', function() {
				var attachments = file_frame.state().get('selection').toJSON(),
						ajaxData = {
							attachments: attachments,
							action: 'wpba_add_attachment',
							parentid: $('.wpba').data('postid')
						}
				;
				saveElem.removeClass('hide');
				$.post(ajaxurl, ajaxData, function(data) {
					resp = $.parseJSON(data);
					if ( resp ) {
						$( "#wpba_sortable" ).append( resp );
						updateSortOrder($( "#wpba_sortable" ));
						// Apply unattach click handlers to new elements
						$('.wpba-unattach').on('click', function(e){
							unattachAttachment($(this));
							e.preventDefault();
							return false;
						});
					}

				});

			});

			// Finally, open the modal
			file_frame.open();
		});

	}); // $(window).load()
}(jQuery));