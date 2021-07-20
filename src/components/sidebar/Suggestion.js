import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './SuggestedProfile'

const Suggestion = ({ userId, following, loggedInUserDocId }) => {
	const [profiles, setProfiles] = useState(null)

	// go ahead and get the suggested profile
	// hint: use firebase services (call using userId)
	// call the async function **** within useEffect
	// go ahead and render (wait on the profiles as in 'skeleton');

	useEffect(() => {
		async function suggestedProfiles() {
			const profileResult = await getSuggestedProfiles(userId, following)
			setProfiles(profileResult)
		}

		if (userId && following) {
			suggestedProfiles()
		}
	}, [userId, following])

	return !profiles ? (
		<Skeleton count='1' height='150px'></Skeleton>
	) : profiles.length > 0 ? (
		<div className='rounded flex flex-col'>
			<div className='text-sm flex item-center align-items justify-between mb-2 mt-4'>
				<p className='font-bold text-gray-base'>Suggestion for you</p>
			</div>
			<div className='mt-4 grid gap-5'>
				{profiles.map((profile) => {
					return (
						<SuggestedProfile
							key={profile.docId}
							profileDocId={profile.docId}
							username={profile.username}
							profileId={profile.userId}
							userId={userId}
							loggedInUserDocId={loggedInUserDocId}
						/>
					)
				})}
			</div>
		</div>
	) : null
}

Suggestion.propType = {
	userId: PropTypes.string,
	following: PropTypes.string,
	loggedInUserDocId:PropTypes.string
}

export default Suggestion
