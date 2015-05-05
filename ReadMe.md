# [ScrewDefaultButtons](http://screwdefaultbuttons.com)
A simple jQuery plugin that allows you to replace default radio buttons and checkboxes with designs of your own.

**NOTE -** ScrewDefaultButtons version 2 is not backwards compatible. It has been written from the ground up and does some things differently. If you prefer using version 1, I've kept the old site running here: http://screwdefaultbuttons.com/version1

## How it works
Be sure to link to jQuery and then your copy of the ScrewDefaultButtons plugin. Here is an example:

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="js/jquery.screwDefaultButtonsV2.min.js"></script>
	
Next, target the checkbox and or radio buttons you would like to make awesome. Here you must define the replacement sprite image, the height of one button and the width of the button.

	<script>
		$('input:radio').screwDefaultButtons({
			image: 'url("images/radio.jpg")',
			width: 85,
			height: 85
		});
	</script>
	
**Note -** It's suggested that if you are working with radio buttons AND checkboxes, you should use a separate call for each. This allows for a different image for each button type.

### Sprites
Here are some suggestions for setting up your image sprites
- They need to be laid out vertically
- Button states must be the same height and width
- Currently, 4 states are supported and must be set up in this order (top to bottom):
	- Unchecked
	- Checked
	- Disabled(unchecked)
	- Disabled(checked)
- The disabled states are optional, but be sure to add them if your buttons will ever be disabled

### CSS
ScrewDefaultButtons inherits any classes you may have applied to your radio buttons or checkboxes. It also adds the classes 'styledRadio' or 'styledCheckbox', depending on the type of input.

	.styledRadio {
		/* Your positioning styles here, etc.*/
	}
	
	.styledCheckbox {
		/* Your positioning styles here, etc.*/
	}

I did not apply any type of positioning, so depending on your layout you may need to float to bring them next to your labels.


### Data Attribute
You may use the data attribute 'data-sdb-image' to define an image on a specific input. This will override the image you may have defined in the original call. For example:

	<input type="radio" data-sdb-image="url('images/myRadio.jpg')" />

This is the easiest way to apply different images to different buttons.

### Helper Commands
ScrewDefaultButtons comes with some basic commands to give you better control of the custom radio buttons and checkboxes.

#### 'check'
Checks the targeted button or buttons. Can also be used to create a sort of "Select All" button by targeting all checkboxes.
	
	$(input:checkbox).screwDefaultButtons('check');
	
**Note -** Do not apply to more than 1 radio button in the same group. I have not tested it, but I'm pretty sure it will cause your browser to explode.

#### 'uncheck'
Unchecks the targeted button or buttons.

	$(input:checkbox).screwDefaultButtons('uncheck');
	
#### 'toggle'
Toggles between checking and unchecking a button or buttons

	$(input:checkbox).screwDefaultButtons('toggle');	
	
#### 'disable'
Disables the targeted button or buttons.

	$(input:checkbox).screwDefaultButtons('disable');
	
#### 'enable'
Enables the targeted button or buttons.

	$(input:checkbox).screwDefaultButtons('enable');
