import PropTypes from 'prop-types'

export default function Footer({captions, username}) {
 return (
  <div className= 'p-4 pt-2 pb-0'>
   <span className='mr-2 font-bold'>{username}</span>
   <span className='text-md'>{captions}</span>
  </div>
 )
}
Footer.propTypes ={
 caption:PropTypes.string.isRequired,
 username:PropTypes.string.isRequired
}
