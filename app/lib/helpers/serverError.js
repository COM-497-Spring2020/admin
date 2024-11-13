import { NextResponse } from "next/server";

const ServerError = () => {
  return new NextResponse(JSON.stringify({ message: "Server error occured" }), {
    status: 500,
  });
};

export default ServerError;
