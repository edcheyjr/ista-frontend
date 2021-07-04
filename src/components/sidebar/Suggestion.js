import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'

const Suggestion = ({ userId }) => {
	const [profiles, setProfiles] = useState(null)

	// go ahead and get the suggested profile
	// hint: use firebase services (call using userId)
	// call the async function **** within useEffect
	// go ahead and render (wait on the profiles as in 'skeleton');

	useEffect(() => {
		const profileResult = getSuggestedProfiles(userId)
		setProfiles(profileResult)
	}, [userId])

	return !profiles ? (
		<Skeleton count='1' height='150'></Skeleton>
	) : profiles.length > 0 ? (
		<div className='rounded flex flex-col'>
			<div className='text-sm flex item-center align-items justify-between mb-2'>
				<p className='font-bold text-gray-base '>Suggestion for you</p>
			</div>
		</div>
	) : null
}

Suggestion.propType = {
	userId: PropTypes.string,
}

export default Suggestion
