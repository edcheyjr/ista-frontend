import {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom' ;
import Skeleton from 'react-loading-skeleton'


const User = ({username,fullName}) => !username ||!fullName ?(
        <Skeleton count={1} height={61} />
    )
   : (
        <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 items-center">
          <div className="flex items-center justify-between col col-span-1">
              <img src={`/images/avatars/shadowhunter.jpeg`} alt="" className="flex rounded-full w-16"/>
          </div>
          <div className="col-span-3">
              <p className="font-bold text-sm">{username}</p>
              <p className="text-sm">
                  {fullName }
              </p>
          </div>
        </Link>
       
    );


export default User;

User.propTypes ={
    username: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
};
User.whyDidYouRender = true