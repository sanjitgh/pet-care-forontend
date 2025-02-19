import { Avatar, Card, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../../hook/useAuth";
import imgTitle from "../../../../src/assest/profile.webp";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";

const UserProfile = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Helmet>
        <title>Profile - PetCare</title>
      </Helmet>
      <section className="pt-5 flex justify-center">
        <Card shadow={false} className="rounded w-full pb-16 dark:bg-[#0D1323]">
          <div
            className="relative bg-center bg-cover min-h-[500px] flex items-end"
            style={{ backgroundImage: `url(${imgTitle})` }}
          >
            {/* Profile Image & Info */}
            <div className="absolute bottom-0 left-2 md:left-5 transform translate-y-1/2 flex items-center gap-4">
              <Avatar
                src={user?.photoURL}
                alt="avatar"
                sx={{ width: 80, height: 80, border: "4px solid #5F56C6" }}
              />
              <div className="bg-white border-b-2 border-[#5F56C6] p-2 rounded shadow dark:bg-[#030712]">
                <Typography variant="h6" className="dark:text-white">
                  {user?.displayName}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {user?.email}
                </Typography>
              </div>
            </div>
            {/* join date */}
            <div className="absolute top-4 right-4">
              <p className="text-white bg-[#6C5AC6] dark:bg-[#0D1323] p-2 rounded">
                <span>Joining Date : </span>
                {format(new Date(user.metadata.creationTime), "Pp")}{" "}
              </p>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default UserProfile;
