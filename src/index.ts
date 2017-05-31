class Scaler {
	static fromBlob(blob: Blob) {
		return new Scaler(blob);
	}

	static fromArrayBuffer(arrayBuffer: ArrayBuffer, type: string) {
		return new Scaler(new Blob([arrayBuffer], { type }));
	}

	static fromBuffer(buffer: Buffer, type: string) {
		return Scaler.fromArrayBuffer(buffer.buffer, type);
	}

	blob: Blob;
	constructor(blob: Blob) {
		this.blob = blob;
	}

	async scale(sx: number, sy?:number, canvas?: HTMLCanvasElement) {
		const image: ImageBitmap = await createImageBitmap(this.blob);
		const myCanvas: HTMLCanvasElement = canvas || document.createElement('canvas');
		const context = myCanvas.getContext('2d');
		const width = image.width * sx;
		const height = image.height * (sy || sx);
		myCanvas.width = width;
		myCanvas.height = height;
		context.drawImage(image, 0, 0, width, height);
		return myCanvas;
	}

	async toArrayBuffer(sx: number, sy?: number) {
		const imgURL = await this.toDataUrl(sx, sy);
		const data = imgURL.replace(/^data:image\/\w+;base64,/, '');
		return new Buffer(data, 'base64');
	}

	async toDataUrl(sx: number, sy?: number, type?: string) {
		const canvas = await this.scale(sx, sy);
		return canvas.toDataURL(type);
	}
}

export default Scaler;
