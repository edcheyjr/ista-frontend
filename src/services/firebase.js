import { firebase, FieldValue } from '../lib/firebase'

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get()

	return result.docs.length > 0
}
// get the user from the firestore where the userId (passed from the auth)

export async function getUserByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('userId', '==', userId)
		.get()
	const user = result.docs.map((item) => {
		return {
			docId: item.id,
			...item.data(),
		}
	})
	return user
}

export async function getSuggestedProfiles(userId, following) {
	let query = await firebase.firestore().collection('users')

	if (following > 0) {
		query = query.where('userId', 'not-in', [...following, userId])
	} else {
		query = query.where('userId', '!=', userId)
	}

	const result = await query.limit(10).get()

	const profiles = result.docs.map((user) => ({
		...user.data(),
		docId: user.id,
	}))
	return profiles
}

// this adds the userId to the doc of the followed user
export async function updateFollowedProfileId(
	profileDocId,
	userId,
	isFollowed
) {
	const result = await firebase
		.firestore()
		.collection('users')
		.doc(profileDocId)
		.update({
			follower: isFollowed
				? FieldValue.arrayRemove(userId)
				: FieldValue.arrayUnion(userId),
		})
		.then(() => {
			console.log('followed successfully')
		})
		.catch(() => console.log('Doc was not updated successfully not followed'))

	return result
}

export async function updateLoggedInUseFollowingId(
	profileId, //the profileId of the profile to follow
	loggedInUserDocId, //the DocId of the currently logged in user
	isFollowingProfile //boolean to check if the user is currently being followed
) {
	const result = await firebase
		.firestore()
		.collection('users')
		.doc(loggedInUserDocId)
		.update({
			following: isFollowingProfile
				? FieldValue.arrayRemove(profileId)
				: FieldValue.arrayUnion(profileId),
		})
		.then(() => {
			console.log('following successfully')
		})
		.catch(() => console.log('Doc was not updated successfully, not following'))

	return result
}
export async function getPhotos(userId, following) {
	const result = await firebase
		.firestore()
		.collection('photos')
		.where('userId', 'in', following)
		.get()

	const userFollowingPhotos = result.docs.map((photo) => {
		return {
			...photo.data(),
			docId: photo.id,
		}
	});

	const photosWithUserDetails = await Promise.all(
		userFollowingPhotos.map(async (photo) => {
			let userLikedPhoto =false;
			if(photo.likes.includes(userId)){
				userLikedPhoto =true;
			}
			// photo userId = 2
			const user =await getUserByUserId(photo.userId);
			const {username} = user[0];
			return {username, ...photo, userLikedPhoto}
		})
	)
	return photosWithUserDetails;
}


