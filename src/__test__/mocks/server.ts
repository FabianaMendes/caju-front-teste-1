import { setupServer } from "msw/node";
import { rest } from "msw";
import { fakeAdmission } from "./fakeEntities";

export const baseUrl = 'http://localhost:3000';

export const handlers = [
  rest.get(`${baseUrl}/registrations`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([fakeAdmission])
    );
  }),

  rest.post(`${baseUrl}/registrations`, async (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: "Created" }));
  }),
  
  rest.get(`${baseUrl}/registrations`, async (req, res, ctx) => {
    const cpf = req.url.searchParams.get("cpf");
    if (cpf === fakeAdmission.cpf) {
      return res(ctx.status(200), ctx.json([fakeAdmission]));
    }
    return res(ctx.status(404), ctx.json({ message: "Registro não encontrado" }));
  }),

  rest.put(`${baseUrl}/registrations/:id`, async (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "Updated" }));
  }),

  rest.delete(`${baseUrl}/registrations/:id`, async (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "Deleted" }));
  }),
];

export const server = setupServer(...handlers);
