var form_page = {
	type: 'survey-text',
	data: {},
	questions: [
		{
			prompt: "Please enter your Email (we'd use that as your username.)",
			columns: 50,
			required: true,
			name: 'email'
		},
		{
			prompt: 'Please enter your phone number so we could inform you of the next experiment',
			columns: 50,
			required: true,
			name: 'phoneNumber'
		},
	],
	preamble: "<h1>Hello</h1>",
	on_finish :function(data) {
		jsPsych.data.addProperties({
			username : data.response.email,
			phoneNumber: data.response.phoneNumber
		})
	}
};