type Status = {
  ok: HttpStatusCode,
  notFound: HttpStatusCode,
  internalServerError: HttpStatusCode
};

const status: Status = {
  ok: 200,
  notFound: 404,
  internalServerError: 500
};

export default status;
