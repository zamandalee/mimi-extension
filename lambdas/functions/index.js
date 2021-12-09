const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const datesAreOnSameDay = (first, second) => first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
exports.trackAttempts = functions.firestore.document("/users/{userId}").onUpdate((change, context) => {
	// Grab the current value of what was written to Firestore.
	const newUserDocument = change.after.data();
	const oldUserDocument = change.before.data();
    const docRef = change.after.ref
	const userId = context.params.userId;
	if (newUserDocument.numAccesses === oldUserDocument.numAccesses) {
		// this shouldn't really happen...
	} else if (newUserDocument.numAccesses > 1000) {
		// delete everything!
		docRef.delete().then(() => {
			console.log("Document successfully deleted.");
		});
	} else if (!newUserDocument.accessPeriodStart) {
		docRef.set({accessPeriodStart: new Date()}, {merge: true}).then(() => {
			"Access period successfully initialized.";
		});
	} else if (!datesAreOnSameDay(newUserDocument.accessPeriodStart, new Date())) {
		docRef.set({accessPeriodStart: new Date(), numAccesses: 0}, {merge: true}).then(() => {
			"Access period successfully reset.";
		});
	} else {
		// within access limits
	}
});
