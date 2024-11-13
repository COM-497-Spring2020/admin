import AuthModel from "@/app/models/AuthModel";
import "@/app/models/GradeModel";
import "@/app/models/SubjectModel";
import TutorModel from "@/app/models/TutorModel";
import { dbConnect } from "@/app/services/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const response = await TutorModel.find()
      .populate("grades")
      .populate("subjects");
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

export const POST = async (request) => {
  const { id, percentage } = await request.json();
  try {
    await dbConnect();
    const response = await TutorModel.findOneAndUpdate(
      {
        _id: id,
      },
      { percentage },
      { new: true }
    );
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

export const PUT = async (request) => {
  const { id } = await request.json();
  try {
    await dbConnect();
    const response = await TutorModel.findOne({
      _id: id,
    });
    response.isApproved = !response.isApproved;
    await response.save();
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
    const response = await TutorModel.findOneAndDelete({
      user: id,
    });
    await AuthModel.findOneAndDelete({ _id: id });
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
