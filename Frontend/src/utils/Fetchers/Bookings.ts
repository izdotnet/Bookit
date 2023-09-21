import axios, { AxiosResponse } from "axios";
import https from "https";
import { apiUrl } from "../constants";
import { getCookie } from "./getCookie";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const options = {
  headers: {},
  httpsAgent: agent,
};

const token = getCookie();

export const getReservations = async (bookingId: string) => {
  try {
    if (!token) return;
    const response: AxiosResponse = await axios.get(
      `${apiUrl}/bookings/${bookingId}`,
      {
        ...options,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getReservationsForUser = async (userId: string) => {
  try {
    if (!token) return;
    const response: AxiosResponse = await axios.get(
      `${apiUrl}/bookings/user/${userId}`,
      {
        ...options,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error type:", typeof error);
    console.error("Error message:", error.message);
  }
};

export const cancleReservation = async (bookingId: string) => {
  try {
    if (!token) return;
    const response: AxiosResponse = await axios.post(
      `${apiUrl}/bookings/${bookingId}/cancel`,
      {},
      {
        ...options,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const confirmReservation = async (bookingId: string) => {
  try {
    if (!token) return;
    const response: AxiosResponse = await axios.post(
      `${apiUrl}/bookings/${bookingId}/confirm`,
      {},
      {
        ...options,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const rejectReservation = async (bookingId: string) => {
  try {
    if (!token) return;
    const response: AxiosResponse = await axios.post(
      `${apiUrl}/bookings/${bookingId}/reject`,
      {},
      {
        ...options,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const completeReservation = async (bookingId: string) => {
  try {
    if (!token) return;
    const response: AxiosResponse = await axios.post(
      `${apiUrl}/bookings/${bookingId}/complete`,
      {},
      {
        ...options,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
