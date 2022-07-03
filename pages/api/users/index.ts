import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      if (req.query.mode === "allUsernames") {
        const usernames = await prisma.user.findMany({
          select: {
            name: true,
          },
        });
        res.status(200).json(usernames);
      }
      if (req.query.mode === "getUserFromUsername") {
        try {
          const user = await prisma.user.findFirst({
            where: {
              username: {
                equals: req.query.username as string,
                mode: "insensitive",
              },
            },
            include: {
              gameresults: { orderBy: { timestamp: "desc" } },
            },
          });
          res.status(200).json(user);
          res.end();
        } catch (error) {
          res.status(404).json({
            message: `User ${req.query.username as string} not found`,
            error: error,
          });
          res.end();
        }
      }
      break;
    case "POST":
      if (req.query.mode === "gainExperience") {
        res.status(200).json({
          query: req.query,
        });
        try {
          const current_exp = await prisma.user.findFirst({
            where: { id: req.query.user_id as string },
            select: { exp: true },
          });
          await prisma.user.update({
            where: { id: req.query.user_id as string },
            data: {
              exp:
                (current_exp?.exp as number) > 0
                  ? (current_exp?.exp as number) +
                    parseInt(req.query.exp as string)
                  : parseInt(req.query.exp as string),
            },
          });
          res.status(200);
          res.end();
        } catch (error) {
          console.log(`An error ocurred ${error}`);
          res.status(500);
          res.end();
        }
      }
      return req;
      break;

    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed.` });
  }
};
