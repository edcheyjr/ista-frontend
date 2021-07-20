import PropType from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	updateFollowedProfileId,
	updateLoggedInUseFollowingId,
} from '../../services/firebase'

const SuggestedProfile = ({profileDocId,username,profileId,userId,loggedInUserDocId,
}) => {
	const [followed, setFollowed] = useState(false)

	async function handleFollowUser() {
	setFollowed(true)
	await updateFollowedProfileId(profileDocId, userId,false)
	 await updateLoggedInUseFollowingId(
			profileId,
			loggedInUserDocId,
			false
		)
	}
	return !followed?(
		<div className='flex flex-row item-center align-items justify-between'>
			<div className='flex item-center justify-between'>
				<img
					className='rounded-full w-8 h-8 flex mr-3'
					src={`/images/avatars/${username}.jpg`}
					alt={`${username}`}
				/>
				<Link to={`/p/${username}`}>
					<p className='font-bold text-sm mt-2'>{username}</p>
				</Link>
			</div>
			<button
				className='text-xs font-bold text-blue-medium hover:text-blue-400 mt-2'
				type='button'
				onClick={handleFollowUser}>
				Follow
			</button>
		</div>
	):null
}

export default SuggestedProfile

SuggestedProfile.propType = {
	userDocId: PropType.string.isRequired,
	username: PropType.string.isRequired,
	profileId: PropType.string.isRequired,
	userId: PropType.string.isRequired,
	loggedInUserDocId: PropType.string.isRequired
}
