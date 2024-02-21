import React from 'react'
import EditProfile from "../components/core/Dashboard/Settings/EditProfile"
import DeleteAccount from '../components/core/Dashboard/Settings/DeleteAccount'
import ChangeProfilePicture from '../components/core/Dashboard/Settings/ChangeProfilePicture'
import UpdatePassword from '../components/core/Dashboard/Settings/UpdatePassword'

const Setting = () => {

  return (
    <div className='text-richblack-5 w-[85%] mx-auto'>
        <h1 className='text-3xl pb-6 text-left'>
            Edit Profile
        </h1>
        {/* section 1 */}
        <ChangeProfilePicture/>

        {/* section 2 */}
        <EditProfile/>

        {/* section 3 */}
        <UpdatePassword/>

        {/* section 4 */}
        <DeleteAccount/>
        
    </div>
  )
}

export default Setting