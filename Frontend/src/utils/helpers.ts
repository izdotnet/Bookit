import { FilterProps } from "@/types";

function formatDateObject(date: Date): string {
  let dd: number | string = date.getDate();
  let mm: number | string = date.getMonth() + 1;
  let yyyy: number = date.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  return `${yyyy}-${mm}-${dd}`;
}

export const updateSearchParams = ({
  startDate = getToday(),
  endDate = getNextDay(),
  city = "Tel Aviv",
}: FilterProps): string => {
  if (typeof window === "undefined") {
    return ""; // Handle server-side case
  }

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("startDate", startDate);
  searchParams.set("endDate", endDate);
  searchParams.set("city", city);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathName;
};

export function formatDate(date: Date): string {
  return formatDateObject(date);
}

export function getToday(): string {
  let today: Date = new Date();
  today.setHours(0, 0, 0, 0);
  return formatDateObject(today);
}

export function getNextDay(): string {
  let tomorrow: Date = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return formatDateObject(tomorrow);
}

export function randomizeApartmentImage(num?: number): string {
  const random = Math.floor(Math.random() * 10) + 1;
  const number = num ?? random;
  return `/Apartments/${number}.jpg`;
}

export function dateToSplitString(date: Date): string {
  return formatDateObject(date);
}

export const CurrencyDisplay = (amount: number, currency: string) =>
  `${amount}${currency}`;
