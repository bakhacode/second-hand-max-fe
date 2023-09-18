import { HTTPSTATUS } from "api/types";
import {
  successfulProductItemsData,
  unSuccessfulProductItemsData,
} from "mocks/data";
import { rest } from "msw";

export default [
  rest.get(
    "/api/items?region=1&category=1&page=0&size=10",
    async (_, res, ctx) => {
      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulProductItemsData)
      );
      return res(
        ctx.status(HTTPSTATUS.badRequest),
        ctx.json(unSuccessfulProductItemsData)
      );
    }
  ),

  rest.get("/api/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    const item = successfulProductItemsData.data.items.find(
      (product) => product.id === Number(id)
    );

    if (item) {
      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json({
          ...successfulProductItemsData,
          data: item,
        })
      );
    } else {
      return res(
        ctx.status(HTTPSTATUS.notFound),
        ctx.json({
          code: HTTPSTATUS.notFound,
          status: "Not Found",
          message: "상품을 찾을 수 없습니다",
          data: null,
        })
      );
    }
  }),
];
