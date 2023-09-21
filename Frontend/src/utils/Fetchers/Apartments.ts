"use server";

import axios, { AxiosResponse } from "axios";
import https from "https";
import { apiUrl } from "../constants";
import { ReservationProps } from "@/types";
import { getCookie } from "./getCookie";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const options = {
  headers: {},
  httpsAgent: agent,
};

const token = getCookie();

export const getApartments = async (
  startDate?: string,
  endDate?: string,
  city?: string
) => {
  try {
    const response = await axios.get(
      `${apiUrl}/apartments?startDate=${startDate}&endDate=${endDate}&city=${city}`,
      options
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getApartment = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/apartments/${id}`, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const reserveApartment = async ({
  startDate,
  endDate,
  apartmentId,
  userId,
}: ReservationProps) => {
  try {
    if (!token) return;
    const response: AxiosResponse = await axios.post(
      `${apiUrl}/bookings`,
      { startDate, endDate, apartmentId, userId },
      {
        ...options,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      message: "Apartment reserved successfully",
      data: response.data,
      status: 200,
    };
  } catch (error) {
    return { message: "error", data: error, status: 400 };
  }
};
