import StudentModel from "@/app/models/StudentModel";
import { dbConnect } from "@/app/services/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const response = await StudentModel.find();
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured" }),
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request) => {
  const { id } = await request.json();
  try {
    await dbConnect();
    const response = await StudentModel.findOneAndDelete({
      _id: id,
    });
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Server error occured" }),
      {
        status: 500,
      }
    );
  }
};
