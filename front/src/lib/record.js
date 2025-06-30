import RecordRTC, { StereoAudioRecorder } from 'recordrtc';

export default class AudioRecordingModule {
	constructor() {
		this.stream = null;
		this.recorder = null;
	}

	async setAudioStream() {
		try {
			this.getStream();
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	async getStream() {
		if (!this.stream) {
			this.stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
		}
		return this.stream;
	}

	async recStart() {
		if (this.recorder.state === 'recording') {
			this.recorder.stopRecording();
		}

		if (this.recorder) {
			this.recorder.destroy();
		}

		const stream = await this.getStream();
		console.log(`stream: ${stream}`);

		this.recorder = new RecordRTC(stream.clone(), {
			type: 'audio',
			mimeType: 'audio/wav',
			disableLogs: true,
			recorderType: StereoAudioRecorder,
			numberOfAudioChannels: 2,
		});
		this.recorder.startRecording();
	}

	async recStop() {
		console.log(`this.recorder: ${this.recorder}`);

		// 録音が進行中でなければ何もしない
		if (!this.recorder || this.recorder.state !== 'inactive') {
			return;
		}

		console.log('録音停止');

		// 録音を停止
		await this.recorder.stopRecording();
		const blob = await this.recorder.getBlob();
		console.log('🍓 ~ AudioRecordingModule ~ recStop ~ blob:', blob);
		// ストリームの各トラックを停止
		if (this.stream) {
			this.stream.getTracks().forEach((track) => track.stop());
			this.stream = undefined;
		}

		// RecordRTC インスタンスを破棄
		this.recorder.destroy();
		this.recorder = undefined;

		return blob;
	}
}
