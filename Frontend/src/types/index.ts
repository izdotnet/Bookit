import { ForwardRefExoticComponent, MouseEventHandler } from "react";
import CustomFilter from "../components/CustomFilter/CustomFilter";
import SignInForm from "../components/SignInForm/SignInForm";
import { AxiosError } from "axios";

export interface ButtonProps {
  children: React.ReactNode;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

/*
Example apartment object:
{
    id: '7b2cec3e-6950-4592-94f4-1d761bbb21ba',
    name: 'Bergstrom - Wisoky',
    description: 'Amazing view',
    price: 171.74446084352044,
    currency: 'USD',
    address: {
      country: 'Puerto Rico',
      city: 'Candidafort',
      street: '29981 Homenick Station',
      postalCode: '64155',
      phoneNumber: '1-609-770-0483'
    }
*/

export interface Apartment {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  size: number;
  NumberOfPeople: number;
  address: {
    country: string;
    city: string;
    street: string;
    postalCode: string;
    phoneNumber: string;
  };
}

export interface ApartmentProps {
  data: Apartment;
}

export interface ApartmentDetailsProps {
  data: Apartment;
  image: string;
  isOpen: boolean;
  closeModal: () => void;
}

export interface FilterProps {
  startDate: string;
  endDate: string;
  city: string;
  modal?: boolean;
}

export interface CustomFilterProps {
  title: string;
  options: { title: string; value: string }[];
}

export interface SignInFormProps {
  isOpen: boolean;
  closeModal: () => void;
  setCurrentForm: (form: string) => void;
}

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  password: string;
}

export interface ReservationProps {
  startDate: string;
  endDate: string;
  apartmentId: string;
  userId: string;
}

export interface Reservation {
  id: string;
  apartmentId: string;
  apartmentName: string;
  userId: string;
  durationStart: string;
  durationEnd: string;
  status: string;
  createdOnUtc: string;
  priceCurrency: string;
  cleaningFeeAmount: number;
  cleaningFeeCurrency: string;
  totalPriceAmount: number;
  totalPriceCurrency: string;
  userName: string;
  userEmail: string;
}

export interface UserResponse {
  user: User | null;
  error: AxiosError | null;
}

export type DateInputProps = {
  name: string;
  value: any;
  min: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};
