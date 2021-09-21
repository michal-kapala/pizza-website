import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import MyButton from "../../shared components/MyButton";
import MyNavbar from "../../shared components/MyNavbar";
import {
  useSetDefaultValues,
  useUpdateUserDetails,
} from "../MyAccountPage/MyAccountPageLogic";
import { Container, Form } from "react-bootstrap";

export default function MyAccountPage(props) {
  const { setNoCartAnimation, setAppState } = props;

  // States for User Input fields. Passing setAppState to check if data has loaded
  const { userDetailsStates, setUserDetailsStates } =
    useSetDefaultValues(setAppState);

  // Function to update user details in Users Collection
  const { updateUser } = useUpdateUserDetails();
  return (
    <main className="slide-in-right">
      <MyNavbar title="My account" to="/" setAnimation={setNoCartAnimation} />
      <Form className="m-5">
        <UserDetailsInputs
          userDetailsStates={userDetailsStates}
          setUserDetailsStates={setUserDetailsStates}
          // readOnly is for the email input field
          readOnly={"readOnly"}
        >
          <Container className="text-center">
            <MyButton
              title={"Save"}
              className="mt-4"
              onClick={() => {
                updateUser(userDetailsStates, setAppState);
                alert("Your account details have been changed!");
              }}
            />
          </Container>
        </UserDetailsInputs>
      </Form>
    </main>
  );
}
