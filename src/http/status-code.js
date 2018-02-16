type Status = {
  ok: HttpStatusCode,
  noContent: HttpStatusCode,
  badRequest: HttpStatusCode,
  notFound: HttpStatusCode,
  internalServerError: HttpStatusCode
};

const status: Status = {
  ok: 200,
  noContent: 201,
  badRequest: 400,
  notFound: 404,
  internalServerError: 500
};

export default status;
