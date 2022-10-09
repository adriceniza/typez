import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method){
    case "GET":
      if (req.query.id) {
        switch(req.query.mode){
          case "all":
            await prisma?.gameResult
                .findMany({
                  where: { userId: req.query.id as string },
                })
                .then((gr) => {
                  return res.status(200).json(gr);
                });
            break;
          case "allWPM":
            const allWPM = await prisma?.gameResult.findMany({
              where: { userId: req.query.id as string },
              select: { WPMAverage: true },
            });
            res.status(200).json(allWPM);
            break;
          case "getWpmRecord":
            try {
              await prisma.gameResult
                  .findFirst({
                    where: {
                      userId: req.query.id as string,
                    },
                    select: { WPMAverage: true },
                    orderBy: { WPMAverage: "desc" },
                  })
                  .then((response) => {
                    return res.status(200).json(response);
                  });
            } catch (error) {}
            break;
          case "last":
            try {
              const lastRecord = await prisma?.gameResult.findFirst({
                where: {
                  userId: req.query.id as string,
                },
                orderBy: {
                  timestamp: "desc",
                },
              });
              res.status(200).json(lastRecord);
            } catch (err) {
              res.status(400).json({ message: "Something went wrong", error: err });
            }
            break;
        }
        return;
      } else {
        try {
          return res.status(200).json(await prisma?.gameResult.findMany());
        } catch (error) {
          res.status(400).json({ message: "Something went wrong", error: error });
        }
        return;
      }
    case "POST":
      if (req.body) {
        try {
          await prisma?.gameResult.create({
            data: {
              userId: req.body.userId,
              WPMAverage: req.body.WPMAverage,
              expEarned: req.body.expEarned,
              gameId: req.body.gameId,
            },
          });
          return res.status(200).json({ message: "Success" });
        } catch (err) {
          res.status(400).json({
            message: "Something went wrong when creating a new record",
            error: err,
          });
        }
      } else {
        return res.status(400).json({
          message: "Something went wrong",
          error: "User ID does not match",
        });
      }
      break;
  }
  return res.status(405).json({ message: "Method not allowed." });
};
