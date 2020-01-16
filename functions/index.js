const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// Create notification collection
const createNotification = notification => {
	return admin
		.firestore()
		.collection('notifications')
		.add(notification)
		.then(doc => {
			console.log('notification added', doc);
		});
};

// onCreate means that it's automatically called when the document is created.
exports.projectCreated = functions.firestore
	.document('projects/{projectId}')
	.onCreate(doc => {
		const project = doc.data();
		const notification = {
			content: 'Added a new Project',
			user: `${project.authorFirstName} ${project.authorLastName}`,
			time: admin.firestore.FieldValue.serverTimestamp()
		};
		return createNotification(notification);
	});

exports.projectDeleted = functions.firestore
	.document('projects/{projectId}')
	.onDelete(doc => {
		const project = doc.data();
		const notification = {
			content: 'Deleted the project',
			user: `${project.authorFirstName} ${project.authorLastName}`,
			time: admin.firestore.FieldValue.serverTimestamp()
		};
		return createNotification(notification);
	});

exports.userJoined = functions.auth.user().onCreate(user => {
	return admin
		.firestore()
		.collection('users')
		.doc(user.uid)
		.get()
		.then(doc => {
			const newUser = doc.data();
			const notification = {
				content: 'Joined the website',
				user: `${newUser.firstName} ${newUser.lastName}`,
				time: admin.firestore.FieldValue.serverTimestamp()
			};
			return createNotification(notification);
		});
});

exports.addAdminRole = functions.https.onCall((data, context) => {
	// check if the request is made by an admin
	if (context.auth.token.admin !== true) {
		return { message: 'Only Admins can add other admins.' };
	}

	// get user and add custom claims (admin)
	return admin
		.auth()
		.getUserByEmail(data.email)
		.then(user => {
			return admin.auth().setCustomUserClaims(user.uid, {
				admin: true
			});
		})
		.then(() => {
			return {
				message: `Success! ${data.email} has become an admin.`
			};
		})
		.catch(err => {
			return { message: err.message };
		});
});

exports.deleteUser = functions.https.onCall((data, context) => {
	// check if the request is made by an admin
	if (context.auth.token.admin !== true) {
		return { message: 'Only Admins can delete other users.' };
	}

	// Delete User
	return admin
		.auth()
		.deleteUser(data.userId)
		.then(() => {
			return { message: 'The user is deleted' };
		})
		.catch(err => {
			return { message: `Error occurred deleting user: ${err.message}` };
		});
});

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!');
});
