const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(logger());
app.use(bodyParser());

app.use(async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = 'ok';
})

app.listen(3000, () => {
  console.log("Order service is running!");
})
