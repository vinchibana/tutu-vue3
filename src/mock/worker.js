import { setupWorker, rest } from "msw";
import { baseURL } from "@/utils/request";
import { faker } from "@faker-js/faker";

const worker = setupWorker(
  rest.get(`${baseURL}/message`, (req, res, ctx) => {
    return res(
      ctx.json(
        generateMockData(5, () => ({
          name: faker.name.firstName(),
          avatar: faker.internet.avatar(),
          phone: faker.phone.number(),
          cityName: faker.address.cityName(),
          email: faker.internet.email(),
        }))
      )
    );
  }),

  rest.get(`${baseURL}/member/collect`, (req, res, ctx) => {
    return res(
      ctx.json({
        msg: "获取成功",
        result: {
          counts: 50,
          page: req.url.searchParams.get("page"),
          pageSize: req.url.searchParams.get("pageSize"),
          pages: 0,
          items: generateMockData(req.url.searchParams.get("pageSize"), () => ({
            id: faker.datatype.uuid(),
            name: faker.internet.userName(),
            desc: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${faker.datatype.number(
              { min: 1, max: 8 }
            )}.jpg`,
          })),
        },
      })
    );
  })
);

export default worker;
function generateMockData(length, generate) {
  return Array.from({ length }, generate);
}
