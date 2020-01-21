const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// Notification Part
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
// Notification Part End

// User Auth Part
// Add admin role to the user using custom claims. Add a custom claim 'admin' to true
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
				message: `Success! ${data.email} now has become an admin.`
			};
		})
		.catch(err => {
			return { message: err.message };
		});
});

// Edit the user
exports.editUser = functions.https.onCall((data, context) => {
	// check if the request is made by an admin
	if (context.auth.token.admin !== true) {
		return { message: 'Only Admins can update other users.' };
	}

	// Edit User
	return admin
		.auth()
		.updateUser(data.id, {
			displayName: `${data.firstName} ${data.lastName}`
		})
		.then(() => {
			return { message: 'The user has been updated' };
		})
		.catch(err => {
			return { message: `Error occurred updating user: ${err.message}` };
		});
});
// Edit the user End

// Delete user
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
			return { message: 'The user has been deleted' };
		})
		.catch(err => {
			return { message: `Error occurred deleting user: ${err.message}` };
		});
});
// User Auth End

// Testing httpRequest Part of firebase functions
exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!');
});
