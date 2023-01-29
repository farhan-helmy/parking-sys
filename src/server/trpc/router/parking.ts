import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const parkingRouter = router({
  savePlate: publicProcedure
    .input(z.object({
      plate: z.string()
    }))
    .mutation(({ ctx, input }) => {
      const data = ctx.prisma.parking.upsert({
        where: {
          plateNumber: input?.plate
        },
        create: {
          plateNumber: input?.plate
        },
        update: {}
      })
      console.log(data)
      return data;
    }),
  checkPlate: publicProcedure
    .input(z.object({
      plate: z.string()
    }))
    .query(({ ctx, input }) => {
      const data = ctx.prisma.parking.findUnique({
        where: {
          plateNumber: input?.plate
        }
      })
      console.log(data)
      return data;
    }),
  getCarTime: publicProcedure
    .input(z.object({
      plate: z.string()
    }))
    .query(({ ctx, input }) => {
      const data = ctx.prisma.parking.findUnique({
        where: {
          plateNumber: input?.plate
        }
      })
      console.log(data)
      return data;
    }),
  startParking: publicProcedure
    .input(z.object({
      plate: z.string(),
      start_time: z.string(),
      status: z.string()
    }))
    .mutation(({ ctx, input }) => {
      const data = ctx.prisma.parking.update({
        where: {
          plateNumber: input?.plate
        },
        data: {
          start_time: input?.start_time,
          status: input?.status
        }
      })
      console.log(data)
      return data;
    }
    ),
  endParking: publicProcedure
    .input(z.object({
      plate: z.string(),
      end_time: z.string(),
      status: z.string()
    }))
    .mutation(({ ctx, input }) => {
      const data = ctx.prisma.parking.update({
        where: {
          plateNumber: input?.plate
        },
        data: {
          end_time: input?.end_time,
          status: input?.status
        }
      })
      console.log(data)
      return data;
    }
    ),
  updatePayStatus: publicProcedure
    .input(z.object({
      plate: z.string(),
      status: z.string()
    }))
    .mutation(({ ctx, input }) => {
      const data = ctx.prisma.parking.update({
        where: {
          plateNumber: input?.plate
        },
        data: {
          status: input?.status
        }
      })
      console.log(data)
      return data;
    }
    ),
  getPrice: publicProcedure
    .query(({ ctx }) => {
      const data = ctx.prisma.price.findUnique({
        where: {
          id: 1
        }
      })
      console.log(data)
      return data;
    }
    ),
  createPrice: publicProcedure
    .input(z.object({
      price: z.string(),
      subsequnce: z.string()
    }))
    .mutation(({ ctx, input }) => {
      const data = ctx.prisma.price.create({
        data: {
          price: input?.price,
          subsequnce: input?.subsequnce
        }
      })
      console.log(data)
      return data;
    }
    ),
  updatePrice: publicProcedure
    .input(z.object({
      id: z.number(),
      price: z.string(),
      subsequnce: z.string()
    }))
    .mutation(({ ctx, input }) => {
      const data = ctx.prisma.price.upsert({
        where: {
          id: input?.id
        },
        create: {
          price: input?.price,
          subsequnce: input?.subsequnce,
        },
        update: {
          price: input?.price,
          subsequnce: input?.subsequnce,
        }
      })
      console.log(data)
      return data;
    }
    ),
})
