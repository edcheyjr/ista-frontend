import useUser from '../../hooks/use-user'
import User from './User'
import Suggestion from './Suggestion'

export default function Sidebar() {
	const {
		user: { fullName, username, userId },
	} = useUser()
	// console.log('fullname, username, userId', fullName,username,userId);

	return (
		<div className='p-4'>
			<User username={username} fullName={fullName} />
			<Suggestion userId={userId} />
		</div>
	)
}
