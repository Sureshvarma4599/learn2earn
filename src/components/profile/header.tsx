import styled from "styled-components";
import { colors } from "../../common/colors";
import { ReactNode } from "react";
const Header = styled.div`
  width: 100%;
  padding: 8px 16px;
  height: 120px;
  border: 1px solid ${colors.border};
  border-radius: 12px;
  display: flex;
  flex-direction: row;
`;

const ProfilePic = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SideBarProps {
  setOpenProfile: ReactNode;
  data: ReactNode;
}

export default function ProfileHeader({ setOpenProfile, data }: any) {
  const user = {
    name: "Rebecca Nicholas",
    role: "Product Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  const stats = [
    { label: "Vacation days left", value: 12 },
    { label: "Sick days left", value: 4 },
    { label: "Personal days left", value: 2 },
  ];
  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className="mx-auto h-20 w-20 rounded-full border-2 border-indigo-600"
                  src={user.imageUrl}
                  alt=""
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  Welcome back,
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {data?.firstName + " " + data?.lastName}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {data?.designation}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <a
                onClick={setOpenProfile}
                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Edit profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
