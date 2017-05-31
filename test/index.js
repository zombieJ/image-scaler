const PATH = require('path');
const FS = require('fs');
const Scaler = require('../js/index').default;

const $canvas = document.getElementById('canvas');
const $imgBuffer = document.getElementById('imgBuffer');
const $imgURL = document.getElementById('imgURL');

FS.open(PATH.resolve(__dirname, 'res/lenna.jpg'), 'r', (err, fd) => {
	if (err) throw err;

	const buffer = new Buffer(200000);
	FS.read(fd, buffer, 0, buffer.length, 0, function(err, num) {
		if (err) throw err;

		const imageBuffer = buffer.slice(0, num);
		const scaler = Scaler.fromBuffer(imageBuffer);
		scaler.scale(0.5, 0.5, $canvas);
		scaler.toArrayBuffer(0.4).then(arrayBuffer => {
			const buffer = new Buffer(new Uint8Array(arrayBuffer));
			const base64 = 'data:image/png;base64,' + buffer.toString('base64');
			$imgBuffer.src = base64;
		});
		scaler.toDataUrl(0.3, 0.3, 'image/jpeg').then((url) => {
			$imgURL.src = url;
		});
	});
});
