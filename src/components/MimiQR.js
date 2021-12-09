import React, {useState, useEffect} from "react";
import QRCode from "qrcode";
import {generateQRString} from "../utils/functions";
export default function MimiQR() {
	const [qrSrc, setQRSrc] = useState(undefined);
	useEffect(() => {
		generateQRString().then(qrString => {
			QRCode.toDataURL(qrString)
				.then(url => {
					setQRSrc(url);
				})
				.catch(err => {
					console.log(err);
				});
		});
	}, []);
	return <div>{qrSrc && <img src={qrSrc} alt='qr code'></img>}</div>;
}
