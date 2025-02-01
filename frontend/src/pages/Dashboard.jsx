import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';


const Dashboard = () => {
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const {loading:profileLoading}=useSelector((state)=>state.profile);
    if(profileLoading|| authLoading){
        return (
            <div className="mt-10">
            loading...
            </div>
        )
    }

  return (
    <div className="flex min-h-screen pt-4 bg-richblack-900">
       
        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-richblack-900">
            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard;
