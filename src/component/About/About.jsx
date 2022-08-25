import React from "react";
import avatar from '../../avatar.png'

export default function About({ userWelcom }) {
  return (
    <>
      <div className="container vh-100">
        <div className="row">
          <div className="col-md-4">
            <img src={avatar} className='w-100' alt="" />
          </div>
          <div className="col-md-8 mt-5">
            <h1 className="h2 pb-3"> First NAME : <span className="text-muted">{userWelcom?.first_name}</span> </h1>
            <h1 className="h2 pb-3"> LAST NAME : <span className="text-muted">{userWelcom?.last_name}</span> </h1>
            <h1 className="h2 pb-3"> AGE : <span className="text-muted"> {userWelcom?.age}</span> </h1>
            <h1 className="h2 pb-3"> E-MAIL : <span className="text-muted">{userWelcom?.email}</span> </h1>
          </div>
        </div>
      </div>
    </>
  );
}
