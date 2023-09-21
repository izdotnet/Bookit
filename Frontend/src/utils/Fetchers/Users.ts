import axios from "axios";
import https from "https";
import { apiUrl } from "../constants";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const options = {
  headers: {},
  httpsAgent: agent,
};

export const register = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/register`,
      { email, firstName, lastName, password },
      options
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
