// notifier
exports.createNotifierCallback = () => (severity, errors) => {
	if (severity !== 'error') return;
	const error = errors[0];
	const filename = error.file && error.file.split('!').pop();
	notifier.notify({
		title: 'webpc',
		message: severity + ': ' + error.name,
		subtitle: filename || '',
		icon: path.join(__dirname, 'logo.logo'),
	});
};
