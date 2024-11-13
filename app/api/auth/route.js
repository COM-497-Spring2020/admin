import serverError from "@/app/lib/helpers/serverError";
import AdminProfileModel from "@/app/models/AdminProfileModel";
import AuthModel from "@/app/models/AuthModel";
import { dbConnect } from "@/app/services/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const response = await AdminProfileModel.findOne();
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch {
    return serverError();
  }
};

export const POST = async (request) => {
  try {
    await dbConnect();
    const { currentPassword, newPassword } = await request.json();
    const user = await AuthModel.findOne({ role: "admin" });
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found!",
        }),
        { status: 400 }
      );
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return new NextResponse(
        JSON.stringify({
          message: "Current password doesn't match!",
        }),
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await AuthModel.findOneAndUpdate(
      { role: "admin" },
      { password: hashedPassword },
      { new: true }
    );
    return new NextResponse(
      JSON.stringify({
        message: "Password changed successfully!",
      }),
      { status: 200 }
    );
  } catch {
    return serverError();
  }
};

export const PUT = async (request) => {
  try {
    await dbConnect();
    const { platformCharge } = await request.json();
    await AdminProfileModel.findOneAndUpdate(
      {},
      {
        platformCharge,
      },
      { new: true }
    );
    return new NextResponse(JSON.stringify({ message: "Updated!" }), {
      status: 200,
    });
  } catch {
    return serverError();
  }
};
