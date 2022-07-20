import {
  getusers,
  suspendusers,
  deleteusers,
  dashboardcounts,
  dashboard,
} from "../api/admin";
import { toast } from "react-toastify";
export const getUsers = async (query) => {
  try {
    const { data } = await getusers(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const suspendUsers = async (ids, func) => {
  try {
    if (ids.length < 1) {
      return toast.error("Please select accounts first");
    }
    const { data } = await suspendusers(ids);
    toast("Accounts Suspended");
    func(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsers = async (ids, func) => {
  try {
    if (ids.length < 1) {
      return toast.error("Please select accounts first");
    }
    const { data } = await deleteusers(ids);
    toast("Accounts deleted");
    func(data);
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardCounts = async () => {
  try {
    const { data } = await dashboardcounts();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboard = async (query) => {
  try {
    const { data } = await dashboard(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};
