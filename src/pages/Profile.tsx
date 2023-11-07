import SideBar from "../layouts/SideBar";
import ProfileHeader from "../components/profile/header";
import styled from "styled-components";
import Container from "../components/profile/container";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import VerticalStepper from "../components/shared/verticalStepper";
import ProfileForm from "../components/profile/profileForm";
import Modal from "../components/shared/modal";
import { useEffect, useState } from "react";
import { getAppUserId } from "../services/cookie";
import { getProfile } from "../services/user-service";
import CoursesList from "../components/profile/courseList";
import EducationList from "../components/profile/educationList";

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 8px;
  padding: 8px 0px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
const ContainerHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;

export default function Profile() {
  const [openAbout, setOpenAbout] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openCertification, setOpenCertification] = useState(false);

  const [userProfile, setUserProfile] = useState<any>(null);

  const [skills, setSkills] = useState([
    {
      skillName: "React",
      skillLevel: 7,
    },
    {
      skillName: "Angular Framework",
      skillLevel: 4.5,
    },
    {
      skillName: "NodeJS",
      skillLevel: 9,
    },
    {
      skillName: "Mongo Db",
      skillLevel: 5,
    },
  ]);
  const openProfileDialog = () => {
    setOpenProfile(true);
    setOpenAbout(false);
  };

  const closeAll = () => {
    setOpenProfile(false);
    setOpenAbout(false);
    setOpenLocation(false);
    setOpenEducation(false);
    setOpenCertification(false);
    getUserProfile();
  };

  const getUserProfile = async () => {
    //   api call to get user profile data
    const appId: any = await getAppUserId();
    const profile = await getProfile(appId);
    if (profile) {
      console.log("profile", profile);
      setUserProfile(profile?.userProfile);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      {openProfile ? (
        <Modal>
          <ProfileForm
            type={"profile"}
            data={userProfile}
            closePopup={closeAll}
          />
        </Modal>
      ) : null}
      {openAbout ? (
        <Modal>
          <ProfileForm
            type={"location"}
            data={userProfile}
            closePopup={closeAll}
          />
        </Modal>
      ) : null}
      {openLocation ? (
        <Modal>
          <ProfileForm
            type={"experience"}
            data={userProfile}
            closePopup={closeAll}
          />
        </Modal>
      ) : null}
      {openCertification ? (
        <Modal>
          <ProfileForm
            type={"certification"}
            data={userProfile}
            closePopup={closeAll}
          />
        </Modal>
      ) : null}
      {openEducation ? (
        <Modal>
          <ProfileForm
            type={"education"}
            data={userProfile}
            closePopup={closeAll}
          />
        </Modal>
      ) : null}
      <SideBar>
        <ProfileHeader setOpenProfile={openProfileDialog} data={userProfile} />
        <Cards>
          <Container>
            <ContainerHead>
              <p className="text-sm text-start font-bold text-gray-700">
                {"About"}
              </p>
              <EditOutlinedIcon
                fontSize={"medium"}
                className="cursor-pointer text-gray-600"
                onClick={() => setOpenAbout(true)}
              />
            </ContainerHead>
            <p className="pl-2.5 mb-4 text-md text-start font-medium text-gray-600">
              {userProfile?.bio}
              <br />
              <br />
              <p className="text-sm text-gray-500">Contact Info:</p>
              {userProfile?.streetAddress || ""}
              <br />
              {userProfile?.city || ""} , {userProfile?.state || ""},
              {userProfile?.pincode || ""}
              <br />
              {userProfile?.country || ""}
            </p>
            <p className="pl-2.5 my-2 text-start font-medium text-gray-600">
              <PhoneIphoneOutlinedIcon className="mr-1 " />
              +91-7013197666
            </p>
            <p className=" pl-2.5 text-start font-medium text-gray-600">
              <EmailOutlinedIcon className="mr-1 " />
              sureshvarma.n666@gmail.com
            </p>
          </Container>
          <Container>
            <ContainerHead>
              <p className="text-sm text-start font-bold text-gray-700">
                {"Experience"}
              </p>
              <EditOutlinedIcon
                fontSize={"medium"}
                className="cursor-pointer text-gray-600"
                onClick={() => setOpenLocation(true)}
              />
            </ContainerHead>
            <VerticalStepper data={userProfile} />
          </Container>
        </Cards>
        <Cards>
          <Container>
            <ContainerHead>
              <p className="text-sm text-start font-bold text-gray-700">
                {"Education"}
              </p>
              <EditOutlinedIcon
                fontSize={"medium"}
                className="cursor-pointer text-gray-600"
                onClick={() => setOpenEducation(true)}
              />
            </ContainerHead>
            <EducationList data={userProfile} />
          </Container>
          <Container>
            <ContainerHead>
              <p className="text-sm text-start font-bold text-gray-700">
                {"Courses & Certifications"}
              </p>
              <EditOutlinedIcon
                fontSize={"medium"}
                className="cursor-pointer text-gray-600"
                onClick={() => setOpenCertification(true)}
              />
            </ContainerHead>
            <CoursesList data={userProfile} />
          </Container>
        </Cards>
      </SideBar>
    </>
  );
}
