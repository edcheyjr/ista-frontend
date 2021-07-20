import { useRef } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Image from './Image'
import Actions from './Actions'
import Footer from './Footer'
import Comment from './Comment'

export default function Post({ content }) {

	const commentInput = useRef(null);
	const handleFocus = () => commentInput.current.focus()

	return (
		// header, images, actions(like & comment icons), footer, comments all are components
		<div className='rounded col-span-4 border bg-white border-gray-primary mb-8 lg:w-3/4 xl:w-full'>
			<Header username={content.username} />
			<Image src={content.imageSrc} caption={content.caption} />
			<Actions
				docId={content.docId}
				totalLikes={content.likes.length}
				LikedPhoto={content.userLikedPhoto}
				handleFocus={handleFocus}
			/>
			<Footer captions={content.caption} username={content.username} />
			<Comment
				docId={content.docId}
				comments={content.comments}
				posted={content.dateCreated}
				commentInput={commentInput}
			/>
		</div>
	)
}

Post.propType = {
	content: PropTypes.shape({
		username: PropTypes.string.isRequired,
		imageSrc: PropTypes.string.isRequired,
		caption: PropTypes.string.isRequired,
		docId: PropTypes.string.isRequired,
		userLikedPhoto: PropTypes.bool.isRequired,
		likes: PropTypes.string.isRequired,
		comments: PropTypes.array.isRequired,
		dateCreated: PropTypes.number.isRequired,
	}),
}

// pagination for every 5 photos